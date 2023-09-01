import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEmailComponent } from './cambiar-email.component';

describe('CambiarEmailComponent', () => {
  let component: CambiarEmailComponent;
  let fixture: ComponentFixture<CambiarEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarEmailComponent]
    });
    fixture = TestBed.createComponent(CambiarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
