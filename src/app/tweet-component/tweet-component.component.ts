import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  // comments: Comment[] = [];
  // comment = '';
  // addingCommentFlag = false;
  likesColor: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private cookieService: Cookies) {}

  ngOnInit(): void {
    this.currentUser = this.cookieService.currentUser('get');

    // check if liked
    if (this.tweet.likes.find((email) => email === this.currentUser.email))
      this.likesColor = 'rgb(111, 0, 255)';
  }

  clickLike() {
    // check if already liked
    if (!this.tweet.likes.find((email) => email === this.currentUser.email)) {
      this.cookieService.addLike(this.currentUser, this.tweet);
      this.likesColor = 'rgb(111, 0, 255)';
    } else {
      this.cookieService.removeLike(this.currentUser, this.tweet);
      this.likesColor = 'black';
    }
    this.loadTweets.emit();
  }

  // addComment() {
  //   this.addingCommentFlag = false;
  //   if (this.comment.trim() === '') return;
  //   // const newComment = { message: this.comment, author: Globals.user };
  //   // this.tweet.comments.push(newComment);
  //   this.comment = '';
  // }

  // get haveComments() {
  //   return this.comments.length > 0;
  // }

  // get addingComment() {
  //   return this.addingCommentFlag;
  // }

  // clickComment() {
  //   this.addingCommentFlag = !this.addingCommentFlag;
  // }

  openModal() {
    // const dialogConfig = new MatDialogConfig();
    // // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = false;
    // dialogConfig.id = 'modal-component';
    // // https://material.angular.io/components/dialog/overview
    // const modalDialog = this.matDialog.open(
    //   CommentModalComponent,
    //   dialogConfig
    // );
  }
}
