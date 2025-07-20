import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCovoiturages } from './stats-covoiturages';

describe('StatsCovoiturages', () => {
  let component: StatsCovoiturages;
  let fixture: ComponentFixture<StatsCovoiturages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCovoiturages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsCovoiturages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
