import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputPendidikanPageRoutingModule } from './input-pendidikan-routing.module';

import { InputPendidikanPage } from './input-pendidikan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputPendidikanPageRoutingModule
  ],
  declarations: [InputPendidikanPage]
})
export class InputPendidikanPageModule {}
