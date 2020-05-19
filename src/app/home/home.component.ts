import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookies } from '../cookie.service';
import { Tweet } from '../tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message = '';
  tweets: Tweet[] = [];

  constructor(private router: Router, private cookieService: Cookies) {}

  // TODO Get tweets from cookies, add follow system, move comments separate (tweet id, separate cookies for comments?)
  ngOnInit(): void {
    // Check if user is logged in
    if (!this.cookieService.loginStatus('get')) {
      alert('You have not logged in yet! Please login or register first.');
      this.router.navigate(['/']).then(null, (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      });
    }

    // this.tweets = Globals.tweets;
  }

  addTweet() {
    if (this.message.trim() === '') return;
    // var newTweet: Tweet = { author: Globals.user, message: this.message, likes: 0, comments: []}
    // Globals.tweets.push(newTweet)
    this.message = '';
  }

  get tweetsEmpty() {
    // return Globals.tweets.length === 0;
    return false;
  }
}
