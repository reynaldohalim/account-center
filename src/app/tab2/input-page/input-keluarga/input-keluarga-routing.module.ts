import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputKeluargaPage } from './input-keluarga.page';

const routes: Routes = [
  {
    path: '',
    component: InputKeluargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputKeluargaPageRoutingModule {}
