import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
  AddAccount,
  DeleteAccount,
  GetAllAccounts,
  getAllAccounts,
  MakeAccountDefault,
  UpdateAccount,
} from '../../+state';
import { MatDialog } from '@angular/material/dialog';
import { AccountFormComponent } from '../../components';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatSort) sort!: MatSort;
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
          password: d.password,
          pin: d.pin,
          totp_secret: d.totp_secret,
          auth_type: d.auth_type,
        };
      });
      this.dataSource = new MatTableDataSource(this.dataToDisplay);
      this.dataSource.sort = this.sort;
    }
  }

  onAddAccount() {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      width: '40%',
      autoFocus: false,
      disableClose: true,
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

  onUpdateAccount(account) {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      width: '40%',
      autoFocus: false,
      disableClose: true,
      data: account,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('on update...', result);
        this.store.dispatch(
          new UpdateAccount({
            ...result,
            accountId: account?.accountId,
            user: JSON.parse(localStorage.getItem('user'))?._id,
          })
        );
      }
    });
  }

  onMakeDefault(accountId) {
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

  onDeleteAccount(accountId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      autoFocus: false,
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to Delete this account ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          new DeleteAccount({
            accountId,
          })
        );
      }
    });
  }
}
