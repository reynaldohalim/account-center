import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataTrainingPageRoutingModule } from './data-training-routing.module';

import { DataTrainingPage } from './data-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTrainingPageRoutingModule
  ],
  declarations: [DataTrainingPage]
})
export class DataTrainingPageModule {}
