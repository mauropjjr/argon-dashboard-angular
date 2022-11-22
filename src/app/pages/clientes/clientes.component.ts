import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: any = [];
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.buscar();
  }
  buscar(){
    this.clienteService.get({}).subscribe(data => {
        this.clientes = data;
    });
  }

}
