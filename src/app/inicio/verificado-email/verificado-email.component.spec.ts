import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificadoEmailComponent } from './verificado-email.component';

describe('VerificadoEmailComponent', () => {
  let component: VerificadoEmailComponent;
  let fixture: ComponentFixture<VerificadoEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificadoEmailComponent]
    });
    fixture = TestBed.createComponent(VerificadoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
