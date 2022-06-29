import { Component, OnInit } from '@angular/core';
import {
  ChartType,
  monthlyEarningChart,
  statData,
  emailSentBarChart,
  transactions,
} from './data';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  breadcrumbItems: any[] = [{ label: 'Welcome to Dashboard', active: true }];
  monthlyEarningChart: ChartType;
  emailSentBarChart: ChartType;
  statData: any[];
  transactions: any[];
  isActive: string;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faMapPin = faMapPin;
  constructor() {}

  ngOnInit(): void {
    this.monthlyEarningChart = monthlyEarningChart;
    this.emailSentBarChart = emailSentBarChart;
    this.statData = statData;
    this.isActive = 'year';
    this.transactions = transactions;
  }

  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series = [
      {
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
    ];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series = [
      {
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
    ];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series = [
      {
        name: 'Series A',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
    ];
  }
}
