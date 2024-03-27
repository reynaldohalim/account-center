import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputKeluargaPageRoutingModule } from './input-keluarga-routing.module';

import { InputKeluargaPage } from './input-keluarga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputKeluargaPageRoutingModule
  ],
  declarations: [InputKeluargaPage]
})
export class InputKeluargaPageModule {}
