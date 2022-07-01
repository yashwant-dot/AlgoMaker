import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-lending',
  templateUrl: './crypto-lending.component.html',
  styleUrls: ['./crypto-lending.component.scss'],
})
export class CryptoLendingComponent implements OnInit {
  breadcrumbItems: any[] = [
    { label: 'Crypto', active: true },
    { label: 'Lending', active: true },
  ];
  constructor() {}

  ngOnInit(): void {}
}
