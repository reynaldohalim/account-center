import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailAbsenPage } from './detail-absen.page';

describe('DetailAbsenPage', () => {
  let component: DetailAbsenPage;
  let fixture: ComponentFixture<DetailAbsenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailAbsenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
