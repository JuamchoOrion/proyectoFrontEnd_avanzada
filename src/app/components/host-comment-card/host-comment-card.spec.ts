import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostCommentCard } from './host-comment-card';

describe('HostCommentCard', () => {
  let component: HostCommentCard;
  let fixture: ComponentFixture<HostCommentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostCommentCard]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostCommentCard);
    component = fixture.componentInstance;
    component.comment = { author: 'Ana Torres', rating: 3, comment: 'La ubicación es excelente.' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit replySent when sending a reply', () => {
    spyOn(component.replySent, 'emit');
    component.replyText = 'Gracias por tu comentario';
    component.sendReply();
    expect(component.replySent.emit).toHaveBeenCalledWith('Gracias por tu comentario');
    expect(component.replyText).toBe('');
  });
});
