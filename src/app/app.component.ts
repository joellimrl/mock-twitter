import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cookies } from './cookie.service';
import { ShortUser } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: ShortUser;
  constructor(private router: Router, private cookieService: Cookies) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit() {
    this.currentUser = this.cookieService.currentUser('get');
  }

  get loginStatus() {
    return this.cookieService.currentUser('get');
  }

  reload() {
    this.router.navigateByUrl(`/account/${this.currentUser.id}`).then(
      () => window.location.reload(),
      (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      }
    );
    window.location.reload();
  }
}
