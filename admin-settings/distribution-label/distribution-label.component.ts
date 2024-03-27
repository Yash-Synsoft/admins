import { Component, OnInit } from '@angular/core';
import { SettingsService, ToastService } from "../../../shared/services";
import { Idistributlabel } from "../../../shared/interfaces/index";
import { element } from 'protractor';
import { distributionLabelError, messages } from '../../../app.constants'

@Component({
  selector: 'app-distribution-label',
  templateUrl: './distribution-label.component.html',
  styleUrls: ['./distribution-label.component.css']
})
export class DistributionLabelComponent implements OnInit {
  distributlabel: Idistributlabel[] = [];
  subscriptions: any[] = [];
  error = [];
  isNotVaild: boolean = false;
  isTotalError: boolean = false;
  errorindex: any;
  distributionLabelError = distributionLabelError;
  messages= messages;
  isDisabel: boolean= false;
  constructor(
    private settings: SettingsService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    localStorage.removeItem("usersearch");
    this.getDistributionLable();
  }

  /**
   * Call api to fetch the distribution Lable list
   */
  getDistributionLable() {
    this.subscriptions.push(
    this.settings.getdistributedlable().subscribe(
      (data: any) => {
       // console.log("i am here to check eveon_claim ",data);
        if (data && data.statuscode) {
          this.distributlabel = data.labels;
        } else {
        }
      },
      err => { }
    ));
  }

  /**
   * Validates for the number entered
   * @param  {Number} index: index of the table
   * @param  {Number} eveon_claim: entered number
   */

  checkPriorValidation(index: number, eveon_claim: number) {
    this.isDisabel = false;
    if(eveon_claim == null ){
      this.isDisabel = true;
    }

    for (let i = 0; i < this.distributlabel.length; i++) {
      if (this.distributlabel.length - 1 != i && i != 0) {
        if (
          +this.distributlabel[i].eveon_claim <
          +this.distributlabel[i - 1].eveon_claim ||
          +this.distributlabel[i].eveon_claim > +this.distributlabel[i + 1].eveon_claim
        ) {
          this.error[i] = distributionLabelError.valueError.valueError;
          this.isNotVaild = true;
          this.isDisabel = true;
        } else {
          this.error[i] = "";
          this.isNotVaild = false;
        }
      } else if (
        this.distributlabel.length - 1 == i &&
        +this.distributlabel[i].eveon_claim < +this.distributlabel[i - 1].eveon_claim
      ) {
        this.error[i] = distributionLabelError.greater.greaterValueError;
        this.isNotVaild = true;
        this.isDisabel = true;
      } else if (
        i == 0 &&
        +this.distributlabel[i].eveon_claim > +this.distributlabel[i + 1].eveon_claim
      ) {
        this.error[i] = distributionLabelError.less.lessValueError;
        this.isNotVaild = true;
        this.isDisabel = true;
      } else {
        this.error[i] = "";
        this.isNotVaild = false;
      }
    }

  }


   /**
   * Updates the distribution data using the api
   */
  updateData() {
    this.subscriptions.push(
    this.settings.updateRakeback(this.distributlabel).subscribe(
      (data: any) => {
        if (data && data.statuscode) {
          this.toastService.showSuccess('Distribution data updated successfully.');
        } else {
          this.toastService.showDanger(data.message);
        }
      },
      err => {
        this.toastService.showDanger(messages.something_went_wrong);
      }
    ));
  }

    /**
* method to destroy all subscriptions
*/
ngOnDestroy(): void {
  this.subscriptions.forEach(s => s.unsubscribe());
}
}

