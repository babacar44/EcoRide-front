import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeSpace } from './employe-space';

describe('EmployeSpace', () => {
  let component: EmployeSpace;
  let fixture: ComponentFixture<EmployeSpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeSpace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeSpace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
