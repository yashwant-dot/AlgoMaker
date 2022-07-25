import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { getAllPositions, GetAllPositions } from '../../+state';
import { PositionService } from '../../position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit, OnDestroy {
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
  constructor(private store: Store, private posServ: PositionService) {}

  ngOnInit(): void {
    this.posServ.getPositions().subscribe((data) => {
      data.then((d) => {
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
