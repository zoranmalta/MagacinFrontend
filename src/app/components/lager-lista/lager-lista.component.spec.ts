import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LagerListaComponent } from './lager-lista.component';

describe('LagerListaComponent', () => {
  let component: LagerListaComponent;
  let fixture: ComponentFixture<LagerListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LagerListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LagerListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
