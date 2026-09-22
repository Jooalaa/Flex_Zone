import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Plans } from './plans';
import { WorkoutPlan } from '../../../core/models/models';

const API = 'http://localhost:3000/plans';

const mockPlans: WorkoutPlan[] = [
  { id: 1, category: 'Chest',     icon: '💪', rating: 4.8, title: 'Chest & Triceps Power', desc: '', duration: '45 min', calories: 420, level: 'Intermediate', tags: ['Chest'] },
  { id: 2, category: 'Legs',      icon: '🦵', rating: 4.9, title: 'Leg Day Destroyer',     desc: '', duration: '60 min', calories: 680, level: 'Advanced',     tags: ['Quads'] },
  { id: 3, category: 'Shoulders', icon: '🎯', rating: 4.6, title: 'Shoulder Sculpt',        desc: '', duration: '40 min', calories: 320, level: 'Beginner',     tags: ['Delts'] },
  { id: 4, category: 'Core',      icon: '🔥', rating: 4.5, title: 'Core & Abs Shred',       desc: '', duration: '30 min', calories: 250, level: 'Beginner',     tags: ['Core']  },
];

describe('Plans Component', () => {
  let component: Plans;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plans],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Plans);
    component = fixture.componentInstance;
    http      = TestBed.inject(HttpTestingController);
    fixture.detectChanges();   // triggers ngOnInit
  });

  afterEach(() => http.verify());

  const flush = () => http.expectOne(API).flush(mockPlans);

  it('should create', () => { flush(); expect(component).toBeTruthy(); });

  it('should start in loading state', () => {
    expect(component.loading()).toBe(true);
    flush();
  });

  it('should set loading to false after data loads', () => {
    flush();
    expect(component.loading()).toBe(false);
  });

  it('should load all 4 plans', () => {
    flush();
    expect(component.plans().length).toBe(4);
  });

  // ── Search filter ─────────────────────────────────────────────
  it('filteredPlans() should return all when search is empty', () => {
    flush();
    expect(component.filteredPlans().length).toBe(4);
  });

  it('filteredPlans() should filter by title search', () => {
    flush();
    component.searchTerm.set('chest');
    expect(component.filteredPlans().length).toBe(1);
    expect(component.filteredPlans()[0].title).toContain('Chest');
  });

  it('filteredPlans() should filter by category search', () => {
    flush();
    component.searchTerm.set('legs');
    expect(component.filteredPlans().length).toBe(1);
  });

  it('filteredPlans() should filter by tag search', () => {
    flush();
    component.searchTerm.set('core');
    const result = component.filteredPlans();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('filteredPlans() should return empty for no match', () => {
    flush();
    component.searchTerm.set('xyznonexistent');
    expect(component.filteredPlans().length).toBe(0);
  });

  // ── Level filter ──────────────────────────────────────────────
  it('filteredPlans() should filter by Beginner level', () => {
    flush();
    component.levelFilter.set('Beginner');
    const result = component.filteredPlans();
    expect(result.every(p => p.level === 'Beginner')).toBe(true);
    expect(result.length).toBe(2);
  });

  it('filteredPlans() should filter by Advanced level', () => {
    flush();
    component.levelFilter.set('Advanced');
    const result = component.filteredPlans();
    expect(result.every(p => p.level === 'Advanced')).toBe(true);
  });

  it('filteredPlans() should return all when level is "All"', () => {
    flush();
    component.levelFilter.set('All');
    expect(component.filteredPlans().length).toBe(4);
  });

  // ── Sort ──────────────────────────────────────────────────────
  it('filteredPlans() should sort by rating descending by default', () => {
    flush();
    const ratings = component.filteredPlans().map(p => p.rating);
    expect(ratings[0]).toBeGreaterThanOrEqual(ratings[1]);
  });

  it('filteredPlans() should sort by calories when sortBy is "calories"', () => {
    flush();
    component.sortBy.set('calories');
    const calories = component.filteredPlans().map(p => p.calories);
    expect(calories[0]).toBeGreaterThanOrEqual(calories[1]);
  });

  // ── Levels list ───────────────────────────────────────────────
  it('levels array should contain All, Beginner, Intermediate, Advanced', () => {
    flush();
    expect(component.levels).toContain('All');
    expect(component.levels).toContain('Beginner');
    expect(component.levels).toContain('Intermediate');
    expect(component.levels).toContain('Advanced');
  });
});
