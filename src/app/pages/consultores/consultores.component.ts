import { UsuarioService } from './../../services/usuario.service';
import { CustomServiceValidateService } from './../../shared/control-messages/custom-service-validate.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from '../user-profile/user-profile.component';

@Component({
  selector: 'app-consultores',
  templateUrl: './consultores.component.html',
  styleUrls: ['./consultores.component.scss']
})
export class ConsultoresComponent implements OnInit {

  public formUser: FormGroup;
  consultores: any = [];

  constructor(public toastr: ToastrService, private usuario: UsuarioService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.init();
  }
  public selecionar(id) {
    this.usuario.getId(id).subscribe(data => {
      this.formUser.patchValue(data.usuario);
    });
  }
  public init() {
    this.formUser = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      senha: ['', Validators.required],
      celular: ['', Validators.required],
      confirme_senha: ['', Validators.required],
      celular_suporte: [],
      email_suporte: [],
      rua: [],
      cidade: [],
      estado: ['MS'],
      cnpj: [],
      nome_fantasia: [],
      perfil:['consultor'],
      comissao:[30],
      descricao: []
    },
      {
        validators: [Validation.match('senha', 'confirme_senha', 'id')]
      });
    this.usuario.get({perfil:'consultor'}).subscribe(data => {
      this.consultores = data['usuarios'];
    });
  }
  public salvar() {
    if (this.formUser.value.id > 0) {
      delete this.formUser.value.senha;
      delete this.formUser.value.confirme_senha;
    } else {
      if (!this.formUser.valid) {
        Object.keys(this.formUser.value).forEach((campo: any) => this.formUser.get(campo).markAsTouched());
        this.toastr.warning('Por favor verifique os campos obrigatórios!', 'Atenção');
        return;
      }
    }
    this.usuario.salvar(this.formUser.value).subscribe(data => {
      this.toastr.success('Salvo com sucesso');
      this.init();
    }, e => {
      CustomServiceValidateService.customMensageService(e.error.errors, this.formUser);
    });
  }

}
