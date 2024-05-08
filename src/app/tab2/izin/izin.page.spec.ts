import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IzinPage } from './izin.page';

describe('IzinPage', () => {
  let component: IzinPage;
  let fixture: ComponentFixture<IzinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IzinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
