import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputPendidikanPage } from './input-pendidikan.page';

const routes: Routes = [
  {
    path: '',
    component: InputPendidikanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputPendidikanPageRoutingModule {}
