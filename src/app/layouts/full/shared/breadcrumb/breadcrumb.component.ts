import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TablerIconsModule } from 'angular-tabler-icons';
import { BreadcrumbService } from './breadcrumb.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { DialogConfirmYesNoComponent } from '../../vertical/header/commom/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import { HeaderService } from '../../vertical/header/header.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, TablerIconsModule, CommonModule, MatDialogModule, MatIconModule, MaterialModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class AppBreadcrumbComponent {
  // @Input() layout;
  pageInfo: Data | any = Object.create(null);
  myurl: any = this.router.url.slice(1).split('/');
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private breadcrumbService: BreadcrumbService,
    private headerService : HeaderService,
    public dialog: MatDialog,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      // tslint:disable-next-line - Disables all
      .subscribe((event) => {
        // tslint:disable-next-line - Disables all
        this.titleService.setTitle(event['title'] + ' - Angular 18');
        this.pageInfo = event;
      });
  }

  protected dataFriends$: Observable<any | null> 
  protected dataPlan$: Observable<any | null> 
  ngOnInit(): void {
    this.dataFriends$ = this.breadcrumbService.dataFriends$;  
    this.dataPlan$ = this.breadcrumbService.dataPlan$;
    
    this.breadcrumbService.getDataFriendsAccepted().subscribe();  
    this.breadcrumbService.getDataPlan().subscribe();
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
              
              this.breadcrumbService.getDataFriendsAccepted().subscribe();   
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
