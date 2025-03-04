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
  selector: 'app-dialog-confirm',
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
  templateUrl: 'dialog-confirm-yes-no.component.html',
  styleUrl: './dialog-confirm-yes-no.component.scss',
  providers: [DatePipe],
})
// tslint:disable-next-line: component-class-suffix
export class DialogConfirmYesNoComponent {
  public loadingSpinner = false;
  

  constructor(
    private service: DashboardsService,
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
  
   



  }

  


}