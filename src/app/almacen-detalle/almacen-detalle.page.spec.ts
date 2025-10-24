import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlmacenDetallePage } from './almacen-detalle.page';

describe('AlmacenDetallePage', () => {
  let component: AlmacenDetallePage;
  let fixture: ComponentFixture<AlmacenDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
