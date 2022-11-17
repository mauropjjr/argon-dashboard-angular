import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(params) {
    return this.http.post<Usuario>(environment.baseUrl + 'autenticacao/postLogin.json', params);
  }


}

export class Usuario {
  id: number;
  nome: string;
  cpf: number;
  login: string;
  usuario_ad: boolean;
  email: string;
  ativo: boolean;
  api_key: string;
  chave_sas: string;
  system: boolean;
  created: Date;
  modified: Date;
  primeiro_login: boolean;
  tipo_usuario_id: string;
  usuario_grupos: Array<any>;
  config: Array<any>;
  pagina_inicial: string;

  constructor() { }
}
