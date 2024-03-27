import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputBahasaPage } from './input-bahasa.page';

describe('InputBahasaPage', () => {
  let component: InputBahasaPage;
  let fixture: ComponentFixture<InputBahasaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InputBahasaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
