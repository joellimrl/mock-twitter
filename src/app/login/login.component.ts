import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from "../globals";  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  get loginStatus(){
    return Globals.loginStatus;
  }

  login() {
    if (this.username === "admin" && this.password === "password") {
      this.loginMessage = "Welcome back!";
      Globals.loginStatus = true;
      this.router.navigate(['/home']).then(nav => {
      }, err => {
        alert("An error has occurred, please try again.")
        console.log(err)
      });;
    } else {
      this.loginMessage = "Login has failed, please try again";
    }
  }

  resetMessage() {
    this.loginMessage = "";
  }
}
