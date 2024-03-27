import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputBahasaPage } from './input-bahasa.page';

const routes: Routes = [
  {
    path: '',
    component: InputBahasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputBahasaPageRoutingModule {}
