import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  wrongLogin = false;
  loginSubmited = false;

  constructor(private service: AuthService, 
              private router: Router
              ) { }

  loginForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  )
  
  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    this.loginSubmited = true;
    this.service.loginUser(loginForm.value).subscribe(
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
      this.wrongLogin = true;
      this.loginSubmited = false;
    }, 1000);
  }

}
