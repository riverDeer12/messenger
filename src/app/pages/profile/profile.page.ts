import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private service: UsersService) { }

  ngOnInit() {
    this.setUsersProfile();
  }

  setUsersProfile(){
    this.service.getUserDetails().subscribe((response) =>{

    })

    this.service.getUserDetails().subscribe(
      (response: any) =>{
        localStorage.setItem('token', response.token);      
        this.router.navigateByUrl('/feed');
      },
      () => {
        console.log("ne valja");
      }
    )
  }

}
