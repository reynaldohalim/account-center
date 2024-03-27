import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTrainingPage } from './data-training.page';

describe('DataTrainingPage', () => {
  let component: DataTrainingPage;
  let fixture: ComponentFixture<DataTrainingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DataTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
