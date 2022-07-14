import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import {
  DeleteStrategy,
  getStrategies,
  GetStrategy,
  SaveStrategyToUpdate,
  ToggleStrategy,
} from '../../+state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  dataToDisplay: any[] = [];
  strategyData: any[] = [];
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
    this.store.dispatch(new GetStrategy());
    this.store
      .select(getStrategies)
      .subscribe((data) => this.initDataSource(data));
  }

  initDataSource(data: any[]): void {
    console.log('strategy data...', data);
    this.strategyData = data;
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

  onAddStrategy(): any {
    this.router.navigate(['admin/strategy/add']);
  }

  onUpdateStrategy(id: string) {
    this.store.dispatch(
      new SaveStrategyToUpdate(
        this.strategyData.find((strategy) => strategy._id === id)
      )
    );
    this.router.navigate(['admin/strategy/update']);
  }

  onDeleteStrategy(id: string) {
    this.store.dispatch(new DeleteStrategy(id));
  }

  onToggleStrategy(id: string) {
    this.store.dispatch(new ToggleStrategy(id));
  }
}
