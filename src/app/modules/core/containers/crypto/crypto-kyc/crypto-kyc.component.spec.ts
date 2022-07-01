import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoKycComponent } from './crypto-kyc.component';

describe('CryptoKycComponent', () => {
  let component: CryptoKycComponent;
  let fixture: ComponentFixture<CryptoKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoKycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
