import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AxiosService } from '../../_services/axios.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../_services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private axiosService: AxiosService, 
    private userAuthService: UserAuthService, 
    private router:Router,
    public userService: UserServiceService) {

  }
	
  ngOnInit(): void{

  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  //Llama al servicio de Autenticación de Usuario, retornando la funcion que trae los valores de rol y token otorgados al usuario

 public isLoggedIn(){
  return this.userAuthService.isLoggedIn();
 }


 //Cierra la sesión del usuario y nos redirige a la página de Inicio
 public logout(){
  this.userAuthService.clear();
  this.router.navigate(['/Inicio'])
 }


}
