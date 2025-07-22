import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisValidation } from './avis-validation';

describe('AvisValidation', () => {
  let component: AvisValidation;
  let fixture: ComponentFixture<AvisValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisValidation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
