import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../_services/user-service.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
 
  @Output() onSubmitRegisterEvent = new EventEmitter();
  
  constructor(private userService: UserServiceService,
    private userAuthService: UserAuthService,
    private router: Router){}
  
  ngOnInit(): void {
  }

	active: string = "login";
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";
  userEmail: string = "";
  userPhoneNumber: string = "";
  userAddress: string = "";

  


  onRegisterTab(): void {
		this.active = "register";
	}

  onLoginTab(): void {
		this.active = "login";
	}

  logins(loginForm:NgForm){
    this.userService.login(loginForm.value).subscribe(
      (resp: any) =>{
        console.log(resp)  
        console.log(resp.token);
        console.log(resp.roles);

        this.userAuthService.setRoles(resp.roles);
        this.userAuthService.setToken(resp.token);

        const role = resp.roles[0];
        if(role === 'ADMIN') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/home'])
        }
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  onSubmitRegister(): void {
    this.onSubmitRegisterEvent.emit({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password, "userEmail": this.userEmail, "userPhoneNumber": this.userPhoneNumber});
    this.router.navigate(['/login'])
    window.location.reload();
    
  }


}
