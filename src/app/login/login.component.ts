import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor() { }

  ngOnInit() {
  }

  login() {
    if (this.username === "admin" && this.password === "password") {
      this.loginMessage = "Welcome back!";
      // TODO Bind to go to home page
    } else {
      this.loginMessage = "Login has failed, please try again";
    }
  }

  resetMessage() {
    this.loginMessage = "";
  }
}
