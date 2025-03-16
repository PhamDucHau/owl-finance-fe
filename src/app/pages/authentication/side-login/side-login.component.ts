import { Component, Inject, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { SideLoginService } from './side-login.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, OverlayModule, TablerIconsModule],
  templateUrl: './side-login.component.html',
  styleUrl: './side-login.component.scss'
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
  private _snackBar = inject(MatSnackBar);
  public loadingSpinner = false;

  constructor(private settings: CoreService, 
              private router: Router,
              private auth: Auth,
              private service: SideLoginService) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });
  // alignhide = false

  get f() {
    return this.form.controls;
  }
  async loginWithGoogle() {
    this.loadingSpinner = true;
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      console.log('User logged in:', result.user);
      const data = {
        email: result.user.email,
        name: result.user.displayName,
        uid: result.user.uid,
      }
      this.service.getRegister(data).subscribe(res => {
        if (res) {
          localStorage.clear(); 
          setTimeout(() => {
            localStorage.setItem('tokens', res.token.accessToken);
            // this.form.reset();
            this.openSnackBar('Login successful', 'success');
            this.loadingSpinner = false;
            this.router.navigate(['/dashboards/dashboard1']);
          },2000)
          
        }
      },    
      error => {      
        this.loadingSpinner = false;
        this.openSnackBar('Login failed', 'error');
        
        
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  submit() {
    console.log(this.form.value);
    this.loadingSpinner = true;
    const data = {
      email: this.form.value.uname,
      password: this.form.value.password
    }
    this.service.login(data).subscribe(res => {
      if (res) {
        localStorage.clear(); 
        setTimeout(() => {
          localStorage.setItem('tokens', res.token.accessToken);
          // this.form.reset();
          this.openSnackBar('Login successful', 'success');
          this.loadingSpinner = false;
          this.router.navigate(['/dashboards/dashboard1']);
        },2000)
        
      }
    },    
    error => {
      setTimeout(() => {
        this.loadingSpinner = false;
        this.openSnackBar('Login failed', 'error');
      },2000)
    }
  )
    // this.router.navigate(['/dashboards/dashboard1']);
  }

  durationInSeconds = 3;
  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
    }); 
  }

  alignhide = true;
  iconVisible = true;

togglePasswordVisibility() {
  this.alignhide = !this.alignhide;
  this.iconVisible = false; // Ẩn icon ngay lập tức

  setTimeout(() => {
    this.iconVisible = true; // Hiển thị icon sau 300ms
  }, 300);
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
  `,
  standalone: true,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
