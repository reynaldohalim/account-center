import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputOrganisasiPage } from './input-organisasi.page';

describe('InputOrganisasiPage', () => {
  let component: InputOrganisasiPage;
  let fixture: ComponentFixture<InputOrganisasiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InputOrganisasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
