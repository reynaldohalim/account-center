import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengalamanKerjaPage } from './pengalaman-kerja.page';

describe('PengalamanKerjaPage', () => {
  let component: PengalamanKerjaPage;
  let fixture: ComponentFixture<PengalamanKerjaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PengalamanKerjaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
