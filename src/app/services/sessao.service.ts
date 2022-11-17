import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  delayMs = 500;
  loaderId:string = '';

  constructor() { }

  public set(nome: string, valor: any, in_session?: boolean) {
    (in_session) ? sessionStorage.setItem(environment.prefixStorage + nome, JSON.stringify(valor)) : localStorage.setItem(environment.prefixStorage + nome, JSON.stringify(valor));

  }

  public get(nome: string, in_session?: boolean) {
    return (in_session) ? JSON.parse(sessionStorage.getItem(environment.prefixStorage + nome)) : JSON.parse(localStorage.getItem(environment.prefixStorage + nome));

  }

  public delete(nome: string, in_session?: boolean) {
    (in_session) ? sessionStorage.removeItem(environment.prefixStorage + nome) : localStorage.removeItem(environment.prefixStorage + nome);
  }

  public deleteNomeEspecifico(nome: string, in_session?: boolean) {
    (in_session) ? sessionStorage.removeItem(nome) : localStorage.removeItem(nome);
  }

  public limparSessao() {
    var listLocalStorage = localStorage;
    for (var key in listLocalStorage) {
      if (key.includes(environment.prefixStorage)) {
        this.deleteNomeEspecifico(key);
      }
    }
  }

  public getUsuarioId() {
    if (this.get('Login') && this.get('Login').id) {
      return this.get('Login').id;
    } else {
      return null;
    }
  }

  public getUsuarioNome() {
    return this.get('Login') && this.get('Login').nome;
  }

  public setLoaderId(loaderId:string) {
    this.loaderId = loaderId;
  }

  public getLoaderId() {
    return this.loaderId;
  }

}
