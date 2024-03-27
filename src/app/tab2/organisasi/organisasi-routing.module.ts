import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganisasiPage } from './organisasi.page';

const routes: Routes = [
  {
    path: '',
    component: OrganisasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisasiPageRoutingModule {}
