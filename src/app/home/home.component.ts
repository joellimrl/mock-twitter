import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Tweet } from '../tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message: string = "";
  tweets: Tweet[] = [];

  constructor() { }

  ngOnInit(): void {
    this.tweets = Globals.tweets;
  }

  addTweet () {
    if (this.message.trim() === "") return;
    var newTweet: Tweet = { author: Globals.user, message: this.message, likes: 0, comments: []}
    Globals.tweets.push(newTweet)
    this.message = "";
  }

  get tweetsEmpty () {
    return Globals.tweets.length === 0;
  }
}
