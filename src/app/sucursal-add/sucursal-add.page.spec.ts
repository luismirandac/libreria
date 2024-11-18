import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucursalAddPage } from './sucursal-add.page';

describe('SucursalAddPage', () => {
  let component: SucursalAddPage;
  let fixture: ComponentFixture<SucursalAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
