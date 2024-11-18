import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapitaPage } from './mapita.page';

describe('MapitaPage', () => {
  let component: MapitaPage;
  let fixture: ComponentFixture<MapitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
