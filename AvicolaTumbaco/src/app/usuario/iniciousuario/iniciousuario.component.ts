import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-iniciousuario',
  templateUrl: './iniciousuario.component.html',
  styleUrls: ['./iniciousuario.component.css'],
  providers: [MessageService]
})
export class IniciousuarioComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
