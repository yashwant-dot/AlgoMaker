import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
  AddAccount,
  GetAllAccounts,
  getAllAccounts,
  MakeAccountDefault,
} from '../../+state';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountFormComponent } from '../../components';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  selectedIndex = 0;
  dataSource!: MatTableDataSource<any>;
  dataToDisplay: any[] = [];
  columnsToDisplay: string[] = [
    'broker',
    'userID',
    'balance',
    'createdAt',
    'default',
    'action',
  ];
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
          accountId: d._id,
        };
      });
      this.dataSource = new MatTableDataSource(this.dataToDisplay);
    }
  }

  onAddAccount() {
    const dialogRef = this.dialog.open(AddAccountFormComponent, {
      width: '40%',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          new AddAccount({
            ...result,
            user: JSON.parse(localStorage.getItem('user'))?._id,
          })
        );
      }
    });
  }

  onMakeDefault(accountId) {
    console.log('acc id...', accountId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      autoFocus: false,
      data: {
        title: 'Confirm',
        message: 'Are you sure to make this account as default ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          new MakeAccountDefault({
            accountId,
          })
        );
      }
    });
  }
}
