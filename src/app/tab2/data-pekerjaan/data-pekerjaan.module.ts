import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataPekerjaanPageRoutingModule } from './data-pekerjaan-routing.module';

import { DataPekerjaanPage } from './data-pekerjaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataPekerjaanPageRoutingModule
  ],
  declarations: [DataPekerjaanPage]
})
export class DataPekerjaanPageModule {}
