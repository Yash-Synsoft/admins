import { Component, OnInit } from "@angular/core";
import { IVipLabel } from "../../../shared/interfaces/index";
import { SettingsService, ToastService } from "../../../shared/services";
import { vipLabelError , messages} from "../../../app.constants"

@Component({
  selector: "app-vip-labels",
  templateUrl: "./vip-labels.component.html",
  styleUrls: ["./vip-labels.component.css"]
})
export class VipLabelsComponent implements OnInit {
  vipLabelData: IVipLabel[] = [];
  subscriptions: any[] = []; // stores all subscriptions
  vipLabelError = vipLabelError;
  messages= messages;
  error = [];
  isNotVaild: boolean = false;
  isDisabel: boolean= false;
  constructor(
    private settings: SettingsService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    localStorage.removeItem("usersearch");
    this.getVipLabelsData();
  }

  /**
   * Call api to fetch the vip label detail list
   * @param  {Number} id: search params
   */
  getVipLabelsData() {
    this.subscriptions.push(
      this.settings.getVipLabelList().subscribe(
        (data: any) => {
          console.log('vip data is here ',data);
          if (data && data.statuscode) {
            this.vipLabelData = data.labels;
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
    this.isDisabel = false;
    if(value == null ){
      this.isDisabel = true;
    }
    for (let i = 0; i < this.vipLabelData.length; i++) {

      if (this.vipLabelData.length - 1 != i && i != 0) {
        if (
          +this.vipLabelData[i].from <
          +this.vipLabelData[i - 1].from ||
          +this.vipLabelData[i].from > +this.vipLabelData[i + 1].from
        ) {
          this.error[i] = vipLabelError.valueError.valueError;// "It should be greater than previous label value and less than next label value";
          this.isNotVaild = true;
          this.isDisabel = true;
        } else {
          this.error[i] = "";
          this.isNotVaild = false;
        }
      } else if (
        this.vipLabelData.length - 1 == i &&
        +this.vipLabelData[i].from < +this.vipLabelData[i - 1].from
      ) {
        this.error[i] =  vipLabelError.greater.greaterValueError; //"It should be greater than previous label value";
        this.isNotVaild = true;
        this.isDisabel = true;
      } else if (
        i == 0 &&
        +this.vipLabelData[i].from > +this.vipLabelData[i + 1].from
      ) {
        this.error[i] = vipLabelError.less.lessValueError;//"It should be less than next label value";
        this.isNotVaild = true;
        this.isDisabel = true;
      } else {
        this.error[i] = "";
        this.isNotVaild =  false; //false;
      }
    }

  }

  // checkFormFor

  /**
   * Updates the vib label data using the api
   */
  updateVipLabels() {
    this.vipLabelData.map((data: IVipLabel, index: number) => {
      if (this.vipLabelData[index + 1] != undefined) {
        data.to = +this.vipLabelData[index + 1]["from"] - 0.01;
      }
    });
    this.subscriptions.push(
      this.settings.updateVipLabel(this.vipLabelData).subscribe(
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
