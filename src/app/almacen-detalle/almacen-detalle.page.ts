import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-almacen-detalle',
  templateUrl: './almacen-detalle.page.html',
  styleUrls: ['./almacen-detalle.page.scss'],
  standalone: false
})
export class AlmacenDetallePage implements OnInit {
  @Input() almacen: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  verEnMapa() {
    if (!this.almacen?.lat || !this.almacen?.lng) {
      alert('La ubicación del almacén no está disponible.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const destinoLat = this.almacen.lat;
        const destinoLng = this.almacen.lng;

        // URL para abrir Google Maps con ruta
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinoLat},${destinoLng}&travelmode=driving`;
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error obteniendo ubicación', error);
        alert('No se pudo obtener tu ubicación actual.');
      }
    );
  }

}
