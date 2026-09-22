import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PlanService } from './plan.service';
import { WorkoutPlan } from '../models/models';

const API = 'http://localhost:3000/plans';

const mockPlan: WorkoutPlan = {
  id: 1, category: 'Chest', icon: '💪', rating: 4.8,
  title: 'Chest & Triceps Power', desc: 'Upper body workout.',
  duration: '45 min', calories: 420, level: 'Intermediate', tags: ['Chest', 'Triceps'],
};

describe('PlanService', () => {
  let service: PlanService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PlanService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('getAll() should GET all plans', () => {
    service.getAll().subscribe(plans => {
      expect(plans.length).toBe(1);
      expect(plans[0]).toEqual(mockPlan);
    });
    const req = http.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush([mockPlan]);
  });

  it('getById() should GET single plan by id', () => {
    service.getById(1).subscribe(p => expect(p).toEqual(mockPlan));
    const req = http.expectOne(`${API}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlan);
  });

  it('create() should POST new plan', () => {
    const { id, ...newPlan } = mockPlan;
    service.create(newPlan).subscribe(p => expect(p).toEqual(mockPlan));
    const req = http.expectOne(API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPlan);
    req.flush(mockPlan);
  });

  it('update() should PUT plan by id', () => {
    const patch = { title: 'Updated Title' };
    service.update(1, patch).subscribe(p => expect(p.title).toBe('Updated Title'));
    const req = http.expectOne(`${API}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockPlan, ...patch });
  });

  it('delete() should DELETE plan by id', () => {
    service.delete(1).subscribe();
    const req = http.expectOne(`${API}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
