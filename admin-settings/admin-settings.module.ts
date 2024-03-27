import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminSettingsRoutingModule } from "./admin-settings-routing.module";
import { VipLabelsComponent } from "./vip-labels/vip-labels.component";
import { AdminSettingsContainerComponent } from "./admin-settings-container.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
// import { DistributionSettingsComponent } from '../races/distribution-settings/distribution-settings.component';
import { DistributedAmountComponent } from './distributed-amount/distributed-amount.component';
import { DistributionLabelComponent } from './distribution-label/distribution-label.component';
import { PullCurrencyComponent } from './pull-currency/pull-currency.component';
import { MasterCurrencyComponent } from './master-currency/master-currency.component';
// import { AffiliateProgramComponent } from '../affiliate/affiliate-program/affiliate-program.component';
import { MinWithdrawComponent } from './min-withdraw/min-withdraw.component';
// import { RacesComponent } from '../races/live-race/races.component';
import { CountdownModule } from "./countdown/countdown.module";
import { NgxPaginationModule } from "ngx-pagination";
import { DistributtionRakebackComponent } from './distributtion-rakeback/distributtion-rakeback.component';
import { RanksComponent } from "./ranks/ranks.component";

@NgModule({
  declarations: [VipLabelsComponent, AdminSettingsContainerComponent, DistributedAmountComponent, RanksComponent, DistributionLabelComponent, MasterCurrencyComponent, PullCurrencyComponent, MinWithdrawComponent, DistributtionRakebackComponent],
  imports: [
    CommonModule,
    AdminSettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CountdownModule,
    NgxPaginationModule
  ],
})
export class AdminSettingsModule { }
