import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardsRoutes } from './dashboards.routes';
import { environment } from 'src/app/environment/environment';

@NgModule({
  declarations: [
    AppDashboard1Component,
    AppDashboard2Component,
  ],
  imports: [
    RouterModule.forChild(DashboardsRoutes),    
    
  ],
  exports: [
    AppDashboard1Component,
    AppDashboard2Component,
  ],
})
export class DashboardsModule {}