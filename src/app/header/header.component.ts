import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../_services/axios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private axiosService: AxiosService) {

  }

  
  ngOnInit(): void{

  }
  
  public isLoggedIn(){
    
  }

}
