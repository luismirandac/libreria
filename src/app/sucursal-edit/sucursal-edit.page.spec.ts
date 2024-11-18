import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucursalEditPage } from './sucursal-edit.page';

describe('SucursalEditPage', () => {
  let component: SucursalEditPage;
  let fixture: ComponentFixture<SucursalEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
