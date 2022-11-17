import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import { SessaoService } from '../../services/sessao.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private sessao: SessaoService, private router: Router) { }

    canActivate() {
        this.setRefreshNavBadge();        

        if (this.sessao.get('IsLoggedin') === 'true') {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    async setRefreshNavBadge() {

        // if (this.router.url != '/login') {
        //     let navItems: any = JSON.parse(localStorage.getItem('navItemsIntegra'));
        //     let departamento_id = this.sessao.get('login').departamento != undefined ? this.sessao.get('login').departamento.id : 0;
        //     // let contadores: any = await this.vendaService.getContadoresBadge({ departamento_id: departamento_id }).toPromise();

        //     if (navItems) {
        //         navItems.forEach((n, i) => {
        //             if (n.badge) {

        //                 let keys = n.badge.variant.split(" ");
        //                 let keyCss = keys[1];
        //                 let cont = '';
        //                 if (contadores[keyCss]) {
        //                     cont = contadores[keyCss];
        //                 }

        //                 let element: any = document.querySelectorAll("." + keyCss)[0];
        //                 if (element) {
        //                     element.innerText = cont;
        //                     navItems[i].badge.text = cont;
        //                 }
        //             }
        //         });

        //         this.sessao.set('navItemsIntegra', navItems);
        //     }
        // }
    }
}
