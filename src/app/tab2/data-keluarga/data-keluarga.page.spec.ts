import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataKeluargaPage } from './data-keluarga.page';

describe('DataKeluargaPage', () => {
  let component: DataKeluargaPage;
  let fixture: ComponentFixture<DataKeluargaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DataKeluargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
