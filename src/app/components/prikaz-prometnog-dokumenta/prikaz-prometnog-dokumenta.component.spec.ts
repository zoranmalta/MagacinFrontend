import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazPrometnogDokumentaComponent } from './prikaz-prometnog-dokumenta.component';

describe('PrikazPrometnogDokumentaComponent', () => {
  let component: PrikazPrometnogDokumentaComponent;
  let fixture: ComponentFixture<PrikazPrometnogDokumentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrikazPrometnogDokumentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazPrometnogDokumentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
