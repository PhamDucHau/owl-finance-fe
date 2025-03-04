import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule, DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "src/app/material.module";
import { AppDialogOverviewComponent } from "src/app/pages/ui-components/dialog/dialog.component";
import { DashboardsService } from "../../dashboards.service";
import { map, Observable, startWith, tap } from "rxjs";
import { id } from "date-fns/locale";

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-edit-transactions',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    OverlayModule,
    TablerIconsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatIconModule,
    MaterialModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,

  ],
  templateUrl: 'dialog-edit-transactions.html',
  styleUrl: './dialog-edit-transactions.scss',
  providers: [DatePipe],
})
// tslint:disable-next-line: component-class-suffix
export class DialogEditTransactionsComponent {
  public loadingSpinner = false;
  transactionsForm: FormGroup;
  

  constructor(
    private service: DashboardsService,
    public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.transactionsForm = this.fb.group({      
      category: [null, [Validators.required]],
      product: [null, [Validators.required]],
      money: [null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],      
    })
    if (data) {
      this.transactionsForm.get('category')?.setValue(data.category, { emitEvent: false });
      this.transactionsForm.get('product')?.setValue(data.product, { emitEvent: false });
      this.transactionsForm.get('money')?.setValue(data.money, { emitEvent: false });
    }
    else{
      this.transactionsForm.get('category')?.setValue('', { emitEvent: false });
      this.transactionsForm.get('product')?.setValue('', { emitEvent: false });
      this.transactionsForm.get('money')?.setValue('', { emitEvent: false });
    }
    
    
    



  }

  cancle(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    // this.dialogRef.close(true)
    if (this.transactionsForm.valid) {
      
      const body = {
        id: this.data._id || null,
        category: this.transactionsForm.get('category')?.value,
        product: this.transactionsForm.get('product')?.value,
        money: this.transactionsForm.get('money')?.value,
      }

      this.dialogRef.close(body)

    }
  }
 

  
  ngOnInit(): void {
  
   



  }

  onSubmit() {
    if (this.transactionsForm.valid) {
      console.log('Form Data:', this.transactionsForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }

  


}