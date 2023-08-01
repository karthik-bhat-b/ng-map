import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEditorComponent } from './rule-editor.component';

describe('RuleEditorComponent', () => {
  let component: RuleEditorComponent;
  let fixture: ComponentFixture<RuleEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleEditorComponent]
    });
    fixture = TestBed.createComponent(RuleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
