import { Component } from '@angular/core';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(
    public userService: UserServiceService) {

  }
}
