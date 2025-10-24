import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlmacenDetallePage } from './almacen-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: AlmacenDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlmacenDetallePageRoutingModule {}
