import { Component } from '@angular/core';
import { AdministrationService } from '../service/administration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  tipoCliente: any;
  cuponesAsig: any;
    constructor(private service: AdministrationService,public route:Router) { }

  ionViewWillEnter() {
    const userJson = localStorage.getItem('usuario');
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log(user);
      
      this.tipoCliente = user.user.id;
      console.log("userres",this.tipoCliente);
      
    }

    this.loadServicesAll();
  }

  loadServicesAll() {
    this.service.getCuponesAsignados(this.tipoCliente).subscribe({
      next: (response) => {
        this.cuponesAsig = response;
        console.log(this.cuponesAsig);
      },
      error: (error) => {
        console.error('Error al obtener ofertas:', error);
      },
    });
  }
}