import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobneKarticeListaComponent } from './robne-kartice-lista.component';

describe('RobneKarticeListaComponent', () => {
  let component: RobneKarticeListaComponent;
  let fixture: ComponentFixture<RobneKarticeListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobneKarticeListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobneKarticeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
