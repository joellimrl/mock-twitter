import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tweet, ShortUser, Comment, generateRandomID } from '../globals';
import { Cookies } from '../cookie.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  routeParams: Params;

  tweet: Tweet;
  currentUser: ShortUser;

  comment = '';
  comments: Comment[];
  addingCommentFlag = false;
  likesColor: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: Cookies
  ) {
    this.getRouteParams();
  }

  ngOnInit(): void {
    if (!this.cookieService.currentUser('get')) {
      alert('You have not logged in yet! Please login or register first.');
      this.router.navigate(['/']).then(null, (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      });
    }
    this.currentUser = this.cookieService.currentUser('get');

    this.refreshComments();
    // check if liked
    if (this.tweet.likes.find((email) => email === this.currentUser.email))
      this.likesColor = 'rgb(111, 0, 255)';
  }

  refreshComments() {
    this.tweet = this.cookieService.getTweet(this.routeParams.id);
    if (!this.tweet) {
      alert('This tweet does not exist! Going back to home page.');
      this.router.navigate(['/home']).then(null, (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      });
    }
    console.log(this.tweet);
    this.comments = this.tweet.comments;
  }

  getRouteParams() {
    // Route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.routeParams = params;
    });
  }

  clickLike() {
    if (!this.tweet.likes.find((email) => email === this.currentUser.email)) {
      this.cookieService.addLike(this.currentUser, this.tweet);
      this.likesColor = 'rgb(111, 0, 255)';
    } else {
      this.cookieService.removeLike(this.currentUser, this.tweet);
      this.likesColor = 'black';
    }
  }

  // TODO implement delete comment

  addComment() {
    this.addingCommentFlag = false;
    if (this.comment.trim() === '') return;
    const newComment: Comment = {
      id: generateRandomID(),
      author: this.currentUser,
      message: this.comment,
      date: new Date(),
    };
    this.cookieService.addComment(this.tweet, newComment);
    this.refreshComments();
    this.comment = '';
  }

  get haveComments() {
    return this.tweet.comments.length > 0;
  }

  get addingComment() {
    return this.addingCommentFlag;
  }

  clickComment() {
    this.addingCommentFlag = !this.addingCommentFlag;
  }
}
