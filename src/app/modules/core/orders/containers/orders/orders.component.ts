import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading, GetOrders, getOrdersData } from '../../+state';

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
    'status',
    'remarks',
    'createdAt',
  ];
  loading$: Observable<any>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(getLoading);
    this.store.dispatch(new GetOrders());
    this.store.select(getOrdersData).subscribe((data) => {
      if (data) {
        this.dataToDisplay = data;
      }
    });
  }
}
