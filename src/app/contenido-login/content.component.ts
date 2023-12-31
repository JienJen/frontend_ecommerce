import { Component } from '@angular/core';
import { AxiosService } from '../_services/axios.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  
  constructor(private axiosService: AxiosService){}

  onLogin(input:any):void{
    this.axiosService.request(
      "POST",
      "/login",
      {
        login: input.login,
        password: input.password,
      }
    )
  }

  
	onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password,
            userEmail: input.userEmail,
            userPhoneNumber: input.userPhoneNumber
		    }
        
    )
  }
}
