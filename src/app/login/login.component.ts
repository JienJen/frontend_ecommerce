import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  constructor(private userService: UserServiceService){ }

  ngOnInit(): void{

  }
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