import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputIzinPage } from './input-izin.page';

describe('InputIzinPage', () => {
  let component: InputIzinPage;
  let fixture: ComponentFixture<InputIzinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InputIzinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
