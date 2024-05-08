import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailAbsenPage } from './detail-absen.page';

const routes: Routes = [
  {
    path: '',
    component: DetailAbsenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailAbsenPageRoutingModule {}
