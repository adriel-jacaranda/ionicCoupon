import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cupones-qr',
  templateUrl: './cupones-qr.page.html',
  styleUrls: ['./cupones-qr.page.scss'],
    imports: [
    CommonModule,
    FormsModule,
    QRCodeComponent,
    ReactiveFormsModule,
    IonicModule
  ],
})
export class CuponesQrPage implements OnInit {
item: any;
  idCliente: any;

constructor(private navParams: NavParams,private modalController: ModalController) {}

  ngOnInit() {
     const userJson = localStorage.getItem('usuario');
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log(user);
      
      this.idCliente = user.user.id;
      console.log("Id",this.idCliente);
      
    }
    this.item = this.navParams.get('value');
  console.log('Recibido en modal:', this.item);
  }

  get qrTexto(): string {
  return `${this.item.id} - ${this.item.codigo} - ${this.idCliente}`;
}
cerrarModal() {
  this.modalController.dismiss({
    recarga: true // opcional, puedes pasar lo que quieras al padre
  });
}
}
