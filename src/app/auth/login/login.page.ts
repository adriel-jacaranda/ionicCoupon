import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(public nav: NavController, private fb: FormBuilder, private auth: AuthService, public toast: ToastController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.auth.login(credentials).subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
          localStorage.setItem('usuario', JSON.stringify(res));
          if (res.access_token) {
            this.smsServer("Usuario Autenticado")
            localStorage.setItem("token", res.access_token);
            if (res.user.rol === 'cliente') {
              this.nav.navigateRoot('tabs/tab1');
            } else {
              this.nav.navigateRoot('tabs/reclamar-cupon');
            }
          } else {
            this.smsServer(res.message)

          }
        },
        error: (err) => {
          console.error('Error de conexión o servidor:', err);
          this.smsServer("Credenciales Incorrectas")

        }
      });

    }
  }

  async smsServer(sms: any) {
    const toast = await this.toast.create({
      message: sms,
      duration: 2000
    });
    toast.present();
  }
}