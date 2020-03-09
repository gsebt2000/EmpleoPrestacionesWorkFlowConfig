import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaImpresionComponent } from './grilla-impresion.component';

describe('GrillaImpresionComponent', () => {
  let component: GrillaImpresionComponent;
  let fixture: ComponentFixture<GrillaImpresionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaImpresionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaImpresionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
