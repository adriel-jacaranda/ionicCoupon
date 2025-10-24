import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdministrationService } from 'src/app/service/administration.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { CuponesQrPage } from '../cupones-qr/cupones-qr.page';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    QRCodeComponent,
    ReactiveFormsModule,
    IonicModule
  ],
})
export class CuponesPage implements OnInit {
  campania: any;
  cupones: any[] = [];
  codigoCupon = 'texto o código para QR';
  tipoCliente: any;
  cuponesAsig: any[] = [];

  constructor(
    private router: Router,
    private service: AdministrationService,
    public modal: ModalController
  ) {}

ngOnInit() {
  this.loadCampania();
  this.loadTipoCliente();

  if (this.campania?.id && this.tipoCliente) {
    this.loadCupones();
    this.loadCuponesAsignados();
  } else {
    console.warn('Faltan datos de campaña o cliente');
  }
}

  loadCampania() {
    const navigation = this.router.getCurrentNavigation();
    this.campania = navigation?.extras?.state?.['campania'] || this.getCampaniaFromStorage();

    if (this.campania) {
      localStorage.setItem('campania', JSON.stringify(this.campania));
      console.log('Campaña recibida:', this.campania);
    } else {
      console.warn('No se recibió ninguna campaña');
    }
  }

  getCampaniaFromStorage() {
    const data = localStorage.getItem('campania');
    return data ? JSON.parse(data) : null;
  }

  loadTipoCliente() {
    const userJson = localStorage.getItem('usuario');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.tipoCliente = user.user.id;
    }
  }

  loadCupones() {
    this.service.getCupones(this.campania.id).subscribe({
      next: (response) => {
        this.cupones = response;
        this.mergeCupones();
      },
      error: (error) => console.error('Error al obtener cupones:', error),
    });
  }

  loadCuponesAsignados() {
    this.service.getCuponesAsignados(this.tipoCliente).subscribe({
      next: (response) => {
        this.cuponesAsig = response;
        this.mergeCupones();
      },
      error: (error) => console.error('Error al obtener cupones asignados:', error),
    });
  }

mergeCupones() {
  const asignadosIds = this.cuponesAsig.map((item: any) => item.cupon_id);

  this.cupones = this.cupones.map((cupon: any) => ({
    ...cupon,
    asignado: asignadosIds.includes(cupon.id),
  }));

  // Ordenar: primero los no asignados
  this.cupones.sort((a, b) => (a.asignado === b.asignado ? 0 : a.asignado ? 1 : -1));
}


 async verCupon(item: any) {
  if (!item) return;

  const modal = await this.modal.create({
    component: CuponesQrPage,
    componentProps: { value: item }
  });

  await modal.present();

  const data = await modal.onDidDismiss();
  if (data?.data?.recargar) {
    this.loadCupones();
  }
}

}
