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
  selector: 'app-dashboard2',
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
    OverlayModule
  ],
  templateUrl: './dashboard2.component.html',
  styles: [`
    .cardWithShadow {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 12px;
      margin-bottom: 16px;
    }
    
    .mat-h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
    
    .text-muted {
      color: rgba(0,0,0,0.6);
    }
    
    .rounded-circle {
      border-radius: 50%;
    }
    
    .img-fluid {
      max-width: 100%;
      height: auto;
    }
  `]
})
export class AppDashboard2Component {

  public loadingSpinner = false;
  accounts: Account[] = [
    {
      email: 'hangngochongtest@gmail.com',
      balance: '0',
      points: 126,
      avatar: 'assets/images/avatar.png'
    },
    {
      email: 'Hau1@gmail.com',
      balance: '0',
      points: 126,
      avatar: 'assets/images/avatar.png'
    },
    {
      email: 'Hau123@gmail.com',
      balance: '0',
      points: 126,
      avatar: 'assets/images/avatar.png'
    }
  ];

  constructor(private service: DashboardsService, private dialog: MatDialog, private headerService: HeaderService) {}
  private dataFriendsDisplay = new BehaviorSubject<any | null>(null);
        public dataFriends$: Observable<any | null> =
            this.dataFriendsDisplay.asObservable();
    
    private dataPlanDisplay = new BehaviorSubject<any | null>(null);
    public dataPlan$: Observable<any | null> =
        this.dataPlanDisplay.asObservable();

  ngOnInit(): void {
    this.dataFriends$ = this.service.dataFriends$;  
    this.dataPlan$ = this.service.dataPlan$;
    
    this.service.getDataFriendsAccepted().subscribe();  
    this.service.getDataPlan().subscribe();
  }

  openDialogAddCard() {
    console.log('openDialogAddCard');
  }
  addEvent() {
    console.log('addEvent');
  }
  cancelInvitation(recipient_gmail:any){
    console.log('recipient_gmail', recipient_gmail)
    const dialogRef = this.dialog.open(DialogConfirmYesNoComponent, {
      width: '500px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data:{
        title: 'Xoá báo cáo',
        message: 'Bạn có chắc muốn xoá báo cáo này ?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result) {     
        this.headerService.cancelFriend(recipient_gmail).subscribe(
          (res: any) => {
            
            this.service.getDataFriendsAccepted().subscribe();   
            this.headerService.socketSendMess(recipient_gmail,'đã huỷ kết bạn').subscribe();
          },
          (error: any) => {
            console.log(error);
          }
        );     
       
      }
      
    });
  }
}
