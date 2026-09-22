import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ClassService } from './class.service';
import { GymClass } from '../models/models';

const CLASSES_API  = 'http://localhost:3000/classes';
const BOOKINGS_API = 'http://localhost:3000/bookings';

const mockClass: GymClass = {
  id: 1, title: 'Morning HIIT', trainerId: 3,
  category: 'HIIT', schedule: 'Mon/Wed - 7:00 AM',
  capacity: 20, spotsLeft: 5,
};

describe('ClassService', () => {
  let service: ClassService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ClassService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('getAll() should GET all classes', () => {
    service.getAll().subscribe(c => expect(c).toEqual([mockClass]));
    const req = http.expectOne(CLASSES_API);
    expect(req.request.method).toBe('GET');
    req.flush([mockClass]);
  });

  it('getById() should GET class by id', () => {
    service.getById(1).subscribe(c => expect(c).toEqual(mockClass));
    const req = http.expectOne(`${CLASSES_API}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClass);
  });

  it('create() should POST a new class', () => {
    const { id, ...newClass } = mockClass;
    service.create(newClass).subscribe(c => expect(c).toEqual(mockClass));
    const req = http.expectOne(CLASSES_API);
    expect(req.request.method).toBe('POST');
    req.flush(mockClass);
  });

  it('update() should PUT class by id', () => {
    const patch = { spotsLeft: 3 };
    service.update(1, patch).subscribe(c => expect(c.spotsLeft).toBe(3));
    const req = http.expectOne(`${CLASSES_API}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockClass, ...patch });
  });

  it('delete() should DELETE class by id', () => {
    service.delete(1).subscribe();
    const req = http.expectOne(`${CLASSES_API}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('getBookingsForUser() should GET bookings filtered by userId', () => {
    service.getBookingsForUser(2).subscribe();
    const req = http.expectOne(r => r.url === BOOKINGS_API && r.params.get('userId') === '2');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('book() should POST a new booking with correct shape', () => {
    service.book(2, 1).subscribe(b => {
      expect(b.userId).toBe(2);
      expect(b.classId).toBe(1);
      expect(b.status).toBe('confirmed');
    });
    const req = http.expectOne(BOOKINGS_API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.status).toBe('confirmed');
    req.flush({ id: 99, userId: 2, classId: 1, date: '2026-09-21', status: 'confirmed' });
  });

  it('decrementSpot() should PUT class with spotsLeft reduced by 1', () => {
    service.decrementSpot(mockClass).subscribe(c => expect(c.spotsLeft).toBe(4));
    const req = http.expectOne(`${CLASSES_API}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.spotsLeft).toBe(4);
    req.flush({ ...mockClass, spotsLeft: 4 });
  });

  it('decrementSpot() should not go below 0', () => {
    const fullClass = { ...mockClass, spotsLeft: 0 };
    service.decrementSpot(fullClass).subscribe();
    const req = http.expectOne(`${CLASSES_API}/1`);
    expect(req.request.body.spotsLeft).toBe(0);
    req.flush({ ...fullClass, spotsLeft: 0 });
  });
});
