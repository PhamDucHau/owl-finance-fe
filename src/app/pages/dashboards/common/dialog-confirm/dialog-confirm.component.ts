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
  templateUrl: 'dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss',
  providers: [DatePipe],
})
// tslint:disable-next-line: component-class-suffix
export class DialogConfirmComponent {
  public loadingSpinner = false;
  public dataBanks: any = [];
  firstControl = new FormControl('');
  firstoption: string[] = [];
  filteredOptions: Observable<string[]>;
  cardsForm: FormGroup;
  defaultPrefix = 'XXXX XXXX XXXX '; // 12 ký tự X cố định

  constructor(
    private service: DashboardsService,
    public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    
    this.cardsForm = this.fb.group({
      bank_name: ['', Validators.required],
      card_number: ['', [Validators.required]],
      due_date: [null, [Validators.required, Validators.min(1)]],
      remaining_month: [null, [Validators.required, Validators.min(1)]],
      money_per_month: [null, [Validators.required, Validators.min(1000)]],
      send: [true]
    })
    
    if (data) {
      
      this.cardsForm.get('bank_name')?.setValue(data.bank_name, { emitEvent: false });
      this.cardsForm.get('card_number')?.setValue(data.card_number, { emitEvent: false });
      this.cardsForm.get('due_date')?.setValue(data.due_date, { emitEvent: false });
      this.cardsForm.get('remaining_month')?.setValue(data.remaining_month, { emitEvent: false });
      this.cardsForm.get('money_per_month')?.setValue(data.money_per_month, { emitEvent: false });
      this.cardsForm.get('send')?.setValue(data.send, { emitEvent: false });     
      
    }else{
      this.cardsForm.get('bank_name')?.setValue('', { emitEvent: false });
      this.cardsForm.get('card_number')?.setValue('', { emitEvent: false });
      this.cardsForm.get('due_date')?.setValue('', { emitEvent: false });
      this.cardsForm.get('remaining_month')?.setValue('', { emitEvent: false });
      this.cardsForm.get('money_per_month')?.setValue('', { emitEvent: false });
      this.cardsForm.get('send')?.setValue(false, { emitEvent: false });
    }



  }
 

  onSubmit() {
    if (this.cardsForm.valid) {
      console.log('Form Data:', this.cardsForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }

  formatCardNumber(value: string) {
    // Loại bỏ tiền tố nếu bị sửa
    if (!value.startsWith(this.defaultPrefix)) {
      this.cardsForm.get('card_number')?.setValue(this.defaultPrefix, { emitEvent: false });
      return;
    }
  }

  ngOnInit(): void {
  
    if (this.data) {
      this.firstControl.setValue(this.data.bank_name);
    }
    // this.cardsForm.get('card_number')?.setValue(this.defaultPrefix, { emitEvent: false });

    // this.cardsForm.get('card_number')?.valueChanges.subscribe(value => {
    //   this.formatCardNumber(value);
    // });

    this.service.getDataBank().subscribe((res: any) => {
      res.data.forEach((element: any) => {
        this.dataBanks.push(element.short_name)
        this.filteredOptions = this.firstControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || '', this.dataBanks))
        );
      })
    });



  }

  onOptionSelectedBank(event: any) {
    this.cardsForm.get('bank_name')?.setValue(event.option.value, { emitEvent: false });
  }
  private _filter(value: string, dataBanks: any): string[] {
    const filterValue = value.toLowerCase();


    return dataBanks.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  // private _filter(arg0: string): any {
  //   throw new Error("Method not implemented.");
  // }

  cancle(): void {
    this.dialogRef.close(false);
  }
  save(): void {
   
    if (this.cardsForm.valid) {
      
      const rawCardNumber = this.cardsForm.get('card_number')?.value || '';
      const cardNumber = rawCardNumber.replace(/\D/g, '').slice(-4); // Chỉ lấy 4 số cuối
      const body = {
        id: this.data._id || null,
        bank_name: this.firstControl.value,
        card_number: cardNumber,
        due_date: this.cardsForm.get('due_date')?.value,
        remaining_month: this.cardsForm.get('remaining_month')?.value,
        money_per_month: this.cardsForm.get('money_per_month')?.value,
        send: this.cardsForm.get('send')?.value
      }
      // console.log('body', body);
      

      this.dialogRef.close(body)
      // if (body) {
      //   this.service.createCard(body).subscribe((res: any) => {
      //     this.service.getData().subscribe();
      //   })
      // }
    } else {
      console.log('Form is invalid!', this.cardsForm.value);
    }

  }



}