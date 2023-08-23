import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { passwModel } from '../_model/password.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  constructor(private httpClient: HttpClient) { }

  public changePassword(dto: passwModel): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/resetPassword" , dto)
  }
}
