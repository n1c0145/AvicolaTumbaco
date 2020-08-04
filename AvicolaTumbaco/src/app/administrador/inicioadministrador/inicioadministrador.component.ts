import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicioadministrador',
  templateUrl: './inicioadministrador.component.html',
  styleUrls: ['./inicioadministrador.component.css']
})
export class InicioadministradorComponent implements OnInit {
id='';

  constructor() { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    console.log(this.id);
    
  }





}
