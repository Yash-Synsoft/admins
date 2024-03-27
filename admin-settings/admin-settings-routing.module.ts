import { MinWithdrawComponent } from "./min-withdraw/min-withdraw.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminSettingsContainerComponent } from "./admin-settings-container.component";
import { VipLabelsComponent } from "./vip-labels/vip-labels.component";
import { DistributedAmountComponent } from "./distributed-amount/distributed-amount.component";
import { DistributionLabelComponent } from "./distribution-label/distribution-label.component";
import { PullCurrencyComponent } from "./pull-currency/pull-currency.component";
import { MasterCurrencyComponent } from "./master-currency/master-currency.component";
import { DistributtionRakebackComponent } from "./distributtion-rakeback/distributtion-rakeback.component";
import { RanksComponent } from "./ranks/ranks.component";

const routes: Routes = [
  {
    path: "",
    component: AdminSettingsContainerComponent,
    children: [
      {
        path: "",
        component: DistributedAmountComponent,
      },
      // {
      //   path: "viplabels",
      //   component: VipLabelsComponent,
      // },
      // {
      //   path: "distribution",
      //   component: DistributionSettingsComponent,
      // },
      {
        path: "distributamount",
        component: DistributedAmountComponent,
      },
      {
        path: "ranks",
        component: RanksComponent,
      },
      {
        path: "distributlable",
        component: DistributionLabelComponent,
      },
      {
        path: "pullCurrency",
        component: PullCurrencyComponent,
      },
      {
        path: "mastercurrency",
        component: MasterCurrencyComponent,
      },
      {
        path: "minwithdraw",
        component: MinWithdrawComponent,
      },
      // {
      //   path: "affiliateprogram",
      //   component: AffiliateProgramComponent,
      // },
      // {
      //   path: "liveraces",
      //   component: RacesComponent,
      // },
      {
        path: "rakebacklabels",
        component: DistributtionRakebackComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSettingsRoutingModule { }
