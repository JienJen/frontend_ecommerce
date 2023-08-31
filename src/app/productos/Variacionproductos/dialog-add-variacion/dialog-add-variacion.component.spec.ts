import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddVariacionComponent } from './dialog-add-variacion.component';

describe('DialogAddVariacionComponent', () => {
  let component: DialogAddVariacionComponent;
  let fixture: ComponentFixture<DialogAddVariacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddVariacionComponent]
    });
    fixture = TestBed.createComponent(DialogAddVariacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
