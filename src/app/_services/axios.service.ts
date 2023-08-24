import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private _snackBar: MatSnackBar) { 
    axios.defaults.baseURL = "http://localhost:8080"
    }
  
    request(method: string, url: string, data: any): Promise<any>{
      return axios({
        method: method,
        url: url,
        data: data
      }).then(
        (response) => {
          this._snackBar.open("Verificar email para validar registro", "", {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'

        }
      );
          setTimeout(function(){window.location.href = "/login"}, 2500);

          return response.data;
        }).catch(
          (error) =>{
            this._snackBar.open("El usuario o Email ya está registrado", "", {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
    
          }
        );
            return Promise.reject(error)
          }
        )
    }
}
