import { Component, OnInit } from '@angular/core';
import { IVipLabel } from "../../../shared/interfaces/index";
import { SettingsService, ToastService } from "../../../shared/services";
import { vipLabelError , messages} from "../../../app.constants"

@Component({
  selector: 'app-distributtion-rakeback',
  templateUrl: './distributtion-rakeback.component.html',
  styleUrls: ['./distributtion-rakeback.component.css']
})
export class DistributtionRakebackComponent implements OnInit {
  rackebackLabelData: IVipLabel[] = [];
  subscriptions: any[] = []; // stores all subscriptions
  vipLabelError = vipLabelError;
  messages= messages;
  error = [];
  isNotVaild: boolean = false;
  isDisabel: boolean= false;
  constructor(private settings: SettingsService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getrackebackLabelsData();
  }
 /**
   * Call api to fetch the vip label detail list
   * @param  {Number} id: search params
   */
  getrackebackLabelsData() {
    this.subscriptions.push(
      this.settings.getRakebackList().subscribe(
        (data: any) => {
          // console.log('rackback data is here ',data);
          if (data && data.statuscode) {
            this.rackebackLabelData = data.labels;
          } else {
          }
        },
        err => {}
      )
    );
  }
 /**
   * Validates for the number entered
   * @param  {Number} index: index of the table
   * @param  {Number} value: entered number
   */
  checkPriorValidation(index: number, value: number) {
    // console.log("call validation ")
    if(value > 100){
      this.error[index] = vipLabelError.valueError2.valueError;// "It should be greater than previous label value and less than next label value";
      this.isNotVaild = true;
      this.isDisabel = true;
    }else{
      this.error[index] = "";
      this.isNotVaild = false;
    }
    // this.isDisabel = false;
    // if(value == null ){
    //   this.isDisabel = true;
    // }
    // for (let i = 0; i < this.rackebackLabelData.length; i++) {

    //   if (this.rackebackLabelData.length - 1 != i && i != 0) {
    //     if (
    //       +this.rackebackLabelData[i].from <
    //       +this.rackebackLabelData[i - 1].from ||
    //       +this.rackebackLabelData[i].from > +this.rackebackLabelData[i + 1].from
    //     ) {
    //       this.error[i] = vipLabelError.valueError.valueError;// "It should be greater than previous label value and less than next label value";
    //       this.isNotVaild = true;
    //       this.isDisabel = true;
    //     } else {
    //       this.error[i] = "";
    //       this.isNotVaild = false;
    //     }
    //   } else if (
    //     this.rackebackLabelData.length - 1 == i &&
    //     +this.rackebackLabelData[i].from < +this.rackebackLabelData[i - 1].from
    //   ) {
    //     this.error[i] =  vipLabelError.greater.greaterValueError; //"It should be greater than previous label value";
    //     this.isNotVaild = true;
    //     this.isDisabel = true;
    //   } else if (
    //     i == 0 &&
    //     +this.rackebackLabelData[i].from > +this.rackebackLabelData[i + 1].from
    //   ) {
    //     this.error[i] = vipLabelError.less.lessValueError;//"It should be less than next label value";
    //     this.isNotVaild = true;
    //     this.isDisabel = true;
    //   } else {
    //     this.error[i] = "";
    //     this.isNotVaild =  false; //false;
    //   }
    // }

  }

     /**
   * Updates the vib label data using the api
   */
  updateRakeback() {
    // this.rackebackLabelData.map((data: IVipLabel, index: number) => {
    //   if (this.rackebackLabelData[index + 1] != undefined) {
    //     data.to = +this.rackebackLabelData[index + 1]["from"] - 0.01;
    //   }

    // });
    this.subscriptions.push(
      this.settings.updateRakeback(this.rackebackLabelData).subscribe(
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
