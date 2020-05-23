import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobaInsertComponent } from './roba-insert.component';

describe('RobaInsertComponent', () => {
  let component: RobaInsertComponent;
  let fixture: ComponentFixture<RobaInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobaInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobaInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
