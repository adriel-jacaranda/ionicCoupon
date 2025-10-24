import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReclamarCuponPage } from './reclamar-cupon.page';

describe('ReclamarCuponPage', () => {
  let component: ReclamarCuponPage;
  let fixture: ComponentFixture<ReclamarCuponPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamarCuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
