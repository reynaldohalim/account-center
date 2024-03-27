import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengalamanKerjaPageRoutingModule } from './pengalaman-kerja-routing.module';

import { PengalamanKerjaPage } from './pengalaman-kerja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengalamanKerjaPageRoutingModule
  ],
  declarations: [PengalamanKerjaPage]
})
export class PengalamanKerjaPageModule {}
