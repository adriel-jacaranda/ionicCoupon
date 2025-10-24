import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  tipoCliente: any;

  constructor() {
     const userJson = localStorage.getItem('usuario');
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log(user);
      
      this.tipoCliente = user.user.rol;
      console.log("tabs general",this.tipoCliente);
      
    }
  }

}
