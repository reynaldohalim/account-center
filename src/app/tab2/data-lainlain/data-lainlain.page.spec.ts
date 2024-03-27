import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLainlainPage } from './data-lainlain.page';

describe('DataLainlainPage', () => {
  let component: DataLainlainPage;
  let fixture: ComponentFixture<DataLainlainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DataLainlainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
