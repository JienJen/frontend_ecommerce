import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRucComponent } from './edit-ruc.component';

describe('EditRucComponent', () => {
  let component: EditRucComponent;
  let fixture: ComponentFixture<EditRucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRucComponent]
    });
    fixture = TestBed.createComponent(EditRucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
