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

  registerUsername: string = '';
  registerPassword: string = '';
  loginMessage: string = '';
  registerMessage: string = '';
  globalUser: string = Globals.user;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  get loginStatus(){
    return Globals.loginStatus;
  }

  findUser() {
    console.log(Globals.users);
    try {
      let currentUser = Globals.users.find(user => user.user === this.username);
      if (currentUser.password === this.password){
        return true;
      }
      else { return false;}
    } catch (e) {
      return false;
    }
  }

  login() {
    if (this.findUser()) {
      this.loginMessage = "Welcome back!";
      Globals.loginStatus = true;
      Globals.user = this.username;
      this.router.navigate(['/home']).then(nav => {
      }, err => {
        alert("An error has occurred, please try again.")
        console.log(err)
      });;
    } else {
      this.loginMessage = "Login has failed, please try again";
      this.username = "";
      this.password = "";
    }
  }

  register() {
    try{
      Globals.users.push({user: this.registerUsername, password: this.registerPassword});
      alert("Registered successfully, please proceed to login")
      this.registerUsername = "";
      this.registerPassword = "";
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }

  resetMessage() {
    this.loginMessage = "";
  }
}
