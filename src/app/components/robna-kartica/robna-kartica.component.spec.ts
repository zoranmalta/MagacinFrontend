import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobnaKarticaComponent } from './robna-kartica.component';

describe('RobnaKarticaComponent', () => {
  let component: RobnaKarticaComponent;
  let fixture: ComponentFixture<RobnaKarticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobnaKarticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobnaKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
