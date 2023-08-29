import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaseProductoComponent } from './add-clase-producto.component';

describe('AddClaseProductoComponent', () => {
  let component: AddClaseProductoComponent;
  let fixture: ComponentFixture<AddClaseProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClaseProductoComponent]
    });
    fixture = TestBed.createComponent(AddClaseProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
