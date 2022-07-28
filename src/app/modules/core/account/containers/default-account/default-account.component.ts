import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDefaultAccount } from '../../+state';

@Component({
  selector: 'app-default-account',
  templateUrl: './default-account.component.html',
  styleUrls: ['./default-account.component.scss'],
})
export class DefaultAccountComponent implements OnInit {
  defaultAccount: any;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getDefaultAccount).subscribe((account) => {
      if (account) {
        console.log('acc...', account);
        this.defaultAccount = account;
      }
      console.log('no default account found.');
    });
  }
}
