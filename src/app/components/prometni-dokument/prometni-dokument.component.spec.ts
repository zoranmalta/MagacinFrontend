import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrometniDokumentComponent } from './prometni-dokument.component';

describe('PrometniDokumentComponent', () => {
  let component: PrometniDokumentComponent;
  let fixture: ComponentFixture<PrometniDokumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrometniDokumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrometniDokumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
