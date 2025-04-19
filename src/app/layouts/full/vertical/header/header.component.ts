import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  inject,
  Inject,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateService } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';
import { DialogConfirmYesNoComponent } from './commom/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import { BreadcrumbService } from '../../shared/breadcrumb/breadcrumb.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/icon-flag-en.svg',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: '/assets/images/flag/icon-flag-fr.svg',
    },
    {
      language: 'German',
      code: 'de',
      icon: '/assets/images/flag/icon-flag-de.svg',
    },
  ];

  infoMe: any;
  constructor(
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private service: HeaderService,
    private breadcrumbService: BreadcrumbService,
  ) {
    translate.setDefaultLang('en');
    this.infoMe = {
      email: localStorage.getItem('gmail'),      
    }
    console.log('this.infoMe', this.infoMe);
  }
  
  protected dataFriends$: Observable<any | null> 
  
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 3;
  openSnackBar(data: any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status }, // Truyền dữ liệu
    });
  }
  private audio = new Audio();
  ngOnInit(): void {   
    
    console.log('Component initialized');
    this.service.onMessage((data) => {
      this.audio.src = './assets/mp3/notification-18-270129.mp3';
      this.audio.play();
      console.log('Message received:', data);
      this.service.getEmail().subscribe();  
      this.service.getDataFriendsNotAccepted().subscribe();
      this.breadcrumbService.getDataFriendsAccepted().subscribe();
      this.openSnackBar(data.message, 'warning');   
      
    });

    this.dataFriends$ = this.service.dataFriends$;  

    this.service.getDataFriendsNotAccepted().subscribe();    
  }

  aiResponse: string = '';
  isLoading = false;

  getAIResponse() {
    this.isLoading = true;
    this.aiResponse = localStorage.getItem('aiResponse') || '';
    if(this.aiResponse === '') {
      const message = 'Cập nhật giá vàng, giá đất thành phố, giá bitcoin';
    this.service.getAIResponse(message).subscribe((res: any) => {
      
      console.log('res ai response', res);
      this.aiResponse = res.response.content;
      localStorage.setItem('aiResponse', this.aiResponse);
      this.isLoading = false;
    });
    }
    else {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  formatAIResponse(text: string) {
    if (!text) return '';
    
    return text
      // Convert newlines to <br>
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      // Convert markdown headings
      .replace(/### \*\*(.*?)\*\*/g, '<h3>$1</h3>')
      .replace(/#### \*\*(.*?)\*\*/g, '<h4>$1</h4>')
      // Convert markdown bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert markdown italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Convert markdown links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      // Wrap in paragraph tags
      .replace(/^(.+)$/, '<p>$1</p>');
  }

  acceptInvitation(recipient_gmail:any){
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
        this.service.acceptFriend(recipient_gmail).subscribe(
          (res: any) => {            
            this.service.getDataFriendsNotAccepted().subscribe();  
            this.breadcrumbService.getDataFriendsAccepted().subscribe();
            this.service.socketSendMess(recipient_gmail,'đã chấp nhận lời mời kết bạn').subscribe();
          },
          (error: any) => {
            console.log(error);
          }
        );     
       
      }
      
    });
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
        this.service.cancelFriend(recipient_gmail).subscribe(
          (res: any) => {
            
            this.service.getDataFriendsNotAccepted().subscribe(); 
            this.service.socketSendMess(recipient_gmail, 'đã từ chối lời mời kết bạn').subscribe();
             
          },
          (error: any) => {
            console.log(error);
          }
        );     
       
      }
      
    });

  }

  testSocketIo(){
    console.log('Test socket IO');
    this.service.sendMessage({ user: 'Nam', content: 'Xin chào!' });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSearchFriendDialog() {
    const dialogRef = this.dialog.open(AppSearchFriendDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  notifications: notifications[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Roman Joined thes Team!',
      subtitle: 'Congratulate him',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'New message received',
      subtitle: 'Salma sent you new message',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'New Payment received',
      subtitle: 'Check your earnings',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'Jolly completed tasks',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulatse him',
    },
  ]; 

  profiledd: profiledd[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-account.svg',
      title: 'My Profile',
      subtitle: 'Account Settings',
      link: '/',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-inbox.svg',
      title: 'My Inbox',
      subtitle: 'Messages & Email',
      link: '/apps/email/inbox',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-tasks.svg',
      title: 'My Tasks',
      subtitle: 'To-do and Daily Tasks',
      link: '/apps/taskboard',
    },
  ];

  apps: apps[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-dd-chat.svg',
      title: 'Chat Application',
      subtitle: 'Messages & Emails',
      link: '/apps/chat',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-dd-cart.svg',
      title: 'Todo App',
      subtitle: 'Completed task',
      link: '/apps/todo',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-dd-invoice.svg',
      title: 'Invoice App',
      subtitle: 'Get latest invoice',
      link: '/apps/invoice',
    },
    {
      id: 4,
      img: '/assets/images/svgs/icon-dd-date.svg',
      title: 'Calendar App',
      subtitle: 'Get Dates',
      link: '/apps/calendar',
    },
    {
      id: 5,
      img: '/assets/images/svgs/icon-dd-mobile.svg',
      title: 'Contact Application',
      subtitle: '2 Unsaved Contacts',
      link: '/apps/contacts',
    },
    {
      id: 6,
      img: '/assets/images/svgs/icon-dd-lifebuoy.svg',
      title: 'Tickets App',
      subtitle: 'Create new ticket',
      link: '/apps/tickets',
    },
    {
      id: 7,
      img: '/assets/images/svgs/icon-dd-message-box.svg',
      title: 'Email App',
      subtitle: 'Get new emails',
      link: '/apps/email/inbox',
    },
    {
      id: 8,
      img: '/assets/images/svgs/icon-dd-application.svg',
      title: 'Courses',
      subtitle: 'Create new course',
      link: '/apps/courses',
    },
  ];

  quicklinks: quicklinks[] = [
    {
      id: 1,
      title: 'Pricing Page',
      link: '/theme-pages/pricing',
    },
    {
      id: 2,
      title: 'Authentication Design',
      link: '/authentication/login',
    },
    {
      id: 3,
      title: 'Register Now',
      link: '/authentication/side-register',
    },
    {
      id: 4,
      title: '404 Error Page',
      link: '/authentication/error',
    },
    {
      id: 5,
      title: 'Notes App',
      link: '/apps/notes',
    },
    {
      id: 6,
      title: 'Employee App',
      link: '/apps/employee',
    },
    {
      id: 7,
      title: 'Todo Application',
      link: '/apps/todo',
    },
    {
      id: 8,
      title: 'Treeview',
      link: '/theme-pages/treeview',
    },
  ];
}

