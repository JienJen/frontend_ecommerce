import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../_services/user-service.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

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
    this.onSubmitRegisterEvent.emit({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password, "userEmail": this.userEmail, "userPhoneNumber": this.userPhoneNumber, "userAddress": this.userAddress});
  }
}
