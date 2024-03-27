import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataPribadiPageRoutingModule } from './data-pribadi-routing.module';

import { DataPribadiPage } from './data-pribadi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    DataPribadiPageRoutingModule
  ],
  declarations: [DataPribadiPage]
})
export class DataPribadiPageModule {}