@Component({
  selector: 'search-dialog',
  standalone: true,
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });
}

@Component({
  selector: 'search-friend-dialog',
  standalone: true,
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule, CommonModule],
  templateUrl: 'search-friend-dialog.component.html',
})
export class AppSearchFriendDialogComponent {
  constructor(
    private service: HeaderService,
    private dialog: MatDialog,
  ) {}
  searchText: string = '';
  navItems = navItems;
  dataEmail$: Observable<any | null> 

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });

  ngOnInit(): void {
    this.dataEmail$ = this.service.dataEmail$;
    this.dataEmail$.subscribe((res: any) => {
      console.log('res data email', res);
      
    })
    this.service.getEmail().subscribe();   
  }

  

  addFriend(item: any) {


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
        this.service.addFriend(item.email).subscribe(
          (res: any) => {
            
            this.service.getEmail().subscribe();  
            this.service.getDataFriendsNotAccepted().subscribe();
            this.service.socketSendMess(item.email, 'đã gửi lời mời kết bạn').subscribe();
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
      
    });    
  }


  



}




@Component({
  selector: 'sussess-snackbar',
  template: `
   <span [class]="data.status">{{ data.message }}</span>

  `,
  styles: `
    .success {
      color: #13deb9 !important;
    }
    .error {
      color: red !important;
    }
    .warning {
      color: #FFC107 !important;
    }
  `,
  standalone: true,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
