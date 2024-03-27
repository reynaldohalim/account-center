import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputIzinPageRoutingModule } from './input-izin-routing.module';

import { InputIzinPage } from './input-izin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputIzinPageRoutingModule
  ],
  declarations: [InputIzinPage]
})
export class InputIzinPageModule {}
