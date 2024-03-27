import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganisasiPageRoutingModule } from './organisasi-routing.module';

import { OrganisasiPage } from './organisasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganisasiPageRoutingModule
  ],
  declarations: [OrganisasiPage]
})
export class OrganisasiPageModule {}
