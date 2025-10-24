import { Component } from '@angular/core';
import { AdministrationService } from '../service/administration.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  user: any;

  constructor(
    private service: AdministrationService,
    public nav: NavController,
    public alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadProfile();
  }

  loadProfile() {
    this.service.getInfo().subscribe({
      next: (response) => {
        this.user = response.user;
        console.log(this.user);
      },
      error: (error) => {
        console.error('Error al obtener perfil:', error);
      },
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.clear();
            this.nav.navigateRoot('login');
          },
        },
      ],
    });

    await alert.present();
  }
}
