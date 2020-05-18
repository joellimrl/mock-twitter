import { Component, OnInit, Input } from '@angular/core';
import { Tweet, Comment } from '../tweet';
import { Globals } from '../globals'


@Component({
  selector: 'app-tweet-component',
  templateUrl: './tweet-component.component.html',
  styleUrls: ['./tweet-component.component.scss']
})
export class TweetComponentComponent implements OnInit {
  @Input() tweet: Tweet;

  comments: Comment[] = [];
  comment: string = "";
  addingCommentFlag: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.comments = this.tweet.comments;
  }

  clickLike() {
    this.tweet.likes += 1;
  }

  addComment () {
    this.addingCommentFlag = false;
    if (this.comment.trim() === "") return;
    let newComment = {message: this.comment, author: Globals.user};
    this.tweet.comments.push(newComment);
    this.comment = "";
  }

  get haveComments() {
    return this.comments.length > 0;
  }

  get addingComment() {
    return this.addingCommentFlag;
  }

  clickComment() {
    this.addingCommentFlag = !this.addingCommentFlag;
  }
}
