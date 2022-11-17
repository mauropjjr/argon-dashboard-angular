import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { SessaoService } from 'src/app/services/sessao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup;

  constructor(
    private loginService: LoginService,
    private sessao: SessaoService,
    private router: Router,
    public toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.init();
  }
  ngOnDestroy() {
  }
  login() {
    if (this.formLogin.invalid) {
      Object.keys(this.formLogin.value).forEach(campo => this.formLogin.controls[campo].markAsTouched());
    } else {
      this.loginService.login(this.formLogin.value).subscribe(response => {
        this.toastr.success('Autenticado com sucesso');
        this.sessao.set('IsLoggedin', 'true');
        this.sessao.set('Login', response);
        this.router.navigate(['/dashboard']);
      });
    }
  }
  public init() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

}
