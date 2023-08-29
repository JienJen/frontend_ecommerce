import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDetalleProductoComponent } from './vista-detalle-producto.component';

describe('VistaDetalleProductoComponent', () => {
  let component: VistaDetalleProductoComponent;
  let fixture: ComponentFixture<VistaDetalleProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaDetalleProductoComponent]
    });
    fixture = TestBed.createComponent(VistaDetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
