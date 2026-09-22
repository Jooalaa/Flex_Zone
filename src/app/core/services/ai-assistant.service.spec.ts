import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AiAssistantService } from './ai-assistant.service';

const KB_API = 'http://localhost:3000/knowledgeBase';

const mockKB = [
  { id: 1, topic: 'Protein Intake',             content: 'Aim for 1.6-2.2g per kg bodyweight for muscle building.' },
  { id: 2, topic: 'Beginner Training Frequency', content: 'Beginners should train 3-4 days per week.' },
  { id: 3, topic: 'Hydration Guidelines',        content: 'Drink 2-3 liters daily and more on training days.' },
  { id: 4, topic: 'Recovery & Rest',             content: 'Muscles grow during rest. Aim for 7-9 hours of sleep.' },
  { id: 5, topic: 'Membership Plans',            content: 'FlexZone offers Starter, Pro, and Elite tiers.' },
];

describe('AiAssistantService', () => {
  let service: AiAssistantService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AiAssistantService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => expect(service).toBeTruthy());

  // ── ask() returns correct shape ───────────────────────────────
  it('ask() should return answer and sources array', () => {
    let result: any;
    service.ask('protein').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(typeof result.answer).toBe('string');
    expect(Array.isArray(result.sources)).toBe(true);
  });

  it('ask() should return relevant source for protein query', () => {
    let result: any;
    service.ask('protein muscle').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.sources).toContain('Protein Intake');
  });

  it('ask() should return relevant source for hydration query', () => {
    let result: any;
    service.ask('water hydration drink').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.sources).toContain('Hydration Guidelines');
  });

  it('ask() should include meaningful answer text', () => {
    let result: any;
    service.ask('training beginners').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer.length).toBeGreaterThan(10);
  });

  it('ask() should return at most 3 sources', () => {
    let result: any;
    service.ask('training protein water rest membership').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.sources.length).toBeLessThanOrEqual(3);
  });

  // ── Small talk — English ──────────────────────────────────────
  it('should respond to "hi" with FlexBot intro', () => {
    let result: any;
    service.ask('hi').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer).toContain('FlexBot');
    expect(result.sources.length).toBe(0);
  });

  it('should respond to "hello"', () => {
    let result: any;
    service.ask('hello').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer).toContain('FlexBot');
  });

  it('should respond to "thanks"', () => {
    let result: any;
    service.ask('thanks').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer.length).toBeGreaterThan(5);
    expect(result.sources.length).toBe(0);
  });

  it('should respond to "bye"', () => {
    let result: any;
    service.ask('bye').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer).toContain('💪');
    expect(result.sources.length).toBe(0);
  });

  it('should respond to "who are you"', () => {
    let result: any;
    service.ask('who are you').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer).toContain('FlexBot');
  });

  // ── Small talk — Arabic ───────────────────────────────────────
  it('should respond to Arabic greeting "مرحبا" in Arabic', () => {
    let result: any;
    service.ask('مرحبا').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    // Arabic response should contain Arabic characters
    expect(/[\u0600-\u06ff]/.test(result.answer)).toBe(true);
    expect(result.sources.length).toBe(0);
  });

  it('should respond to "أهلا" in Arabic', () => {
    let result: any;
    service.ask('أهلا').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(/[\u0600-\u06ff]/.test(result.answer)).toBe(true);
  });

  it('should respond to Arabic "شكرا" in Arabic', () => {
    let result: any;
    service.ask('شكرا').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(/[\u0600-\u06ff]/.test(result.answer)).toBe(true);
    expect(result.sources.length).toBe(0);
  });

  it('should respond to Arabic fitness question about بروتين', () => {
    let result: any;
    service.ask('كم بروتين آكل').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.sources).toContain('Protein Intake');
    // Intro should be in Arabic
    expect(/[\u0600-\u06ff]/.test(result.answer)).toBe(true);
  });

  it('should respond to Arabic question about تمرين', () => {
    let result: any;
    service.ask('ما هو أفضل تمرين للمبتدئين').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer.length).toBeGreaterThan(10);
  });

  // ── No match fallback ─────────────────────────────────────────
  it('should return helpful fallback for unrecognized English query', () => {
    let result: any;
    service.ask('xyznonexistenttopic').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    // fallback message should list suggestions
    expect(result.answer).toContain('💪');
  });

  it('should return Arabic fallback for unrecognized Arabic query', () => {
    let result: any;
    service.ask('موضوع غير موجود ابدا').subscribe(r => (result = r));
    http.expectOne(KB_API).flush(mockKB);
    expect(result.answer.length).toBeGreaterThan(5);
  });
});
