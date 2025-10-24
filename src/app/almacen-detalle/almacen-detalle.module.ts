import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlmacenDetallePageRoutingModule } from './almacen-detalle-routing.module';

import { AlmacenDetallePage } from './almacen-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlmacenDetallePageRoutingModule
  ],
  declarations: [AlmacenDetallePage]
})
export class AlmacenDetallePageModule {}
