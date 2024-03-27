import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputBahasaPageRoutingModule } from './input-bahasa-routing.module';

import { InputBahasaPage } from './input-bahasa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputBahasaPageRoutingModule
  ],
  declarations: [InputBahasaPage]
})
export class InputBahasaPageModule {}
