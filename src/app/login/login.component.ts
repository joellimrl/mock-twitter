import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookies } from '../cookie.service';
import { User, ShortUser } from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Toggle button message, will be moved to constants
  TOGGLE_MESSAGE: string[] = ['Go to registration', 'Go to login'];
  loginToggle: string = this.TOGGLE_MESSAGE[0];

  // For login
  username = '';
  password = '';
  loginMessage = '';

  // For registration
  registerName = '';
  registerUsername = '';
  registerPassword = '';
  registerMessage = '';

  // Additional variables
  emailColor: string;
  passwordColor: string;

  currentUser: ShortUser;

  constructor(private router: Router, private cookieService: Cookies) {}

  ngOnInit() {
    // Get current user on initial startup if there is a user logged in already.
    this.currentUser = this.cookieService.currentUser('get');
  }

  get loginStatus() {
    // Get login status from cookies
    return this.cookieService.currentUser('get');
  }

  // Toggle logic between login and registration
  get displayToggle() {
    return this.loginToggle === this.TOGGLE_MESSAGE[0];
  }

  toggle() {
    if (this.loginToggle === this.TOGGLE_MESSAGE[0]) {
      this.loginToggle = this.TOGGLE_MESSAGE[1];
    } else {
      this.loginToggle = this.TOGGLE_MESSAGE[0];
    }
  }

  // Login function to retrieve user from global list of users from cookies
  getUser() {
    try {
      const currentUser = this.cookieService.findUser(this.username);
      if (currentUser.password === this.password) {
        return currentUser;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  // Login function
  login(user?: User) {
    const currentUser = user || this.getUser();
    if (currentUser) {
      // Successful login, set current user and login status, navigate to home
      this.loginMessage = 'Welcome back!';
      this.cookieService.currentUser('set', {
        name: currentUser.name,
        email: currentUser.email,
      });

      this.router.navigate(['/home']).then(null, (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      });
    } else {
      // Failed login, reset input fields
      this.loginMessage = 'Login has failed, please try again';
      this.username = '';
      this.password = '';
    }
  }

  // Validation logic
  validate(type: string, message: string) {
    if (type === 'email') {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(message); // email validation
    } else if (type === 'password') {
      return /^[A-Za-z]\w{7,15}$/.test(message); // 8 to 16 chars, only characters and numerals, first char is letter
    }
  }

  // Register function
  register() {
    try {
      // Search if email is already registered
      if (this.cookieService.findUser(this.registerUsername)) {
        this.registerMessage = 'This email has already been registered.';
      } else {
        // Validate email and password
        if (this.validate('email', this.registerUsername)) {
          if (this.validate('password', this.registerPassword)) {
            // Successful validation, proceed to register user in global user cookies and login.
            const newUser: User = {
              name: this.registerName,
              email: this.registerUsername,
              password: this.registerPassword,
              tweets: [],
              follows: [],
            };
            this.cookieService.addUser(newUser);
            alert('Registered successfully, logging in now.');
            this.login(newUser);
          } else {
            // Password or email failed validation, highlights input field red and requests to try again.
            this.registerMessage =
              'You have entered the password incorrectly.\nPlease use 8 to 16 characters or numerals and start with a letter.';
            this.passwordColor = 'red';
          }
        } else {
          this.registerMessage =
            'You have entered the email incorrectly.\nPlease use a valid email.';
          this.emailColor = 'red';
        }
      }
      // Clears input field for cleanliness
      this.registerName = '';
      this.registerUsername = '';
      this.registerPassword = '';
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }

  // Resets errors on new input
  resetMessage() {
    this.loginMessage = '';
    this.registerMessage = '';
    this.passwordColor = 'lightgrey';
    this.emailColor = 'lightgrey';
  }
}
