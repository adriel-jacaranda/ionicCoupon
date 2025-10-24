import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuponesQrPage } from './cupones-qr.page';

describe('CuponesQrPage', () => {
  let component: CuponesQrPage;
  let fixture: ComponentFixture<CuponesQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponesQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
