import { Component } from '@angular/core';
import { Globals } from "./globals";  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mock-twitter';

  constructor(){}
  ngOnInit(){}

  get loginStatus(){
      return Globals.loginStatus;
  }
}
