import { Component, OnInit } from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faHome,
  faBullseye,
  faMoneyBillTransfer,
  faLocationDot,
  faArrowTrendUp,
  faBitcoinSign,
  faListCheck,
  faFileInvoice,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faHome = faHome;
  faBullseye = faBullseye;
  faMoneyBillTransfer = faMoneyBillTransfer;
  faLocationDot = faLocationDot;
  faArrowTrendUp = faArrowTrendUp;
  faBitcoinSign = faBitcoinSign;
  faListCheck = faListCheck;
  faFileInvoice = faFileInvoice;
  faAddressBook = faAddressBook;
  constructor(public activateR: Router) {}

  ngOnInit(): void {}
}
