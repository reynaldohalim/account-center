import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPengalamanKerjaPage } from './input-pengalaman-kerja.page';

describe('InputPengalamanKerjaPage', () => {
  let component: InputPengalamanKerjaPage;
  let fixture: ComponentFixture<InputPengalamanKerjaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InputPengalamanKerjaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
