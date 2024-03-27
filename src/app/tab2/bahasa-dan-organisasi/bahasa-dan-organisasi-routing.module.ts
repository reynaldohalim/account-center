import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BahasaDanOrganisasiPage } from './bahasa-dan-organisasi.page';

const routes: Routes = [
  {
    path: '',
    component: BahasaDanOrganisasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BahasaDanOrganisasiPageRoutingModule {}
