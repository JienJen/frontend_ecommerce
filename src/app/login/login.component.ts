import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm} from '@angular/forms';
import { UserServiceService } from '../_services/user-service.service';
import { UserAuthService } from '../_services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
 
  @Output() onSubmitRegisterEvent = new EventEmitter();
  
  constructor(private userService: UserServiceService,
    private userAuthService: UserAuthService,
    private router: Router,
    private _snackBar: MatSnackBar){}
  
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
  error : string;
  


  onRegisterTab(): void {
		this.active = "register";
	}

  onPasswordTab(): void {
		window.location.href = "/olvidarContraseña"
	}

  onLoginTab(): void {
		this.active = "login";
	}

  changePass(passwordForm:NgForm){

  }


  logins(loginForm:NgForm){
    this.userService.login(loginForm.value).subscribe(
      (resp: any) =>{
        console.log(resp)
        this.userAuthService.setUser(resp)
        this.userAuthService.setRoles(resp.roles);
        this.userAuthService.setToken(resp.token);
      

        const role = resp.roles[0];
        if(role === 'ADMIN') {
          this.router.navigate(['/Inicio'])
        } else {
          this.router.navigate(['/Inicio'])
        }
      },
      (error) =>{
        console.log(error);
        this._snackBar.open(error, "", {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        
      }
    );
  }
)}


  
  onSubmitRegister(): void {
    this.onSubmitRegisterEvent.emit({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password, "userEmail": this.userEmail, "userPhoneNumber": this.userPhoneNumber});
        
  }


}
