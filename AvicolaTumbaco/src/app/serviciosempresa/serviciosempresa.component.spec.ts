import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosempresaComponent } from './serviciosempresa.component';

describe('ServiciosempresaComponent', () => {
  let component: ServiciosempresaComponent;
  let fixture: ComponentFixture<ServiciosempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
