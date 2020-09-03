import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
   
@Component({
  selector: 'app-inicioadministrador',
  templateUrl: './inicioadministrador.component.html',
  styleUrls: ['./inicioadministrador.component.css'],
  providers: [MessageService]
})
export class InicioadministradorComponent implements OnInit {
id;

  constructor(
    private messageService: MessageService,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');

  }
  cerrarSesion(){
    this._router.navigate(['inicio/']);
    localStorage.clear()

  }
}
