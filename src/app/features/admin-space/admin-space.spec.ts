import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpace } from './admin-space';

describe('AdminSpace', () => {
  let component: AdminSpace;
  let fixture: ComponentFixture<AdminSpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSpace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSpace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
