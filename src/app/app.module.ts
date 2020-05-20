import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { TweetComponentComponent } from './tweet-component/tweet-component.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    TweetComponentComponent,
    CommentsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, MatIconModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
