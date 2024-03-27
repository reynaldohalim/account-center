import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputOrganisasiPageRoutingModule } from './input-organisasi-routing.module';

import { InputOrganisasiPage } from './input-organisasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputOrganisasiPageRoutingModule
  ],
  declarations: [InputOrganisasiPage]
})
export class InputOrganisasiPageModule {}
