import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartType, Activities, OveviewChart, activitiesData } from '../data';
@Component({
  selector: 'app-crypto-wallet',
  templateUrl: './crypto-wallet.component.html',
  styleUrls: ['./crypto-wallet.component.scss'],
})
export class CryptoWalletComponent implements OnInit {
  breadcrumbItems: any[] = [
    { label: 'Crypto', active: true },
    { label: 'Wallet', active: true },
  ];
  OveviewChart: ChartType;

  activitiesData: Activities[];

  activities$: Observable<Activities[]>;
  total$: Observable<number>;
  constructor() {}

  ngOnInit(): void {
    this.OveviewChart = OveviewChart;
    this.activitiesData = activitiesData;
  }
}
