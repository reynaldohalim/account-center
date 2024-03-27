import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganisasiPage } from './organisasi.page';

describe('OrganisasiPage', () => {
  let component: OrganisasiPage;
  let fixture: ComponentFixture<OrganisasiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrganisasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
