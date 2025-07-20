import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCredits } from './stats-credits';

describe('StatsCredits', () => {
  let component: StatsCredits;
  let fixture: ComponentFixture<StatsCredits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCredits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsCredits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
