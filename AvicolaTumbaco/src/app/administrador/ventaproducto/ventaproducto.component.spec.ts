import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaproductoComponent } from './ventaproducto.component';

describe('VentaproductoComponent', () => {
  let component: VentaproductoComponent;
  let fixture: ComponentFixture<VentaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
