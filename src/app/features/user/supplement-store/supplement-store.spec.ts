import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SupplementStore } from './supplement-store';

describe('SupplementStore Component', () => {
  let component: SupplementStore;
  let fixture: ComponentFixture<SupplementStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplementStore],
    }).compileComponents();

    fixture   = TestBed.createComponent(SupplementStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should load 37 products', () => {
    expect(component.products.length).toBe(37);
  });

  it('should start with "All" category selected', () => {
    expect(component.data).toBe('All');
  });

  it('every product should have id, name, price and category', () => {
    component.products.forEach(p => {
      expect(p.id).toBeDefined();
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.price).toBeGreaterThan(0);
      expect(p.category.length).toBeGreaterThan(0);
    });
  });

  it('should have products across the expected categories', () => {
    const categories = new Set(component.products.map(p => p.category));
    expect(categories.has('Supplements')).toBe(true);
    expect(categories.has('Equipment')).toBe(true);
    expect(categories.has('Accessories')).toBe(true);
    expect(categories.has('Apparel')).toBe(true);
  });

  // ── getStars() ────────────────────────────────────────────────
  it('getStars(5) should return 5 true values', () => {
    const stars = component.getStars(5);
    expect(stars.length).toBe(5);
    expect(stars.every(s => s)).toBe(true);
  });

  it('getStars(0) should return 5 false values', () => {
    const stars = component.getStars(0);
    expect(stars.length).toBe(5);
    expect(stars.every(s => !s)).toBe(true);
  });

  it('getStars(3) should return 3 filled and 2 empty', () => {
    const stars = component.getStars(3);
    expect(stars.filter(s => s).length).toBe(3);
    expect(stars.filter(s => !s).length).toBe(2);
  });

  it('getStars(4.6) should round to 5 filled stars', () => {
    const stars = component.getStars(4.6);
    expect(stars.filter(s => s).length).toBe(5);
  });

  it('getStars(4.4) should round to 4 filled stars', () => {
    const stars = component.getStars(4.4);
    expect(stars.filter(s => s).length).toBe(4);
  });

  it('getStars() should always return exactly 5 elements', () => {
    [0, 1, 2, 3, 4, 5, 4.5, 2.7].forEach(r => {
      expect(component.getStars(r).length).toBe(5);
    });
  });

  // ── all products should have valid ids ────────────────────────
  it('all product ids should be unique', () => {
    const ids = component.products.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
