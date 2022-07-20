import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentPageComponent } from './edit-comment-page.component';

describe('EditCommentPageComponent', () => {
  let component: EditCommentPageComponent;
  let fixture: ComponentFixture<EditCommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
