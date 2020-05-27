import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet, ShortUser } from '../globals';
import { Cookies } from '../cookie.service';

@Component({
  selector: 'app-tweet-component',
  templateUrl: './tweet-component.component.html',
  styleUrls: ['./tweet-component.component.scss'],
})
export class TweetComponentComponent implements OnInit {
  @Input() tweet: Tweet;
  @Output('loadTweets') loadTweets: EventEmitter<Function> = new EventEmitter();
  currentUser: ShortUser;

  likesColor: string;

  constructor(private router: Router, private cookieService: Cookies) {}

  ngOnInit(): void {
    this.currentUser = this.cookieService.currentUser('get');

    // check if liked
    if (this.tweet.likes.find((email) => email === this.currentUser.email))
      this.likesColor = 'rgb(111, 0, 255)';
  }

  clickLike() {
    if (!this.tweet.likes.find((email) => email === this.currentUser.email)) {
      this.cookieService.addLike(this.currentUser, this.tweet);
      this.likesColor = 'rgb(111, 0, 255)';
    } else {
      this.cookieService.removeLike(this.currentUser, this.tweet);
      this.likesColor = 'black';
    }
    this.loadTweets.emit();
  }

  clickComment() {
    this.router.navigate([`/home/${this.tweet.id}`]).then(null, (err) => {
      alert('An error has occurred, please try again.');
      console.log(err);
    });
  }

  deleteTweet() {
    if (window.confirm('Are you sure you would like to delete this tweet?')) {
      this.cookieService.removeTweet(this.currentUser, this.tweet);
      this.loadTweets.emit();
    }
  }

  isAuthor(tweet: Tweet) {
    return tweet.author.id === this.currentUser.id;
  }
}
