import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataKeluargaPageRoutingModule } from './data-keluarga-routing.module';

import { DataKeluargaPage } from './data-keluarga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataKeluargaPageRoutingModule
  ],
  declarations: [DataKeluargaPage]
})
export class DataKeluargaPageModule {}
