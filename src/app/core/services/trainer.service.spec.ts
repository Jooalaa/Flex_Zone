import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TrainerService } from './trainer.service';
import { Trainer } from '../models/models';

const API = 'http://localhost:3000/trainers';

const mockTrainer: Trainer = {
  id: 1, initials: 'AM', name: 'Ahmed Mohamed',
  role: 'Certified Personal Trainer', rating: 4.9,
  reviews: 128, experience: '7 Years Experience',
  specialties: ['Muscle Building', 'Strength Training'],
};

describe('TrainerService', () => {
  let service: TrainerService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TrainerService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('getAll() should GET all trainers', () => {
    service.getAll().subscribe(t => expect(t).toEqual([mockTrainer]));
    const req = http.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush([mockTrainer]);
  });

  it('getById() should GET trainer by id', () => {
    service.getById(1).subscribe(t => expect(t).toEqual(mockTrainer));
    const req = http.expectOne(`${API}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrainer);
  });

  it('create() should POST new trainer', () => {
    const { id, ...newTrainer } = mockTrainer;
    service.create(newTrainer).subscribe(t => expect(t).toEqual(mockTrainer));
    const req = http.expectOne(API);
    expect(req.request.method).toBe('POST');
    req.flush(mockTrainer);
  });

  it('update() should PUT trainer by id', () => {
    const patch = { rating: 5.0 };
    service.update(1, patch).subscribe(t => expect(t.rating).toBe(5.0));
    const req = http.expectOne(`${API}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockTrainer, ...patch });
  });

  it('delete() should DELETE trainer by id', () => {
    service.delete(1).subscribe();
    const req = http.expectOne(`${API}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
