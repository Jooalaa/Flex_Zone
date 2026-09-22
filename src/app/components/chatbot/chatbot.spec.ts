import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Chatbot } from './chatbot';
import { AuthService } from '../../core/services/auth.service';

const KB_API = 'http://localhost:3000/knowledgeBase';

const mockKB = [
  { id: 1, topic: 'Protein Intake', content: 'Aim for 1.6-2.2g per kg bodyweight for muscle building.' },
  { id: 2, topic: 'Hydration',      content: 'Drink 2-3 liters daily and more on training days.' },
];

describe('Chatbot Component', () => {
  let component: Chatbot;
  let auth: AuthService;
  let http: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Chatbot],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Chatbot);
    component = fixture.componentInstance;
    auth      = TestBed.inject(AuthService);
    http      = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  // ── Initial state ─────────────────────────────────────────────
  it('should create', () => expect(component).toBeTruthy());

  it('should start closed', () => expect(component.isOpen()).toBe(false));

  it('should have 1 initial assistant message', () => {
    expect(component.messages().length).toBe(1);
    expect(component.messages()[0].role).toBe('assistant');
  });

  it('should contain "FlexBot" in the welcome message', () => {
    expect(component.messages()[0].text).toContain('FlexBot');
  });

  it('should have 6 suggestion chips', () => {
    expect(component.suggestions.length).toBe(6);
  });

  it('should start with no unread', () => expect(component.hasUnread()).toBe(false));

  // ── toggleChat ────────────────────────────────────────────────
  it('toggleChat() should open the chat', () => {
    component.toggleChat();
    expect(component.isOpen()).toBe(true);
  });

  it('toggleChat() called twice should close the chat', () => {
    component.toggleChat();
    component.toggleChat();
    expect(component.isOpen()).toBe(false);
  });

  it('opening chat should clear unread badge', () => {
    component.hasUnread.set(true);
    component.toggleChat(); // open
    expect(component.hasUnread()).toBe(false);
  });

  // ── sendMessage ───────────────────────────────────────────────
  it('sendMessage() should not send empty string', () => {
    component.userInput.set('   ');
    component.sendMessage();
    expect(component.messages().length).toBe(1); // still only welcome message
  });

  it('sendMessage() should add user message immediately', () => {
    vi.useFakeTimers();
    component.userInput.set('hello');
    component.sendMessage();
    // user message is added synchronously before the timer fires
    expect(component.messages().length).toBe(2);
    expect(component.messages()[1].role).toBe('user');
    expect(component.messages()[1].text).toBe('hello');
    vi.runAllTimers();
    http.expectOne(KB_API).flush(mockKB);
    vi.useRealTimers();
  });

  it('sendMessage() should set isTyping while waiting', () => {
    vi.useFakeTimers();
    component.userInput.set('protein');
    component.sendMessage();
    expect(component.isTyping()).toBe(true);
    vi.runAllTimers();
    http.expectOne(KB_API).flush(mockKB);
    vi.useRealTimers();
  });

  it('sendMessage() should clear userInput after sending', () => {
    vi.useFakeTimers();
    component.userInput.set('question?');
    component.sendMessage();
    expect(component.userInput()).toBe('');
    vi.runAllTimers();
    http.expectOne(KB_API).flush(mockKB);
    vi.useRealTimers();
  });

  // ── clearChat ─────────────────────────────────────────────────
  it('clearChat() should reset to 1 message', () => {
    vi.useFakeTimers();
    component.userInput.set('hi');
    component.sendMessage();
    vi.runAllTimers();
    http.expectOne(KB_API).flush(mockKB);
    vi.useRealTimers();
    component.clearChat();
    expect(component.messages().length).toBe(1);
  });

  it('clearChat() message should contain user first name when logged in', () => {
    auth.saveUser({ id: 2, name: 'Mahmoud Ahmed', role: 'user' });
    component.clearChat();
    expect(component.messages()[0].text).toContain('Mahmoud');
  });

  it('clearChat() should use "there" when not logged in', () => {
    component.clearChat();
    expect(component.messages()[0].text).toContain('there');
  });

  // ── formatMessage ─────────────────────────────────────────────
  it('formatMessage() should convert **bold** to <strong>', () => {
    const result = component.formatMessage('**Hello** world');
    expect(result).toContain('<strong>Hello</strong>');
  });

  it('formatMessage() should convert \\n to <br>', () => {
    const result = component.formatMessage('line1\nline2');
    expect(result).toContain('<br>');
  });

  it('formatMessage() should escape < and > to prevent XSS', () => {
    const result = component.formatMessage('<script>alert(1)</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('formatMessage() should escape & to &amp;', () => {
    const result = component.formatMessage('A & B');
    expect(result).toContain('&amp;');
  });

  // ── userName computed ─────────────────────────────────────────
  it('userName should return first name of logged-in user', () => {
    auth.saveUser({ id: 2, name: 'Mahmoud Ahmed', role: 'user' });
    expect(component.userName()).toBe('Mahmoud');
  });

  it('userName should return "there" when no user is logged in', () => {
    expect(component.userName()).toBe('there');
  });

  // ── keyboard ──────────────────────────────────────────────────
  it('Enter key should trigger sendMessage', () => {
    const spy = vi.spyOn(component, 'sendMessage');
    component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('Shift+Enter should NOT trigger sendMessage', () => {
    const spy = vi.spyOn(component, 'sendMessage');
    component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true }));
    expect(spy).not.toHaveBeenCalled();
  });
});
