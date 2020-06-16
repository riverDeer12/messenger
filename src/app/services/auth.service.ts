import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  loginUser(loginData: undefined){
    return this.http.post(this.authUrl + "/login/", loginData);
  }

  userLogged(){
    return localStorage.getItem('token') != null;
  }
}
