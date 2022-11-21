import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getId(id) {
    return this.http.get<any>(environment.baseUrl + `usuarios/${id}.json`);
  }

  get(params) {
    return this.http.get<any>(environment.baseUrl + 'usuarios.json', { params: params });
  }

  salvar(params) {
    if (params['id']) {
      return this.http.put(environment.baseUrl + 'usuarios/' + params['id'] + '/.json', params);
    } else {
      return this.http.post(environment.baseUrl + 'usuarios.json', params);
    }
  }
  salvarContador(params) {
    if (params['id']) {
      return this.http.put(environment.baseUrl + 'usuarios/' + params['id'] + '/.json', params);
    } else {
      return this.http.post(environment.baseUrl + 'representanteContadores.json', params);
    }
  }
  listarContador(params) {
    return this.http.get(environment.baseUrl + 'representanteContadores.json', { params: params });
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
