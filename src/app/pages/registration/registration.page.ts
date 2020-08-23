import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationError = false;
  registrationSubmited = false;

  constructor(private service: UsersService,
              private router: Router) { }

  registrationForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phoneNumber: new FormControl('', Validators.required)
    }
  )

  ngOnInit() {
  }

  onSubmit(registerForm: NgForm){
    this.registrationSubmited = true;
    this.service.registerUser(registerForm.value).subscribe(
      (response: any) =>{
        localStorage.setItem('token', response.token);      
          this.router.navigateByUrl('/feed');
      },
      () => {
        this.setErrorProperties();
      }
    )
  }

  setErrorProperties(){
    setTimeout(()=> {
      this.registrationError = true;
      this.registrationSubmited = false;
    }, 1000);
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

}
