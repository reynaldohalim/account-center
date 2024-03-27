import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendidikanPage } from './pendidikan.page';

describe('PendidikanPage', () => {
  let component: PendidikanPage;
  let fixture: ComponentFixture<PendidikanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PendidikanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
