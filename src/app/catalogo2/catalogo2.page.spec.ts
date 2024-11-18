import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Catalogo2Page } from './catalogo2.page';

describe('Catalogo2Page', () => {
  let component: Catalogo2Page;
  let fixture: ComponentFixture<Catalogo2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Catalogo2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
