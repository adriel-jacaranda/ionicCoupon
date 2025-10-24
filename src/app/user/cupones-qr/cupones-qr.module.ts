import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuponesQrPageRoutingModule } from './cupones-qr-routing.module';

import { CuponesQrPage } from './cupones-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuponesQrPageRoutingModule
  ],
  // declarations: [CuponesQrPage]
})
export class CuponesQrPageModule {}
