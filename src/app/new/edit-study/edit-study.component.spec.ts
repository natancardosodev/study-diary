import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudyComponent } from './edit-study.component';

describe('EditStudyComponent', () => {
  let component: EditStudyComponent;
  let fixture: ComponentFixture<EditStudyComponent>;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ EditStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });
});
