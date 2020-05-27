import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrometnihDokumenataComponent } from './lista-prometnih-dokumenata.component';

describe('ListaPrometnihDokumenataComponent', () => {
  let component: ListaPrometnihDokumenataComponent;
  let fixture: ComponentFixture<ListaPrometnihDokumenataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrometnihDokumenataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrometnihDokumenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
