import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ordersData } from './data';
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  ordersData: any[];
  orderSearchForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[] = [
    'date',
    'type',
    'coin',
    'value',
    'usd',
    'status',
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ordersData = ordersData;
    this.orderSearchForm = this.fb.group({
      date: [''],
      coin: [''],
      type: [''],
      status: [''],
    });
    this.dataSource = new MatTableDataSource(ordersData);
  }
}
