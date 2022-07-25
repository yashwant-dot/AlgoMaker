import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  @Input('dataToDisplay')
  set data(dataToDisplay: any[]) {
    this.initTableData(dataToDisplay);
  }

  @Input() columns: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {}

  ngOnInit(): void {}

  initTableData(data: any[]) {
    const ordersData = data.map((d) => {
      return {
        orderId: d.orderId,
        orderSymbol: d.orderSymbol,
        quantity: d.quantity,
        direction: d.direction,
        price: d.price,
        status: d.status,
        remarks: d.remarks,
        createdAt: d.createdAt,
      };
    });
    this.dataSource = new MatTableDataSource(ordersData);
    this.dataSource.sort = this.sort;
  }
}
