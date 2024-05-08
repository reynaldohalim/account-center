import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAbsenPageRoutingModule } from './detail-absen-routing.module';

import { DetailAbsenPage } from './detail-absen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAbsenPageRoutingModule
  ],
  declarations: [DetailAbsenPage]
})
export class DetailAbsenPageModule {}
