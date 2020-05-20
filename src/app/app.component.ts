import { Component } from '@angular/core';
import { Cookies } from './cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mock-twitter';

  constructor(private cookieService: Cookies) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit() {}

  get loginStatus() {
    return this.cookieService.currentUser('get');
  }
}
