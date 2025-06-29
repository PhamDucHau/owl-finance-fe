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
  selector: 'app-dialog-how-long-buy-plan',
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
  templateUrl: 'dialog-how-long-buy-plan.component.html',
  styleUrl: './dialog-how-long-buy-plan.component.scss',
  providers: [DatePipe],
})
// tslint:disable-next-line: component-class-suffix
export class DialogHowLongBuyPlanComponent {
  public loadingSpinner = false;
  planForm: FormGroup;
  

  constructor(
    
    public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    
    
    
    
    



  }

  cancle(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.dialogRef.close(true)
  }
 

  
  ngOnInit(): void {
    this.planForm = this.fb.group({
      product_name: ['', Validators.required],
      price: ['', Validators.required],
      salary_month: ['', [Validators.required]],
      // how_long_buy: ['', [Validators.required]],
      daily_expenses: ['', [Validators.required]],
      
    })
  
   



  }

  doAction() {
    console.log(this.planForm.value);
    console.log(this.planForm.valid);
    this.dialogRef.close(this.planForm.value);
  }
  closeDialog(){
    this.dialogRef.close(false);
  }

  onSubmit(){}

  


}