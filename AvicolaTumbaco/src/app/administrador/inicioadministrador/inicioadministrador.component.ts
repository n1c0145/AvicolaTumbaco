import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicioadministrador',
  templateUrl: './inicioadministrador.component.html',
  styleUrls: ['./inicioadministrador.component.css']
})
export class InicioadministradorComponent implements OnInit {
id;
date1;
finaldate;
  constructor() { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    console.log(this.id);
    
  }

a(){
  this.finaldate = this.date1.toISOString().slice(0,10); 
}
}
