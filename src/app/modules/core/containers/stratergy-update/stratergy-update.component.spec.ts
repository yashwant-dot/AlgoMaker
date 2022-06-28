import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratergyUpdateComponent } from './stratergy-update.component';

describe('StratergyUpdateComponent', () => {
  let component: StratergyUpdateComponent;
  let fixture: ComponentFixture<StratergyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratergyUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratergyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
