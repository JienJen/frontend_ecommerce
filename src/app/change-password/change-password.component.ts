import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  
  active: string = "change";

  onRegisterTab(): void {
		this.active = "register";
	}



  changePass(passwordForm:NgForm){

  }
}
