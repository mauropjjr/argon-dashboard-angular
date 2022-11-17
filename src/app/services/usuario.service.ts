import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getId(id) {
    return this.http.get<Usuario>(environment.baseUrl + `usuarios/${id}.json`);
  }

  get(params) {
    return this.http.get<Usuarios>(environment.baseUrl + 'usuarios.json', { params: params });
  }

  salvar(params) {
    return this.http.post(environment.baseUrl + 'usuarios.json', params);
  }

}

export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  login: string;
  email: string;

  constructor() { }
}

export class Usuarios {
  Usuarios: any;
  TotalItems: number;

  constructor() { }
}
