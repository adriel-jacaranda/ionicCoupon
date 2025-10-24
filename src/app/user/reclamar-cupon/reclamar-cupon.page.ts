import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { AdministrationService } from 'src/app/service/administration.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamar-cupon',
  templateUrl: './reclamar-cupon.page.html',
  styleUrls: ['./reclamar-cupon.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <<<< Asegúrate de que esto esté presente
    IonicModule
  ],
})
export class ReclamarCuponPage implements OnInit {
  modo: 'qr' | 'codigo' = 'qr';
  codigoForm!: FormGroup;
  scannerResult: string = '';
  scannerResultF: any;
  tipoCliente: any;

  constructor(private service: AdministrationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.codigoForm = this.fb.group({
      codigo: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
     const userJson = localStorage.getItem('usuario');
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log(user);
      
      this.tipoCliente = user.user.id_almacen;
      console.log("Almacen",this.tipoCliente);
      
    }
    this.scannerResult = '';
  }
  onModoChange(e: any) {
    console.log(e);
    
    if (e) {
      this.scannerResult = '';
    }


  }
  async scanCode() {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });

    this.scannerResultF = result?.ScanResult || '';
    console.log('Texto escaneado:', this.scannerResultF);

    const parts = this.scannerResultF.split(' - ');
    if (parts.length >= 3) {
      const cupon_id = Number(parts[0].trim());
      const user_id = Number(parts[2].trim());
      
      if (!isNaN(cupon_id) && !isNaN(user_id)) {
        const credentials = { cupon_id, user_id, almacen_id: this.tipoCliente
 };

        this.service.asignarCupon(credentials).subscribe({
          next: (res) => {
            console.log('Respuesta del backend:', res);
            this.scannerResult = '✅ Felicidades, canjeaste tu cupón con éxito.';
          },
          error: (err) => {
            console.error(err);
            this.scannerResult = err.error?.message || '❌ Error al canjear el cupón.';
          }
        });
      } else {
        this.scannerResult = '❌ Formato inválido de IDs.';
      }
    } else {
      this.scannerResult = '❌ Código QR con formato incorrecto.';
    }
  }

  reclamarPorCodigo() {
    const { codigo, dni } = this.codigoForm.value;

    this.service.reclamarPorCodigo({ codigo, dni, almacen_id: this.tipoCliente
 }).subscribe({
      next: (res) => {
        console.log('Cupón canjeado por código:', res);
        this.scannerResult = '✅ Cupón canjeado correctamente.';
        this.codigoForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.scannerResult = err.error?.message || '❌ Error al canjear cupón.';
      }
    });
  }
}
