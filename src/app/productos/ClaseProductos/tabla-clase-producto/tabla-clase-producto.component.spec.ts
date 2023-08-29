import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaClaseProductoComponent } from './tabla-clase-producto.component';

describe('TablaClaseProductoComponent', () => {
  let component: TablaClaseProductoComponent;
  let fixture: ComponentFixture<TablaClaseProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaClaseProductoComponent]
    });
    fixture = TestBed.createComponent(TablaClaseProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
