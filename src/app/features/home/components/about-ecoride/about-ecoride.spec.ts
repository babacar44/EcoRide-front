import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEcoride } from './about-ecoride';

describe('AboutEcoride', () => {
  let component: AboutEcoride;
  let fixture: ComponentFixture<AboutEcoride>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutEcoride]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutEcoride);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
