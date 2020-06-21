import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient,
              private navCtrl: NavController) { }

  loginUser(loginData: undefined){
    return this.http.post(this.authUrl + "/login/", loginData);
  }

  userLogged(){
    return localStorage.getItem('token') != null;
  }

  logOut(){
    localStorage.setItem('token', '');
    this.navCtrl.navigateBack('/login');
  }
}
