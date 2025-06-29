import { Component } from '@angular/core';
import { CommonModule, AsyncPipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { DashboardsService } from '../dashboards.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/layouts/full/vertical/header/header.service';
import { DialogConfirmYesNoComponent } from '../common/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogAddEditPlanComponent } from '../common/dialog-add-edit-plan/dialog-add-edit-plan';
import { MatTabsModule } from '@angular/material/tabs';
// components
// import { AppWelcomeCardComponent } from '../../../components/dashboard2/welcome-card/welcome-card.component';
// import { AppPaymentsComponent } from '../../../components/dashboard2/payments/payments.component';
// import { AppProductsComponent } from '../../../components/dashboard2/products/products.component';
// import { AppRevenueUpdatesTwoComponent } from '../../../components/dashboard2/revenue-updates/revenue-updates.component';
// import { AppSalesOverviewComponent } from '../../../components/dashboard2/sales-overview/sales-overview.component';
// import { AppTotalEarningsComponent } from '../../../components/dashboard2/total-earnings/total-earnings.component';
// import { AppSalesProfitComponent } from '../../../components/dashboard2/sales-profit/sales-profit.component';
// import { AppMonthlyEarningsTwoComponent } from '../../../components/dashboard2/monthly-earnings/monthly-earnings.component';
// import { AppWeeklyStatsComponent } from '../../../components/dashboard1/weekly-stats/weekly-stats.component';
// import { AppYearlySalesComponent } from '../../../components/dashboard2/yearly-sales/yearly-sales.component';
// import { AppPaymentGatewaysComponent } from '../../../components/dashboard2/payment-gateways/payment-gateways.component';
// import { AppRecentTransactionsComponent } from '../../../components/dashboard2/recent-transactions/recent-transactions.component';
// import { AppProductPerformanceComponent } from '../../../components/dashboard2/product-performance/product-performance.component';

interface Account {
  email: string;
  balance: string;
  points: number;
  avatar: string;
}

@Component({
  selector: 'app-dashboard3',
  standalone: true,
  imports: [
    // AppWelcomeCardComponent,
    // AppPaymentsComponent,
    // AppProductsComponent,
    // AppRevenueUpdatesTwoComponent,
    // AppSalesOverviewComponent,
    // AppTotalEarningsComponent,
    // AppSalesProfitComponent,
    // AppMonthlyEarningsTwoComponent,
    // AppWeeklyStatsComponent,
    // AppYearlySalesComponent,
    // AppPaymentGatewaysComponent,
    // AppRecentTransactionsComponent,
    // AppProductPerformanceComponent,
    CommonModule,
    AsyncPipe,
    DecimalPipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    TablerIconsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatMenuModule,
    OverlayModule,
    MatExpansionModule,
    MatTabsModule
    
  ],
  templateUrl: './dashboard3.component.html',
  styleUrl: './dashboard3.component.scss',
})
export class AppDashboard3Component {
    constructor(private service: DashboardsService, private dialog: MatDialog, private headerService: HeaderService) {}

    activeTab: 'week' | 'month' | 'year' = 'week';

  setActiveTab(tab: 'week' | 'month' | 'year') {
    this.activeTab = tab;
  }


    
}