import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuponesQrPage } from './cupones-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CuponesQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponesQrPageRoutingModule {}
