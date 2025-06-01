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
import { catchError, finalize, forkJoin, mergeMap, Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogConfirmYesNoComponent } from '../common/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import { DialogEditTransactionsComponent } from '../common/dialog-edit-transactions/dialog-edit-transactions';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogUpImageTransactionComponent } from '../common/dialog-up-image-transaction/dialog-up-image-transaction';


@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    CommonModule,CarouselModule, TablerIconsModule, MatDividerModule, MatCardModule,
    MatButtonToggleModule, MatProgressBarModule, MatIconModule, MatMenuModule,
    MatButtonModule, MatProgressSpinnerModule, OverlayModule
    
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
    margin: 40,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },     
    }
  };

 
  
  
  public loadingSpinner = false;
  protected dataCards$!: Observable<any | null>;
  public varTest = '';
  cards = Array(3).fill(0).map((_, i) => i + 1);
  ngOnInit() {    
    this.dataCards$ = this.service.dataCards$   
    
    this.service.getData().subscribe((res: any) => {
      // console.log(res);
      // this.varTest = res.email;
    });
  }

  daysUntilDue(dueDay: number): string {
    const today = new Date();
    const currentDay = today.getDate();
    let daysRemaining: number;
  
    if (dueDay >= currentDay) {
      daysRemaining = dueDay - currentDay;
    } else {
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, dueDay);
      const diffTime = nextMonth.getTime() - today.getTime();
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  
    if (daysRemaining <= 5) {
      return "high";
    } else if (daysRemaining <= 15) {
      return "medium";
    } else {
      return "low";
    }
  }
  openDialogAddCard() {
  
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
        result.cardName = card.name
        this.service.createTransaction(result).subscribe((res: any) => {
          
        
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
    
    dialogRef.afterClosed().subscribe(result => {
      this.loadingSpinner = true;
      
      
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

  onFileSelected(event: Event, card: any) {
    this.loadingSpinner = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {

      //   const imagePath = reader.result; // Lấy Base64 URL
      //   const body = {
      //     file: imagePath,
      //     data: [
      //       {
      //         date: null,
      //       description: "Bac Xiu Da M",
      //       discount:null,
      //       discount_rate:null,
      //       end_date:null,
      //       full_description:"Bac Xiu Da M",
      //       hsn:null,
      //       id:1342069562,
      //       lot:null,
      //       normalized_description:null,
      //       order:0,
      //       price:null,
      //       quantity:2,
      //       reference:null,
      //       section:null,
      //       sku:null,
      //       start_date:null,
      //       tags:[],
      //       tax:null,
      //       tax_rate:null,
      //       text:"2 Bac Xiu Da M\t\t78,000",
      //       total:78000,
      //       type:"food",
      //       unit_of_measure:null,
      //       upc:null,
      //       weight:null
      //     }
      //   ],
      //   brand: "HIGHLANDS COFFEE",
      //   logo: "https://cdn.veryfi.com/logos/tmp/e245d3f8-8ee3-47ee-a4d8-9b613aa09a2b.png"
      // }
      // console.log('body', body)
      // const dialogRef = this.dialog.open(DialogUpImageTransactionComponent, {
      //   width: '80%',
      //   data: body
      // });
      
  
      this.service.uploadImageTransaction(file).subscribe((res: any) => {
        if (res) {
          this.loadingSpinner = false;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (_event) => {
            const imagePath = reader.result; // Lấy Base64 URL
            const body ={
              file: imagePath,
              data: res.line_items,
              brand: res.vendor.name,
              logo: res.vendor.logo
            }
            
 
         
            console.log('body', body)
          
  
            const dialogRef = this.dialog.open(DialogUpImageTransactionComponent, {
              width: '80%',
              data: body
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if (result.data && result.data.length > 0) {
                this.loadingSpinner = true;
  
                // ✅ Return Observable từ map()
                const transactionRequests = result.data.map((item: any) => {
                 
                  item.cardId = card._id;
                  item.id = card._id;                 
                  
                  return this.service.createTransaction(item).pipe(
                    catchError(err => {
                      console.error('Transaction creation failed', err);
                      return []; // Trả về array rỗng để tránh lỗi
                    })
                  );
                });
  
                // ✅ Thực thi tất cả API bằng forkJoin()
                forkJoin(transactionRequests).pipe(
                  mergeMap(() => this.service.getData()),  // Fetch updated data sau khi tất cả transactions hoàn thành
                  finalize(() => this.loadingSpinner = false) // Đảm bảo spinner dừng khi hoàn tất
                ).subscribe(
                  () => console.log('Transactions created and data refreshed'),
                  error => console.error('Error updating data', error)
                );
              } else {
                this.loadingSpinner = false;
                console.log('No data to process');
              }
              console.log('The dialog was closed', result);
            });
          };
        }
      });
    }
  }

  
  
  
  



 
  
  
 
}

}
