import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarsucursalPage } from './editarsucursal.page';

describe('EditarsucursalPage', () => {
  let component: EditarsucursalPage;
  let fixture: ComponentFixture<EditarsucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
