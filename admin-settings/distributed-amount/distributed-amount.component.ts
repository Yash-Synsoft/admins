import { Component, OnInit } from "@angular/core";
import { IdistributAmount } from "../../../shared/interfaces/index";
import { SettingsService, ToastService, Validator } from "../../../shared/services";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  FormArray,
  Validators,
  Form
} from "@angular/forms"
import { distributedAmountError , messages } from "../../../app.constants"


@Component({
  selector: "app-distributed-amount",
  templateUrl: "./distributed-amount.component.html",
  styleUrls: ["./distributed-amount.component.css"]
})
export class DistributedAmountComponent implements OnInit {
  distributAmount: IdistributAmount[] = [];
  distributedAmountError = distributedAmountError;
  messages = messages;
  subscriptions: any[] = []; // stores all subscriptions
  distributedAmountForm: UntypedFormGroup; // Form for Amount
  currency: any[] = [];
  currancyName: any[] = [];
  selectedValue: any;
  amount: any;
  data: any;
  distribution_currency: any;
  distribution_amount: any;
  Commission: any;

  constructor(
    private settings: SettingsService,
    private toastService: ToastService,
    private dAmount: UntypedFormBuilder
  ) {
    this.distributedAmountForm = dAmount.group({
      distribution_currency: new UntypedFormControl("", Validators.required),
      distribution_amount: new UntypedFormControl("", Validators.required),
      Commission: new UntypedFormControl("", [Validators.required, Validator.commissionValidator]),
    })
  }

  ngOnInit() {
    localStorage.removeItem("usersearch");
    this.getCurrency();
    this.getDistributionData();
  }

  /**
* Retrive list of currencies from the database
*/
  getCurrency() {
    this.subscriptions.push(
      this.settings.getCurrency().subscribe(
        (data: any) => {
          if (data && data.statuscode) {
            this.currency = data.currency;
            // for (var i = 0; i < this.currency.length; i++) {
            //   this.currancyName.push(this.currency[i].name);
            // }
          } else {
          }
        },
        err => { }
      )
    );
  }

  /**
* Retrive data related to distribution currency and amount from the database
*/
  getDistributionData() {
    this.subscriptions.push(
      this.settings.getdistributedAmount().subscribe(
        (data: any) => {
          if (data && data.statuscode) {
            for (var i = 0; i < data.distributionData.length; i++) {
              if (data.distributionData[i].key === "distribution_currency") {
                this.distribution_currency = data.distributionData[i].value;
              }
              if (data.distributionData[i].key === "distribution_amount") {
                this.distribution_amount = data.distributionData[i].value;
              }
              if (data.distributionData[i].key === "Commission") {
                this.Commission = data.distributionData[i].value;
              }
            }

          }
        },
        err => { }
      )
    );
  }

  /**
* Add distribution currency, commission and amount to the database
*/
  addData(data: IdistributAmount) {
    this.data = {
      distribution_currency: this.distribution_currency,
      distribution_amount: this.distribution_amount,
      Commission: this.Commission
    };
    this.subscriptions.push(
      this.settings.distributedAmmount(this.data).subscribe(
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
