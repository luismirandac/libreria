import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoAddPage } from './empleado-add.page';

describe('EmpleadoAddPage', () => {
  let component: EmpleadoAddPage;
  let fixture: ComponentFixture<EmpleadoAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
