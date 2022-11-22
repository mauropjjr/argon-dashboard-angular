import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-assinaturas',
  templateUrl: './assinaturas.component.html',
  styleUrls: ['./assinaturas.component.scss']
})
export class AssinaturasComponent implements OnInit {


  assinaturas: any = [];
  constructor(private assinaturasService: ClienteService) { }

  ngOnInit(): void {
    this.buscar();
  }
  buscar(){
    this.assinaturasService.getAssinaturas({}).subscribe(data => {
        this.assinaturas = data;
    });
  }

}
