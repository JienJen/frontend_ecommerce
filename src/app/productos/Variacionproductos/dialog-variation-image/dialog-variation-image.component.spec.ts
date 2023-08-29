import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVariationImageComponent } from './dialog-variation-image.component';

describe('DialogVariationImageComponent', () => {
  let component: DialogVariationImageComponent;
  let fixture: ComponentFixture<DialogVariationImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVariationImageComponent]
    });
    fixture = TestBed.createComponent(DialogVariationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
