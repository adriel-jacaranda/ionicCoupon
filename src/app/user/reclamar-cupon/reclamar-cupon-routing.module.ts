import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclamarCuponPage } from './reclamar-cupon.page';

const routes: Routes = [
  {
    path: '',
    component: ReclamarCuponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclamarCuponPageRoutingModule {}
