import { Component, EventEmitter, Output} from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  
	active: string = "login";
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";


  onRegisterTab(): void {
		this.active = "register";
	}
  onLoginTab(): void {
		this.active = "login";
	}

 onSubmitLogin(): void{
  this.onSubmitLoginEvent.emit({"login": this.login, "password":this.password});
 }

 
 onSubmitRegister(): void {
  this.onSubmitRegisterEvent.emit({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password});
}
}