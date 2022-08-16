import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { PositionService } from '../../position.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  totalPnl = 0;
  dataSource: MatTableDataSource<any>;
  dataToDisplay: any = [];
  columnsToDisplay: string[] = [
    'orderSymbol',
    'quantity',
    'buyValue',
    'sellValue',
    'pnl',
    'ltp',
  ];
  apiInterval;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private store: Store, public posServ: PositionService) {}

  ngOnInit(): void {
    this.loading = true;
    this.posServ.getPositions().subscribe((data) => {
      data.then((d) => {
        setTimeout(() => (this.loading = false), 1000);
        this.dataToDisplay = d;
        this.totalPnl = 0;
        Array.from(this.dataToDisplay).forEach((data: any) => {
          this.totalPnl += data.pnl;
        });
        this.dataSource = new MatTableDataSource(d);
        this.dataSource.sort = this.sort;
      });
    });
    this.apiInterval = setInterval(() => {
      this.posServ.getPositions().subscribe((data) => {
        data.then((d) => {
          this.dataToDisplay = d;
          this.dataSource = new MatTableDataSource(d);
          this.totalPnl = 0;
          Array.from(this.dataToDisplay).forEach((data: any) => {
            this.totalPnl += data.pnl;
          });
          this.dataSource.sort = this.sort;
        });
      });
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.apiInterval);
  }
}
