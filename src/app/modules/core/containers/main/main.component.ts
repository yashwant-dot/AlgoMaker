import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private observer: BreakpointObserver
  ) {}
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 850px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe((data) => {
      if (!data.error) {
        this.router.navigate(['login']);
        return;
      }
      alert(data.error);
    });
  }
}
