import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import {
  DeleteStratergy,
  getStratergies,
  GetStratergy,
  SaveStratergyToUpdate,
  ToggleStratergy,
} from '../../+state';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stratergy',
  templateUrl: './stratergy.component.html',
  styleUrls: ['./stratergy.component.scss'],
})
export class StratergyComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  dataToDisplay: any[] = [];
  stratergyData: any[] = [];
  columnsToDisplay: string[] = [
    'name',
    'dataSymbol',
    'orderSymbol',
    'timeframe',
    'active',
    'action',
  ];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetStratergy());
    this.store
      .select(getStratergies)
      .subscribe((data) => this.initDataSource(data));
  }

  initDataSource(data: any[]): void {
    console.log('stratergy data...', data);
    this.stratergyData = data;
    this.dataToDisplay = data.map((d: any) => {
      return {
        id: d._id,
        name: d.name,
        dataSymbol: d.dataSymbol,
        orderSymbol: d.orderSymbol,
        timeframe: d.timeFrame,
        active: d.active,
      };
    });
    this.dataSource = new MatTableDataSource(this.dataToDisplay);
    this.dataSource.sort = this.sort;
  }

  onAddStratergy(): any {
    this.router.navigate(['admin/stratergy/add']);
  }

  onUpdateStratergy(id: string) {
    this.store.dispatch(
      new SaveStratergyToUpdate(
        this.stratergyData.find((stratergy) => stratergy._id === id)
      )
    );
    this.router.navigate(['admin/stratergy/update']);
  }

  onDeleteStratergy(id: string) {
    this.store.dispatch(new DeleteStratergy(id));
  }

  onToggleStratergy(id: string) {
    this.store.dispatch(new ToggleStratergy(id));
  }
}
