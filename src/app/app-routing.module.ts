import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cupones',
    loadChildren: () => import('./user/cupones/cupones.module').then( m => m.CuponesPageModule)
  },
  {
    path: 'cupones-qr',
    loadChildren: () => import('./user/cupones-qr/cupones-qr.module').then( m => m.CuponesQrPageModule)
  },
  {
    path: 'reclamar-cupon',
    loadChildren: () => import('./user/reclamar-cupon/reclamar-cupon.module').then( m => m.ReclamarCuponPageModule)
  },
  {
    path: 'almacen-detalle',
    loadChildren: () => import('./almacen-detalle/almacen-detalle.module').then( m => m.AlmacenDetallePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
