import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetOrders, getOrdersData } from '../../+state';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  dataToDisplay: any[];
  columnsToDisplay: string[] = [
    'orderId',
    'orderSymbol',
    'quantity',
    'direction',
    'price',
    'createdAt',
  ];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetOrders());
    this.store.select(getOrdersData).subscribe((data) => {
      if (data) {
        this.dataToDisplay = data;
      }
    });
  }
}
