import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratergyFormComponent } from './stratergy-form.component';

describe('StratergyFormComponent', () => {
  let component: StratergyFormComponent;
  let fixture: ComponentFixture<StratergyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratergyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratergyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
