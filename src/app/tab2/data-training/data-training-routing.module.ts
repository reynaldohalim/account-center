import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataTrainingPage } from './data-training.page';

const routes: Routes = [
  {
    path: '',
    component: DataTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataTrainingPageRoutingModule {}
