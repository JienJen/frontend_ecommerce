import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
ngOnInit(): void{

}
constructor(){

}
title = 'ecommerceapp';
sideBarOpen = false;

sideBarToggler() {
  this.sideBarOpen = !this.sideBarOpen;
}
}


