import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carrito2Page } from './carrito2.page';

describe('Carrito2Page', () => {
  let component: Carrito2Page;
  let fixture: ComponentFixture<Carrito2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Carrito2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
