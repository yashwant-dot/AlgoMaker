import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { GetAllAccounts, getAllAccounts } from '../../+state';
import { MatDialog } from '@angular/material/dialog';
import { ZerodhaComponent } from '../zerodha/zerodha.component';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  selectedIndex = 0;
  dataSource!: MatTableDataSource<any>;
  dataToDisplay: any[] = [];
  columnsToDisplay: string[] = ['broker', 'userID', 'balance', 'createdAt'];
  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAllAccounts());
    this.store
      .select(getAllAccounts)
      .subscribe((data) => this.initDataSource(data));
  }

  initDataSource(data: any) {
    console.log('component...', data);
    if (data) {
      this.dataToDisplay = data.map((d) => {
        return {
          broker: d.broker,
          userID: d.userID,
          balance: d.balance,
          createdAt: d.createdAt,
          default: d.isDefault,
        };
      });
      this.dataSource = new MatTableDataSource(this.dataToDisplay);
    }
  }

  onAddAccount() {
    const dialogRef = this.dialog.open(ZerodhaComponent, {
      width: '40%',
    });
  }
}
