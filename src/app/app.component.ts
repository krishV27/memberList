import { Component } from '@angular/core';
import {default as data} from '../data/userlist.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShowMemberList';
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

  constructor() {
    this.keys = Object.keys(this.statusDict);

    const today = new Date().getTime();
    let userDay: number;
    let age: number;
    this.activeUsers = data.filter(exist => {
      userDay = new Date(exist.dateOfBirth).getTime();
      age = parseInt(String((today - userDay) / (1000 * 3600 * 24 * 365)) , 10);
      return age > 18;
    });
    this.masterList = this.activeUsers;
    this.changeStatus();
    this.applySort();
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
