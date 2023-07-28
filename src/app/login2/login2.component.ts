import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
  constructor(private userService: UserServiceService){}
  
  ngOnInit(): void {
  }

  login(loginForm:NgForm){
    this.userService.login(loginForm.value).subscribe(
      (resp) =>{
        console.log(resp);
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}
