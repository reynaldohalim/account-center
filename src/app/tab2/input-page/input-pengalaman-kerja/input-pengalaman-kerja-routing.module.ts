import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputPengalamanKerjaPage } from './input-pengalaman-kerja.page';

const routes: Routes = [
  {
    path: '',
    component: InputPengalamanKerjaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputPengalamanKerjaPageRoutingModule {}
