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
    return this.http.post<Usuario>(environment.baseUrl + 'login/auth.json', params);
  }


}

export class Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  token: string;

  constructor() { }
}
