import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataPribadiPage } from './data-pribadi.page';

const routes: Routes = [
  {
    path: '',
    component: DataPribadiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataPribadiPageRoutingModule {}
