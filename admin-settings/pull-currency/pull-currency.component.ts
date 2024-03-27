import { DashboardService } from "./../../../shared/services/dashboard/dashboard.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IdistributAmount } from "../../../shared/interfaces/index";
import { SettingsService, ToastService } from "../../../shared/services";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  FormArray,
  Validators,
  Form,
} from "@angular/forms";
import { pullCurrencyError, messages } from "../../../app.constants";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-pull-currency",
  templateUrl: "./pull-currency.component.html",
  styleUrls: ["./pull-currency.component.css"],
})
export class PullCurrencyComponent implements OnInit {
  pullCurrencyForm: UntypedFormGroup; // Form for Amount
  subscriptions: any[] = []; // stores all subscriptions
  currency: any[] = [];
  selected_currency: string = "BTC";
  amount: number = 0;
  fee: number = 0;
  disableButton: boolean = false;
  pullCurrencyError = pullCurrencyError;
  messages = messages;
  adminBal = [];
  @ViewChild("passwordModal") passwordModal: ElementRef;
  constructor(
    private modalService: NgbModal,
    private settings: SettingsService,
    private toastService: ToastService,
    private dashboardService: DashboardService,
    private fb: UntypedFormBuilder
  ) {
    this.pullCurrencyForm = fb.group({
      password: new UntypedFormControl("", Validators.required),
    });
  }

  ngOnInit() {
    localStorage.removeItem("usersearch");
    this.getCurrency();
    this.getAdminBalance();
  }

  reload() {
    this.getAdminBalance(true);
  }

  /**
   * this function is used for get today highest wagard
   */
  getAdminBalance(refresh = false) {
    this.subscriptions.push(
      this.dashboardService.getAdminTotalBalance(refresh).subscribe(
        (data: any) => {
          if (data.statuscode) {
            this.adminBal = data.userdata;
          }
        },
        (err) => {}
      )
    );
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
            var removeIndex = this.currency
              .map(function (item) {
                return item.code;
              })
              // .indexOf("EVEON");
              .indexOf("MYTOKEN");

            this.currency.splice(removeIndex, 1);
          } else {
          }
        },
        (err) => {}
      )
    );
  }

  checkForPassword(currency) {
    this.selected_currency = currency;
    this.modalService
      .open(this.passwordModal, { ariaLabelledBy: "exampleModalLabel" })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log(reason);
        }
      );
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  /**
   * Retrive list of currencies from the database
   */
  pullCurrency(formData) {
    this.closeModal();
    this.fee = this.currency.filter(
      (curr) => curr.code == this.selected_currency
    )[0].fee;
    let currData = {
      currency: this.selected_currency,
      fee: this.fee,
      password: formData.password,
      // amount: this.amount
    };
    this.disableButton = true;
    this.pullCurrencyForm.reset();
    this.subscriptions.push(
      this.settings.transferFunds(currData).subscribe(
        (data: any) => {
          this.disableButton = false;
          if (data && data.statuscode) {
            this.toastService.showSuccess(data.amount);
          } else {
            this.toastService.showDanger(data.message);
          }
        },
        (err) => {
          this.disableButton = false;
          this.toastService.showDanger(messages.something_went_wrong);
        }
      )
    );
  }

  /**
   * method to destroy all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
