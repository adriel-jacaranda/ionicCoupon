import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private navCtrl: NavController) {}

 ngOnInit(): void {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    this.navCtrl.navigateRoot('/login'); // sin token -> al login
  } else {
    this.navCtrl.navigateRoot('/tabs/tab3'); // con token -> a tab1
  }
}
}