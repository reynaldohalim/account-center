import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengalamanKerjaPage } from './pengalaman-kerja.page';

const routes: Routes = [
  {
    path: '',
    component: PengalamanKerjaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengalamanKerjaPageRoutingModule {}
