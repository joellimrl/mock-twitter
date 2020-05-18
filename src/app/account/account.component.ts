import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout () {
    Globals.loginStatus = false;
    this.router.navigate(['/']).then(nav => {
      alert(`You have logged out successfully.`)
    }, err => {
      alert("An error has occurred, please try again.")
      console.log(err)
    });
  }
}
