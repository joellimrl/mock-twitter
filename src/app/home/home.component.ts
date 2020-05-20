import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookies } from '../cookie.service';
import { Tweet, ShortUser, generateRandomID } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message = '';
  tweets: Tweet[] = [];
  currentUser: ShortUser;

  constructor(private router: Router, private cookieService: Cookies) {}

  // TODO add follow system,
  // following system, click on user name or icon, popup modal for account page to follow
  ngOnInit(): void {
    // Check if user is logged in
    const currentUser = this.cookieService.currentUser('get');
    if (!currentUser) {
      alert('You have not logged in yet! Please login or register first.');
      this.router.navigate(['/']).then(null, (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      });
    } else {
      this.currentUser = currentUser;
      // Load tweets
      this.loadTweets();
    }
  }

  loadTweets() {
    const user = this.cookieService.findUser(this.currentUser.email);
    const tweetsToDisplay = [...user.tweets];
    user.follows.forEach((email) => {
      const following = this.cookieService.findUser(email);
      tweetsToDisplay.push(...following.tweets);
    });
    this.tweets = tweetsToDisplay;
  }

  addTweet() {
    if (this.message.trim() === '') return;
    // add tweet to cookies
    const newTweet: Tweet = {
      id: `${this.currentUser.id}_${generateRandomID()}`,
      author: this.currentUser,
      message: this.message,
      likes: [],
      date: new Date(),
      comments: [],
    };
    this.cookieService.addTweet(this.currentUser, newTweet);
    this.loadTweets();
    this.message = '';
  }

  get tweetsEmpty() {
    return this.tweets.length === 0;
  }
}
