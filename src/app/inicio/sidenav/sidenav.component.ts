import { Component, EventEmitter, Output } from '@angular/core';
import { AxiosService } from '../../_services/axios.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../_services/user-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private axiosService: AxiosService, 
    private userAuthService: UserAuthService, 
    private router:Router,
    public userService: UserServiceService) {

  }
	
  ngOnInit(): void{

  }

  //Llama al servicio de Autenticación de Usuario, retornando la funcion que trae los valores de rol y token otorgados al usuario
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }



 }