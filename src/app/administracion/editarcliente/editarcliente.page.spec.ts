import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarclientePage } from './editarcliente.page';

describe('EditarclientePage', () => {
  let component: EditarclientePage;
  let fixture: ComponentFixture<EditarclientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
