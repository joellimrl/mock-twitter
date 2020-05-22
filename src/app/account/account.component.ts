import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cookies } from '../cookie.service';
import { ShortUser, User } from '../globals';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  routeParams: Params;
  currentUser: ShortUser;
  accountUser: User;
  followMessage = 'Follow this person?';
  followButton = 'Follow';

  constructor(
    public router: Router,
    private cookieService: Cookies,
    private activatedRoute: ActivatedRoute
  ) {
    this.getRouteParams();
  }

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.cookieService.currentUser('get')) {
      alert('You have not logged in yet! Please login or register first.');
      this.router.navigate(['/']).then(null, (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      });
    }
    this.currentUser = this.cookieService.currentUser('get');

    // Get account from route
    this.accountUser = this.cookieService.findUserById(
      Number(this.routeParams.id)
    );

    // check if current user is following this person
    const userFollows = this.cookieService.findUser(this.currentUser.email)
      .follows;
    if (userFollows.includes(this.accountUser.email)) {
      this.followMessage = 'Unfollow this person?';
      this.followButton = 'Unfollow';
    } else {
      this.followMessage = 'Follow this person?';
      this.followButton = 'Follow';
    }
  }

  getRouteParams() {
    // Route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.routeParams = params;
    });
  }

  get isCurrentUser() {
    return this.currentUser.id === this.accountUser.id;
  }

  // TODO Delete account, follow user (from home page)

  logout() {
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

  addFollow() {
    this.cookieService.addFollow(this.currentUser, this.accountUser.email);
  }

  removeFollow() {
    this.cookieService.removeFollow(this.currentUser, this.accountUser.email);
  }

  clickFollow() {
    if (this.followMessage === 'Follow this person?') {
      this.addFollow();
    } else {
      this.removeFollow();
    }
    window.location.reload();
  }
}
