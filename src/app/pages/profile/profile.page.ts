import { User } from './../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  errorLoadingProfile: boolean;
  loadingData: boolean;
  user: User;

  constructor(private service: UsersService) { }

  ngOnInit() {
    this.loadingData = true;
    this.errorLoadingProfile = false;
    setTimeout(()=> {
      this.setUsersProfile();
    }, 1000);
  }

  setUsersProfile(){
    this.service.getUserDetails()
    .subscribe(user => {
        this.user = Object.assign(new User(), user);
        this.loadingData = false;
      },
      () => {
        this.loadingData = false;
        this.errorLoadingProfile = true;
      }
    )
  }
}
