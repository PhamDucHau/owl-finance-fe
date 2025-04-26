import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule, DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
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
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule, provideNativeDateAdapter } from "@angular/material/core";

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [
    MatDialogActions,
    
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
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule
    
  ],
  templateUrl: './dialog-add-edit-plan.html',
  styleUrl: './dialog-add-edit-plan.scss',
  providers: [DatePipe, provideNativeDateAdapter()],
})
// tslint:disable-next-line: component-class-suffix
export class DialogAddEditPlanComponent {
  public loadingSpinner = false;
  public local_data: any;
  public imagePath: any;
  public form: FormGroup;
  public action: string;
  public isEdit: boolean;
  public isAdd: boolean;
  public isDelete: boolean;
  public isView: boolean;
  public isSearch: boolean;
  public isFilter: boolean;
  public isSort: boolean;
  public isPagination: boolean;
  public isExport: boolean;
  joiningDate: any;
  constructor(
    private service: DashboardsService,
    public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.local_data = data;
  }
  startDateDP: MatDatepicker<Date>;
  endDateDP: MatDatepicker<Date>;

  planForm: FormGroup;  

  cancle(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    console.log('save');
    console.log(this.planForm.value);

    this.dialogRef.close({data: this.planForm.value});
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  doAction() {
    this.dialogRef.close(true);
  }
 

  
  ngOnInit(): void {   
    this.planForm = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
    });
    
    this.planForm.get('image')?.valueChanges.subscribe((value: any) => {
      console.log(value);
      this.imagePreview = value;
    });
  }
 
  imagePreview: any;
  selectFile(event: any) {
    const file = event.target.files[0];
    if (file) {
    //   this.planForm.get('imagePath')?.setValue(file);
  
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.service.uploadFile(file).subscribe((res: any) => {
          console.log(res);
          this.imagePreview = res.url;
          this.planForm.get('image')?.setValue(res.url);
        });
      };
    }
  }

  onSubmit() {
    console.log('onSubmit');
  }

  


}