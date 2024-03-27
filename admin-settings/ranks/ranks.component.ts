import { Component, OnInit } from "@angular/core";
import { SettingsService } from "src/app/shared";
import { IVipLabel } from "src/app/shared/interfaces";


@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.css']
})
export class RanksComponent implements OnInit {
  subscriptions: any[] = []; // stores all subscriptions
  ranksData: any[] = [];
  error: any[] = [];


  constructor(
    private settings: SettingsService,
  ) { }
  ngOnInit() {
    this.getRanksDetails()
  }

  getRanksDetails() {
    this.subscriptions.push(
      this.settings.getRanksDetails().subscribe(
        (data: any) => {
          console.log('vip data is here ', data);
          if (data && data.statuscode) {
            console.log('this is the rank data', data);
            this.ranksData = data.labels
            console.log('Array of the rank data', this.ranksData);

          } else {
          }
        },
        err => { }
      )
    );


  }
  checkPriorValidation(index: number, value: any) {

    if (value < 0 || value > 100) {
      this.error[index] = 'Enter a valid value between 0 and 100';
    } else {
      this.error[index] = '';
    }
  }


} 