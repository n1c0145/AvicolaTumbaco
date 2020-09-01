import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-inicioadministrador',
  templateUrl: './inicioadministrador.component.html',
  styleUrls: ['./inicioadministrador.component.css'],
  providers: [MessageService]
})
export class InicioadministradorComponent implements OnInit {
id;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');

  }

}
