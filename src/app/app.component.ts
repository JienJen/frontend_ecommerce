import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { UserAuthService } from './_services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
ngOnInit(): void{

}
constructor(
  private userAuthService: UserAuthService, 
){

}
title = 'ecommerceapp';
sideBarOpen = false;

sideBarToggler() {
  this.sideBarOpen = !this.sideBarOpen;
}


isLoggedIn(){
  return this.userAuthService.isLoggedIn();
 }
}


