import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageDetail } from './covoiturage-detail';

describe('CovoiturageDetail', () => {
  let component: CovoiturageDetail;
  let fixture: ComponentFixture<CovoiturageDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovoiturageDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiturageDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
