import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataLainlainPage } from './data-lainlain.page';

const routes: Routes = [
  {
    path: '',
    component: DataLainlainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataLainlainPageRoutingModule {}
