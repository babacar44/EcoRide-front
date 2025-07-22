import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesList } from './covoiturages-list';

describe('CovoituragesList', () => {
  let component: CovoituragesList;
  let fixture: ComponentFixture<CovoituragesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovoituragesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoituragesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
