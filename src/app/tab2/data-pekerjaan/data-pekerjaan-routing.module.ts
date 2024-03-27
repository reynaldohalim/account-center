import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataPekerjaanPage } from './data-pekerjaan.page';

const routes: Routes = [
  {
    path: '',
    component: DataPekerjaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataPekerjaanPageRoutingModule {}
