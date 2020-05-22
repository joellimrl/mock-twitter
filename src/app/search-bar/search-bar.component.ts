import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cookies } from '../cookie.service';
import { User, ShortUser } from '../globals';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() currentUser: ShortUser;
  allUsers: User[];
  filteredUsers: User[];
  searchText = '';
  constructor(private router: Router, public cookieService: Cookies) {}

  ngOnInit() {
    // get all the users except for the current user
    this.allUsers = this.cookieService
      .getGlobalUsers()
      .filter((user) => user.id !== this.currentUser.id);

    // use filtered users to display
    this.filteredUsers = this.allUsers;
  }

  get noUsersFound() {
    return this.filteredUsers.length === 0;
  }

  search() {
    this.filteredUsers = this.allUsers.filter((user) => {
      return (
        user.email.toUpperCase().includes(this.searchText.toUpperCase()) ||
        user.name.toUpperCase().includes(this.searchText.toUpperCase())
      );
    });
  }

  clickUser(user: User) {
    this.router.navigateByUrl(`/account/${user.id}`).then(
      () => window.location.reload(),
      (err) => {
        alert('An error has occurred, please try again.');
        console.log(err);
      }
    );
  }
}
