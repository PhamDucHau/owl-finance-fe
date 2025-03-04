import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { DashboardsService } from '../dashboards.service';
import { TablerIconComponent, TablerIconsModule } from 'angular-tabler-icons';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../common/dialog-confirm/dialog-confirm.component';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogConfirmYesNoComponent } from '../common/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import { DialogEditTransactionsComponent } from '../common/dialog-edit-transactions/dialog-edit-transactions';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    CommonModule,CarouselModule, TablerIconsModule, MatDividerModule, MatCardModule,
    MatButtonToggleModule, MatProgressBarModule, MatIconModule, MatMenuModule,
    MatButtonModule, MatProgressSpinnerModule
    
  ],
  templateUrl: './dashboard1.component.html',
  styleUrl: './dashboard1.component.scss',
  // providers: [AngularFireAuth],
})
export class AppDashboard1Component {
  constructor(
    private service: DashboardsService,
    private dialog: MatDialog,
  ) {
    
  }

  items = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' }
  ];

  customOptions: OwlOptions = {
    items: 3,
    // loop: true,
    margin: 20,
    nav: true,
    dots: true,
    // responsive: {
    //   0: { items: 1 },
    //   600: { items: 2 },
    //   1000: { items: 3 }
    // }
  };

 
  
  
  public loadingSpinner = false;
  protected dataCards$!: Observable<any | null>;
  public varTest = '';
  cards = Array(3).fill(0).map((_, i) => i + 1);
  ngOnInit() {
    this.dataCards$ = this.service.dataCards$
    console.log('this.dataCards$', this.dataCards$);
    
    this.service.getData().subscribe((res: any) => {
      // console.log(res);
      // this.varTest = res.email;
    });
  }
  openDialogAddCard() {
    console.log('openDialogAddCard');
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data:{
        title: 'Xoá báo cáo',
        message: 'Bạn có chắc muốn xoá báo cáo này ?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if(!result.id) {
        let body = result
        delete body.id              
        this.service.createCard(body).subscribe((res: any) => {
        // console.log('res', res);
        this.service.getData().subscribe();
      })
      }
      
    });
    
  }

  openDialogTransaction(card:any) {
    const dialogRef = this.dialog.open(DialogEditTransactionsComponent, {
      width: '500px',
      data: card

      // enterAnimationDuration,
      // exitAnimationDuration,
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadingSpinner = true;
      if(result) {
        result.cardId = card._id
        this.service.createTransaction(result).subscribe((res: any) => {
          console.log('card', card);
          console.log('res', res);
        
          this.service.getData().subscribe();
          this.loadingSpinner = false;
        })
        this.loadingSpinner = false;
      }else {
        this.loadingSpinner = false;
      }
      console.log('The dialog was closed', result);
    })
  }

  openDialogRemoveTransaction(card:any, data:any) {
    const dialogRef = this.dialog.open(DialogConfirmYesNoComponent, {
      width: '500px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data
    });
    
    dialogRef.afterClosed().subscribe(result => {     
      // console.log('The dialog was closed', result);
      if(result) {
        const body = data
        body.cardId = card._id    
        this.service.deleteTransaction(body).subscribe((res: any) => {          
          this.service.getData().subscribe();
        })
      }
    });
  }



  openDialogEditCard(data:any) {
    
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadingSpinner = true;
      
      if(result) {        
        this.service.updateCard(result).subscribe((res: any) => {          
          this.service.getData().subscribe();
          this.loadingSpinner = false;
        })
        this.loadingSpinner = false;
      }else {
        this.loadingSpinner = false;
      }
    });
    
  }

  openDialogEditTransaction(card:any, data:any) {
    
    const dialogRef = this.dialog.open(DialogEditTransactionsComponent, {
      width: '500px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data
    });
    console.log('data', data);
    dialogRef.afterClosed().subscribe(result => {
      this.loadingSpinner = true;
      console.log('result', result)
      
      if(result) {  
        const body = result
        body.cardId = card._id      
        this.service.updateTransaction(body).subscribe((res: any) => {          
          this.service.getData().subscribe();
          this.loadingSpinner = false;
        })
        this.loadingSpinner = false;
      }else {
        this.loadingSpinner = false;
      }
    });
    
  }

  openDialogRemoveCard(data:any) {
    const dialogRef = this.dialog.open(DialogConfirmYesNoComponent, {
      width: '500px',
      // enterAnimationDuration,
      // exitAnimationDuration,
      data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      console.log('data', data)
      // console.log('The dialog was closed', result);
      if(result) {
        const body = data
        delete body.deleted
        this.service.deleteCard(body).subscribe((res: any) => {
          // console.log('res', res);
          this.service.getData().subscribe();
        })
      }
    });
  }




  
  
 
}
