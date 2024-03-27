import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendidikanPageRoutingModule } from './pendidikan-routing.module';

import { PendidikanPage } from './pendidikan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendidikanPageRoutingModule
  ],
  declarations: [PendidikanPage]
})
export class PendidikanPageModule {}
