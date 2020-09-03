import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-iniciousuario',
  templateUrl: './iniciousuario.component.html',
  styleUrls: ['./iniciousuario.component.css'],
  providers: [MessageService]
})
export class IniciousuarioComponent implements OnInit {

  constructor(private messageService: MessageService,
    private readonly _router: Router,) { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    this._router.navigate(['inicio/']);
    localStorage.clear()

  }
}
