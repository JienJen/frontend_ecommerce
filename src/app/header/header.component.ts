import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../_services/axios.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private axiosService: AxiosService, 
    private userAuthService: UserAuthService, 
    private router:Router,
    public userService: UserServiceService) {

  }
	
  ngOnInit(): void{

  }

 public isLoggedIn(){
  return this.userAuthService.isLoggedIn();
 }

 public logout(){
  this.userAuthService.clear();
  this.router.navigate(['/home'])
 }
}
