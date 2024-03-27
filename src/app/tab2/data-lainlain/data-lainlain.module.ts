import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataLainlainPageRoutingModule } from './data-lainlain-routing.module';

import { DataLainlainPage } from './data-lainlain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataLainlainPageRoutingModule
  ],
  declarations: [DataLainlainPage]
})
export class DataLainlainPageModule {}
