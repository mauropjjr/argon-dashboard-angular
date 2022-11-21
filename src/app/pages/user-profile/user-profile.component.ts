import { CustomServiceValidateService } from './../../shared/control-messages/custom-service-validate.service';
import { UsuarioService } from './../../services/usuario.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public formUser: FormGroup;
  contadores: any = [];

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
      descricao: []
    },
      {
        validators: [Validation.match('senha', 'confirme_senha', 'id')]
      });
    this.usuario.listarContador({}).subscribe(data => {
      this.contadores = data['representanteContadores'];
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
    this.usuario.salvarContador(this.formUser.value).subscribe(data => {
      this.toastr.success('Salvo com sucesso');
      this.init();
    }, e => {
      CustomServiceValidateService.customMensageService(e.error.errors, this.formUser);
    });
  }

}
export default class Validation {
  static match(controlName: string, checkControlName: string, edit?: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      const id = controls.get(edit)?.value;
      console.log(id);
      if (id > 0) {
        return null;
      }
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
