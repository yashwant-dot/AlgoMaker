import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { getStratergies, GetStratergy } from '../../+state';
import { MatDialog } from '@angular/material/dialog';
import { StratergyFormComponent } from '../../components';

@Component({
  selector: 'app-stratergy',
  templateUrl: './stratergy.component.html',
  styleUrls: ['./stratergy.component.scss'],
})
export class StratergyComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  dataToDisplay: any[] = [];
  columnsToDisplay: string[] = [
    'name',
    'instrument',
    'symbol',
    'timeframe',
    'active',
    'action',
  ];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new GetStratergy());
    this.store
      .select(getStratergies)
      .subscribe((data) => this.initDataSource(data));
  }

  initDataSource(data: any): void {
    this.dataToDisplay = data.map((d: any) => {
      return {
        name: d.name,
        instrument: d.instrument1,
        symbol: d.instrument2,
        timeframe: d.timeFrame,
        active: d.active,
      };
    });
    console.log(this.dataToDisplay);
    this.dataSource = new MatTableDataSource(this.dataToDisplay);
    this.dataSource.sort = this.sort;
  }

  onCreate(): any {
    const dialogRef = this.dialog.open(StratergyFormComponent, {
      width: '80%',
      disableClose: true,
    });
  }
}
