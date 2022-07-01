import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-kyc',
  templateUrl: './crypto-kyc.component.html',
  styleUrls: ['./crypto-kyc.component.scss'],
})
export class CryptoKycComponent implements OnInit {
  breadcrumbItems: any[] = [
    { label: 'Crypto', active: true },
    { label: 'KYC Application', active: true },
  ];
  constructor() {}

  ngOnInit(): void {}
}
