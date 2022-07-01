import { Component, OnInit } from '@angular/core';
import { listData } from '../data';
@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit {
  listData: any[];
  constructor() {}

  ngOnInit(): void {
    this.listData = listData;
  }
}
