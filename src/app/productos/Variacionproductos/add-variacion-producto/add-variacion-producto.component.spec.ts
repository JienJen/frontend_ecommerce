import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariacionProductoComponent } from './add-variacion-producto.component';

describe('AddVariacionProductoComponent', () => {
  let component: AddVariacionProductoComponent;
  let fixture: ComponentFixture<AddVariacionProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVariacionProductoComponent]
    });
    fixture = TestBed.createComponent(AddVariacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
