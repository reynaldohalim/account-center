import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputOrganisasiPage } from './input-organisasi.page';

const routes: Routes = [
  {
    path: '',
    component: InputOrganisasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputOrganisasiPageRoutingModule {}
