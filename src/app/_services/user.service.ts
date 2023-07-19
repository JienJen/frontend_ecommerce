import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API ="http://localhost:8080";

  requestHeader = new HttpHeaders(
    { "No-Auth":"True" }
    ); 
  constructor(private httpclient: HttpClient) { }

  public register(registerData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/api/users', registerData);
  }

  public login(loginData:any){
    return this.httpclient.post(this.PATH_OF_API, loginData, { headers: this.requestHeader })
  }
}
