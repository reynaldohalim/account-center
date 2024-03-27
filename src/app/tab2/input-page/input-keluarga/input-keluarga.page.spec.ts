import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputKeluargaPage } from './input-keluarga.page';

describe('InputKeluargaPage', () => {
  let component: InputKeluargaPage;
  let fixture: ComponentFixture<InputKeluargaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InputKeluargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
