import { environment } from './../../environments/environment';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SessaoService } from './sessao.service';
import { Router } from '@angular/router';



@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(public toastr: ToastrService, private sessao: SessaoService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = req.url.includes('http') ? req.url : environment.baseUrl + req.url;
    const api_key = this.sessao.get('Login') ? this.sessao.get('Login').token : '';
    const cloneReq = req.clone({
      url: url,
      headers: req.headers.set('Authorization', `Basic ${api_key}`)
    });

    return next
      .handle(cloneReq)
      .pipe(tap(event => {

      }, e => {
        if (e instanceof HttpErrorResponse) {
          if (e.status === 401) {
            this.sessao.limparSessao();
            this.toastr.warning(e.error.message);
            this.router.navigate(['/login']);
          } else if (e.status === 400) {
            let url: string = e.error.url ? e.error.url : '';
            let messsage: string = e.error.message ? e.error.message + ' ' + url : '';
            if (!messsage) {
              messsage = e.error[0] && e.error[0].Descricao ? e.error[0].Descricao : ''; //padrão SAS
            }
            this.toastr.warning('Não foi possível realizar essa operação. ' + messsage);

          } else {
            let url: string = e.error.url ? e.error.url : '';
            let messsage: string = e.error.message ? e.error.message + ' ' + url : '';
            if (!messsage) {
              messsage = e.error[0] && e.error[0].Descricao ? e.error[0].Descricao : ''; //padrão SAS
            }
            this.toastr.error(messsage ? messsage : 'Falha ao processar, por favor verifique!');
          }
        }
      }));

  }
}
