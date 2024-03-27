import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendidikanPage } from './pendidikan.page';

const routes: Routes = [
  {
    path: '',
    component: PendidikanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendidikanPageRoutingModule {}
