import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { PositionService } from '../../position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  dataSource: MatTableDataSource<any>;
  dataToDisplay: any = [];
  columnsToDisplay: string[] = [
    'orderSymbol',
    'buyValue',
    'sellValue',
    'pnl',
    'ltp',
  ];
  apiInterval;
  constructor(private store: Store, public posServ: PositionService) {}

  ngOnInit(): void {
    this.loading = true;
    this.posServ.getPositions().subscribe((data) => {
      data.then((d) => {
        setTimeout(() => (this.loading = false), 1000);
        this.dataToDisplay = d;
        this.dataSource = new MatTableDataSource(d);
      });
    });
    this.apiInterval = setInterval(() => {
      this.posServ.getPositions().subscribe((data) => {
        data.then((d) => {
          this.dataSource = new MatTableDataSource(d);
        });
      });
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.apiInterval);
  }
}
