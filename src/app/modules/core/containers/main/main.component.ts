import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  open = true;
  ngOnInit(): void {}

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
