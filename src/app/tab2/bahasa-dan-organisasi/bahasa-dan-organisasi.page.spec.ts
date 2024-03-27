import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BahasaDanOrganisasiPage } from './bahasa-dan-organisasi.page';

describe('BahasaDanOrganisasiPage', () => {
  let component: BahasaDanOrganisasiPage;
  let fixture: ComponentFixture<BahasaDanOrganisasiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BahasaDanOrganisasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
