import { Component } from '@angular/core';
import { AdministrationService } from '../service/administration.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlmacenDetallePage } from '../almacen-detalle/almacen-detalle.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  tipoCliente: any;
  campanias: any;

  constructor(private service: AdministrationService,public route:Router,private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    const userJson = localStorage.getItem('usuario');
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log(user);
      
      this.tipoCliente = user.user.id_tipo_cliente;
      console.log("userres",this.tipoCliente);
      
    }

    this.loadServicesAll();
  }

  loadServicesAll() {
    this.service.getCampanias(this.tipoCliente).subscribe({
      next: (response) => {
        this.campanias = response;
        console.log(this.campanias);
      },
      error: (error) => {
        console.error('Error al obtener ofertas:', error);
      },
    });
  }

goCoupons(item: any) {
  this.route.navigateByUrl('/cupones', { state: { campania: item } });
}

async openAlmacenModal(almacen: any) {
  const modal = await this.modalCtrl.create({
    component: AlmacenDetallePage,
    componentProps: { almacen }
  });
  return await modal.present();
}

}
