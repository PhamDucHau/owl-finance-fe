import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { ViewportScroller } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, RouterLink],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class AppWelcomeComponent {


  constructor(
    private router: Router,
  ) {}
  goLogin() {
    this.router.navigate(['/dashboards/dashboard1']);
  }


}
