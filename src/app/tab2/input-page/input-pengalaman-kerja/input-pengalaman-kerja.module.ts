import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputPengalamanKerjaPageRoutingModule } from './input-pengalaman-kerja-routing.module';

import { InputPengalamanKerjaPage } from './input-pengalaman-kerja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputPengalamanKerjaPageRoutingModule
  ],
  declarations: [InputPengalamanKerjaPage]
})
export class InputPengalamanKerjaPageModule {}
