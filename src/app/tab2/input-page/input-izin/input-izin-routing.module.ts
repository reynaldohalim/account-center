import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputIzinPage } from './input-izin.page';

const routes: Routes = [
  {
    path: '',
    component: InputIzinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputIzinPageRoutingModule {}
