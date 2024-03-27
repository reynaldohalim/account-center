import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataPekerjaanPage } from './data-pekerjaan.page';

describe('DataPekerjaanPage', () => {
  let component: DataPekerjaanPage;
  let fixture: ComponentFixture<DataPekerjaanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DataPekerjaanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
