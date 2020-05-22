import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  User,
  COOKIE_NAMES,
  ShortUser,
  mockUser,
  Globals,
  Tweet,
  Comment,
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

  // Get all users
  getGlobalUsers() {
    try {
      return (JSON.parse(
        this.cookieService.get(COOKIE_NAMES.GLOBAL_USERS)
      ) as unknown) as User[];
    } catch (e) {
      console.log(e);
      alert('Something went wrong, please try again.');
      throw e;
    }
  }

  // HOF for editing global users cookie since alot of methods use this
  editGlobal(fn: Function) {
    try {
      const globalUsers = this.getGlobalUsers();
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
      const globalUsers = this.getGlobalUsers();
      return globalUsers.find((user) => user.email === email);
    } catch (e) {
      console.log(e);
    }
  }

  findUserById(id: number): User {
    try {
      const globalUsers = this.getGlobalUsers();
      return globalUsers.find((user) => user.id === id);
    } catch (e) {
      console.log(e);
    }
  }

  // Tweets
  getTweet(tweetId: string) {
    try {
      const globalUsers = this.getGlobalUsers();
      const id = tweetId.split('_');
      const author = globalUsers.find((user) => user.id === Number(id[0]));
      return author.tweets.find((tweet) => tweet.id === tweetId);
    } catch (e) {
      console.log(e);
    }
  }

  addTweet(currentUser: ShortUser, tweet: Tweet) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === currentUser.email
      );
      globalUsers[objIndex].tweets.unshift(tweet);
    });
  }

  removeTweet(currentUser: ShortUser, tweet: Tweet) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === currentUser.email
      );
      const tweetIndex = globalUsers[objIndex].tweets.findIndex(
        (t: Tweet) => t.id === tweet.id
      );
      globalUsers[objIndex].tweets.splice(tweetIndex, 1);
    });
  }

  addLike(currentUser: ShortUser, tweet: Tweet) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === tweet.author.email
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
        (user: User) => user.email === tweet.author.email
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

  addComment(tweet: Tweet, comment: Comment) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === tweet.author.email
      );
      const tweetIndex = globalUsers[objIndex].tweets.findIndex(
        (t: Tweet) => t.id === tweet.id
      );
      globalUsers[objIndex].tweets[tweetIndex].comments.unshift(comment);
    });
  }

  removeComment(tweet: Tweet, comment: Comment) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === tweet.author.email
      );
      const tweetIndex = globalUsers[objIndex].tweets.findIndex(
        (t: Tweet) => t.id === tweet.id
      );
      const commentIndex = globalUsers[objIndex].tweets[
        tweetIndex
      ].comments.findIndex((c: Comment) => c.id === comment.id);
      globalUsers[objIndex].tweets[tweetIndex].comments.splice(commentIndex, 1);
    });
  }

  // Follow system
  addFollow(currentUser: ShortUser, userEmail: string) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === currentUser.email
      );
      globalUsers[objIndex].follows.push(userEmail);
    });
  }

  removeFollow(currentUser: ShortUser, userEmail: string) {
    this.editGlobal((globalUsers) => {
      const objIndex = globalUsers.findIndex(
        (user: User) => user.email === currentUser.email
      );
      const followIndex = globalUsers[objIndex].follows.findIndex(
        (e: string) => e === userEmail
      );
      globalUsers[objIndex].follows.splice(followIndex, 1);
    });
  }
}
