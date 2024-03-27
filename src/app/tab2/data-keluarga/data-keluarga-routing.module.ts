import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataKeluargaPage } from './data-keluarga.page';

const routes: Routes = [
  {
    path: '',
    component: DataKeluargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataKeluargaPageRoutingModule {}
