import { Component } from '@angular/core';
import {default as data} from '../data/userlist.json';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Members List';
  statusDict = {
    All: 'All',
    active: 'Online',
    inactive: 'Offline',
    away: 'Away'
  };
  filterDefault = 'All';
  sortDefault = 'A-Z';
  activeUsers = [];
  keys = [];
  masterList = [];

  constructor(public toastr: ToastrService) {
    this.keys = Object.keys(this.statusDict);

    const today = new Date().getTime();
    let userDay: number;
    let age: number;
    if (data.length > 0) {
      this.activeUsers = data.filter(exist => {
        if (exist.dateOfBirth) {
          userDay = new Date(exist.dateOfBirth).getTime();
          age = parseInt(String((today - userDay) / (1000 * 3600 * 24 * 365)), 10);
          return age > 18;
        }
      });
      this.masterList = this.activeUsers;
      this.changeStatus();
      this.applySort();
    } else {
      this.toastr.error('There are no members to display');
    }
  }

  changeStatus() {
    if (this.filterDefault === 'All') {
      this.activeUsers = this.masterList;
    } else {
      this.activeUsers = this.masterList.filter(exist => {
        return exist.status === this.filterDefault;
      });
    }
  }

  applySort() {
    if (this.sortDefault === 'A-Z') {
      this.activeUsers.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    } else {
      this.activeUsers.sort((a, b) => (a.firstName < b.firstName) ? 1 : -1);
    }
  }
}
