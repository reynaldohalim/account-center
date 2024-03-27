import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPendidikanPage } from './input-pendidikan.page';

describe('InputPendidikanPage', () => {
  let component: InputPendidikanPage;
  let fixture: ComponentFixture<InputPendidikanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InputPendidikanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
