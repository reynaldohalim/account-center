import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BahasaDanOrganisasiPageRoutingModule } from './bahasa-dan-organisasi-routing.module';

import { BahasaDanOrganisasiPage } from './bahasa-dan-organisasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BahasaDanOrganisasiPageRoutingModule
  ],
  declarations: [BahasaDanOrganisasiPage]
})
export class BahasaDanOrganisasiPageModule {}
