import { User } from './../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  errorLoadingProfile: boolean;
  errorUpdatingProfile: boolean;
  editMode: boolean;
  loadingData: boolean;
  user: User;

  profileDetailsForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    userName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
  });

  constructor(private service: UsersService) { }

  ngOnInit() {
    this.loadingData = true;
    this.errorLoadingProfile = false;
    this.errorUpdatingProfile = false;
    this.editMode = false;
    setTimeout(()=> {
      this.setUsersProfile();
    }, 1000);
  }

  setUsersProfile(){
    this.service.getUserDetails()
    .subscribe(user => {
        this.user = Object.assign(new User(), user);
        this.loadingData = false;
      },() => {
        this.loadingData = false;
        this.errorLoadingProfile = true;
      }
    )
  }

  closeEditMode(){
    this.editMode = false;
  }

  openEditMode(){
    this.editMode = true;
    this.profileDetailsForm.controls["firstName"].setValue(this.user.firstName);
    this.profileDetailsForm.controls["lastName"].setValue(this.user.lastName);
    this.profileDetailsForm.controls["userName"].setValue(this.user.userName);
    this.profileDetailsForm.controls["email"].setValue(this.user.email);
  }

  updateProfileDetails(profileDetailsForm: NgForm){
    this.service.updateUserDetails(profileDetailsForm.value).subscribe(
      (response: any) => {
        this.editMode = false;
        this.setUsersProfile();
      },
      () => {
        this.errorUpdatingProfile = true;
      }
    );
  }
}
