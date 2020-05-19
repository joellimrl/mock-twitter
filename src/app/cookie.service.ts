import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User, COOKIE_NAMES, CurrentUser, mockUser } from './globals';

@Injectable({
  providedIn: 'root',
})
export class Cookies {
  constructor(private cookieService: CookieService) {
    if (!this.cookieService.check(COOKIE_NAMES.GLOBAL_USERS)) {
      this.setCookie(COOKIE_NAMES.GLOBAL_USERS, JSON.stringify([mockUser]));
    }
    if (!this.cookieService.check(COOKIE_NAMES.CURRENT_USER)) {
      this.setCookie(COOKIE_NAMES.CURRENT_USER, null);
    }
    if (!this.cookieService.check(COOKIE_NAMES.LOGIN_STATUS)) {
      this.setCookie(COOKIE_NAMES.LOGIN_STATUS, 'false');
    }
  }

  // TODO Combine current user and login status
  setCookie(name: string, message: string) {
    this.cookieService.set(name, message, 30, '/');
  }

  loginStatus(method: string, status?: string): boolean {
    if (method === 'get') {
      return this.cookieService.get(COOKIE_NAMES.LOGIN_STATUS) === 'true';
    }
    if (method === 'set') {
      try {
        this.setCookie(COOKIE_NAMES.LOGIN_STATUS, status);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }

  currentUser(method: string, user?: CurrentUser): CurrentUser {
    try {
      if (method === 'get') {
        return (JSON.parse(
          this.cookieService.get(COOKIE_NAMES.CURRENT_USER)
        ) as unknown) as CurrentUser;
      }
      if (method === 'set') {
        this.setCookie(COOKIE_NAMES.CURRENT_USER, JSON.stringify(user));
      }
    } catch (e) {
      console.log(e);
    }
  }

  addUser(user: User) {
    try {
      const globalUsers = (JSON.parse(
        this.cookieService.get(COOKIE_NAMES.GLOBAL_USERS)
      ) as unknown) as User[];
      globalUsers.push(user);
      this.setCookie(COOKIE_NAMES.GLOBAL_USERS, JSON.stringify(globalUsers));
    } catch (e) {
      console.log(e);
      alert('Something went wrong, please try again.');
    }
  }

  findUser(username: string): User {
    try {
      const globalUsers = (JSON.parse(
        this.cookieService.get(COOKIE_NAMES.GLOBAL_USERS)
      ) as unknown) as User[];
      console.log(globalUsers);
      return globalUsers.find((user) => user.email === username);
    } catch (e) {
      console.log(e);
    }
  }

  // addTweet() {}

  // addFollow() {}
}
