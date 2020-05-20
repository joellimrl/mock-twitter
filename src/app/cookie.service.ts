import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  User,
  COOKIE_NAMES,
  ShortUser,
  mockUser,
  Globals,
  Tweet,
} from './globals';

@Injectable({
  providedIn: 'root',
})
export class Cookies {
  constructor(private cookieService: CookieService) {
    // this.cookieService.deleteAll();
    if (!this.cookieService.check(COOKIE_NAMES.GLOBAL_USERS)) {
      this.setCookie(COOKIE_NAMES.GLOBAL_USERS, JSON.stringify([mockUser]));
    }
    if (!this.cookieService.check(COOKIE_NAMES.CURRENT_USER)) {
      this.setCookie(COOKIE_NAMES.CURRENT_USER, null);
    } else {
      Globals.currentUser = this.currentUser('get');
    }
  }

  setCookie(name: string, message: string) {
    this.cookieService.set(name, message, 30, '/');
  }

  // Set current user for easier access
  currentUser(method: string, user?: ShortUser): ShortUser {
    try {
      if (method === 'get') {
        return (JSON.parse(
          this.cookieService.get(COOKIE_NAMES.CURRENT_USER)
        ) as unknown) as ShortUser;
      }
      if (method === 'set') {
        this.setCookie(COOKIE_NAMES.CURRENT_USER, JSON.stringify(user));
        Globals.currentUser = user;
      }
    } catch (e) {
      console.log(e);
    }
  }

  // HOF for editing global users cookie since alot of methods use this
  editGlobal(fn: Function) {
    try {
      const globalUsers = (JSON.parse(
        this.cookieService.get(COOKIE_NAMES.GLOBAL_USERS)
      ) as unknown) as User[];
      fn(globalUsers);
      this.setCookie(COOKIE_NAMES.GLOBAL_USERS, JSON.stringify(globalUsers));
    } catch (e) {
      console.log(e);
      alert('Something went wrong, please try again.');
      throw e;
    }
  }

  // Login
  addUser(user: User) {
    this.editGlobal((globalUsers) => {
      globalUsers.push(user);
    });
  }

  findUser(email: string): User {
    try {
      const globalUsers = (JSON.parse(
        this.cookieService.get(COOKIE_NAMES.GLOBAL_USERS)
      ) as unknown) as User[];
      console.log(globalUsers);
      return globalUsers.find((user) => user.email === email);
    } catch (e) {
      console.log(e);
    }
  }

  // Tweets
  addTweet(currentUser: ShortUser, tweet: Tweet) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === currentUser.email
      );
      globalUsers[objIndex].tweets.push(tweet);
    });
  }

  addLike(currentUser: ShortUser, tweet: Tweet) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === currentUser.email
      );
      const tweetIndex = globalUsers[objIndex].tweets.findIndex(
        (t: Tweet) => t.id === tweet.id
      );
      globalUsers[objIndex].tweets[tweetIndex].likes.push(currentUser.email);
    });
  }

  removeLike(currentUser: ShortUser, tweet: Tweet) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === currentUser.email
      );
      const tweetIndex = globalUsers[objIndex].tweets.findIndex(
        (t: Tweet) => t.id === tweet.id
      );
      const likesIndex = globalUsers[objIndex].tweets[
        tweetIndex
      ].likes.findIndex((email: string) => email === currentUser.email);
      globalUsers[objIndex].tweets[tweetIndex].likes.splice(likesIndex, 1);
    });
  }

  // addFollow() {}
}
