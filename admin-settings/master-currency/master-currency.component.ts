import { Component, OnInit } from '@angular/core';
import { SettingsService, ToastService } from "../../../shared/services";
import { ImasterCurrency } from "../../../shared/interfaces/index";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  Form,
  UntypedFormArray
} from "@angular/forms";
import { maxBitAmountError, messages } from "../../../app.constants"

@Component({
  selector: 'app-master-currency',
  templateUrl: './master-currency.component.html',
  styleUrls: ['./master-currency.component.css']
})
export class MasterCurrencyComponent implements OnInit {
  masterCurrency: ImasterCurrency[] = [];
  subscriptions: any[] = []; // stores all subscriptions
  currency: any[] = [];
  currencyFormGroup: UntypedFormGroup;
  maxBitAmountError= maxBitAmountError;
  messages = messages;

  constructor(
    private settings: SettingsService,
    private toastService: ToastService,
    private _fb: UntypedFormBuilder
  ) {
    this.currencyFormGroup = _fb.group({
      currencies: new UntypedFormArray([])
    })
  }

  ngOnInit() {
    localStorage.removeItem("usersearch");
    this.getCurrency();
  }

  addItem(masterDataArray): void {
    for (var i = 0; i < masterDataArray.length; i++) {
      (this.currencyFormGroup.controls.currencies as UntypedFormArray).push(this._fb.group({
        id:new UntypedFormControl(masterDataArray[i].id, Validators.required) ,
        name: new UntypedFormControl(masterDataArray[i].name, Validators.required),
        max_bet_amount: new UntypedFormControl(masterDataArray[i].max_bet_amount, Validators.required) ,
      }));
      // console.log((this.currencyFormGroup.controls.currencies as FormArray).controls[0])
    }
  }

  /**
* Retrive list of currencies from the database
*/
  getCurrency() {
    this.subscriptions.push(
      this.settings.getCurrency().subscribe(
        (data: any) => {
          if (data && data.statuscode) {
              this.addItem(data.currency);
          }
        },
        err => { }
      )
    );
  }

  /**
   * Updates the distribution data using the api
   */
  updateData(data: ImasterCurrency) {
    this.subscriptions.push(
      this.settings.updateMasterCurrency(data).subscribe(
        (data: any) => {
          if (data && data.statuscode) {
            this.toastService.showSuccess(data.message);
          } else {
            this.toastService.showDanger(data.message);
          }
        },
        err => {
          this.toastService.showDanger(messages.something_went_wrong);
        }
      )
    );
  }

    /**
* method to destroy all subscriptions
*/
ngOnDestroy(): void {
  this.subscriptions.forEach(s => s.unsubscribe());
}
}
