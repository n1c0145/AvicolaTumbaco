import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioadministradorComponent } from './inicioadministrador.component';

describe('InicioadministradorComponent', () => {
  let component: InicioadministradorComponent;
  let fixture: ComponentFixture<InicioadministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioadministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
