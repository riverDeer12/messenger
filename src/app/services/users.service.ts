import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl = environment.apiUrl + '/applicationUsers';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + "/getSearchUsers");
  }

  registerUser(user: User) {
    return this.http.post(this.usersUrl + "/register/", user);
  }

  getUserDetails(){
    return this.http.get<User>(this.usersUrl + "/getUserDetails");
  }

  updateUserDetails(user: User){
    return this.http.post(this.usersUrl + "/updateUserDetails/", user);
  }
}
