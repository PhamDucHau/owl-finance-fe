import { Component, Inject, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { SideRegisterService } from './side-register.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, OverlayModule],
  templateUrl: './side-register.component.html',
  styleUrl: './side-register.component.scss'
})
export class AppSideRegisterComponent {
  private _snackBar = inject(MatSnackBar);
  options = this.settings.getOptions();
  public loadingSpinner = false;

  constructor(private settings: CoreService, private router: Router, private service: SideRegisterService) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.loadingSpinner = true;
    console.log(this.form.value);
    const data = {
      name: this.form.value.uname,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.service.getRegister(data).subscribe(res => {
      if (res) {
        setTimeout(() => {
          this.form.reset();
          this.openSnackBar('Register successful', 'success');
          this.loadingSpinner = false;
        },2000)
        
      }
    },    
    error => {      
      setTimeout(() => {
        this.loadingSpinner = false;
        this.openSnackBar('Register failed', 'error');
      },2000)
      
      
    });
    // this.router.navigate(['/dashboards/dashboard1']);
  }
  durationInSeconds = 3;
  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
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
  `,
  standalone: true,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

