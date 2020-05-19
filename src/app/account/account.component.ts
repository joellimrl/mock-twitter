import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookies } from '../cookie.service';
import { CurrentUser } from '../globals';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  currentUser: CurrentUser;
  constructor(private router: Router, private cookieService: Cookies) {}

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.cookieService.loginStatus('get')) {
      alert('You have not logged in yet! Please login or register first.');
      this.router.navigate(['/']).then(null, (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      });
    }
    this.currentUser = this.cookieService.currentUser('get');
  }

  // TODO Delete account, follow user (from home page)

  logout() {
    this.cookieService.loginStatus('set', 'false');
    this.cookieService.currentUser('set', null);
    this.router.navigate(['/']).then(
      () => {
        alert(`You have logged out successfully.`);
      },
      (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      }
    );
  }
}
