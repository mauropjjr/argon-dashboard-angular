import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }


  get(params) {
    return this.http.get<any>(environment.baseUrl + 'clientes.json', { params: params });
  }
  getAssinaturas(params) {
    return this.http.get<any>(environment.baseUrl + 'clientes/assinaturas.json', { params: params });
  }
}
