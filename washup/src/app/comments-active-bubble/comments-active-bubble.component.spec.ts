import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsActiveBubbleComponent } from './comments-active-bubble.component';

describe('CommentsActiveBubbleComponent', () => {
  let component: CommentsActiveBubbleComponent;
  let fixture: ComponentFixture<CommentsActiveBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsActiveBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsActiveBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
