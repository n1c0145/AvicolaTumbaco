import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciousuarioComponent } from './iniciousuario.component';

describe('IniciousuarioComponent', () => {
  let component: IniciousuarioComponent;
  let fixture: ComponentFixture<IniciousuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciousuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
