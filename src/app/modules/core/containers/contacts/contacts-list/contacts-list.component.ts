import { Component, OnInit } from '@angular/core';
import { userGridData } from '../data';
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  userGridData: any[];
  constructor() {}

  ngOnInit(): void {
    this.userGridData = userGridData;
  }
}
