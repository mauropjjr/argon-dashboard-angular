import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-list-error-messages',
  templateUrl: './control-list-error-messages.component.html',
  styleUrls: ['./control-list-error-messages.component.scss']
})
export class ControlListErrorMessagesComponent implements OnInit {

  @Input() errors: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  get listErros() {
    if(this.errors){
      return this.getTratarListaErros(this.errors);
    }
    return [];
  }

  getTratarListaErros(errors: any = []) {
    let objErrors = errors;
    let keyCampos = Object.keys(errors);
    let listErros = [];
    keyCampos.forEach(keyCampo => {
      let erros = objErrors[keyCampo];
      let errosField = Object.keys(errors[keyCampo]);      

      errosField.forEach(funcValidate => {
        let erroMsg: any = erros[funcValidate];
        listErros.push({'campo': keyCampo, 'validate': funcValidate, 'msg': `${keyCampo}: ${erroMsg}` });
      });

    });
    return listErros;
  }

}
