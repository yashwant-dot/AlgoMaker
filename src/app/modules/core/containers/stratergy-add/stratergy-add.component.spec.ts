import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratergyAddComponent } from './stratergy-add.component';

describe('StratergyAddComponent', () => {
  let component: StratergyAddComponent;
  let fixture: ComponentFixture<StratergyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratergyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratergyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
