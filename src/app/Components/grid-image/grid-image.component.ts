import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-image',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.css']
})
export class GridImageComponent {

  constructor() { }
  params: any;
  agInit(params: any){
    this.params = params; 
  } 


}
