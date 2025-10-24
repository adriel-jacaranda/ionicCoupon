import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclamarCuponPageRoutingModule } from './reclamar-cupon-routing.module';

import { ReclamarCuponPage } from './reclamar-cupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclamarCuponPageRoutingModule
  ],
  // declarations: [ReclamarCuponPage]
})
export class ReclamarCuponPageModule {}
