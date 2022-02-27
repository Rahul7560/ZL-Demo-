import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {

  @Input() value : number = 0;
  @Input() text : string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
