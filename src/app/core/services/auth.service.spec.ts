import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

const API = 'http://localhost:3000/users';

const mockAdmin = { id: 1, name: 'Admin User', email: 'admin@flexzone.com', password: 'admin123', role: 'admin' };
const mockUser  = { id: 2, name: 'Mahmoud Ahmed', email: 'user@flexzone.com',  password: 'user123',  role: 'user'  };

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  // ── Initialization ────────────────────────────────────────────
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with null user when localStorage is empty', () => {
    expect(service.currentUserSignal()).toBeNull();
  });

  it('should restore user from localStorage on init', () => {
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    // getSavedUser() is a plain method — call it directly without instantiation
    expect(service.getSavedUser()).toEqual(mockUser);
  });

  // ── Computed signals ──────────────────────────────────────────
  it('isLoggedIn should be false when no user', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('isLoggedIn should be true after saveUser', () => {
    service.saveUser(mockUser);
    expect(service.isLoggedIn()).toBe(true);
  });

  it('isAdmin should be false for regular user', () => {
    service.saveUser(mockUser);
    expect(service.isAdmin()).toBe(false);
  });

  it('isAdmin should be true for admin user', () => {
    service.saveUser(mockAdmin);
    expect(service.isAdmin()).toBe(true);
  });

  // ── saveUser / logout ─────────────────────────────────────────
  it('saveUser should persist to localStorage', () => {
    service.saveUser(mockUser);
    const stored = JSON.parse(localStorage.getItem('currentUser')!);
    expect(stored).toEqual(mockUser);
  });

  it('logout should clear signal and localStorage', () => {
    service.saveUser(mockUser);
    service.logout();
    expect(service.currentUserSignal()).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  // ── checkLogin ────────────────────────────────────────────────
  it('checkLogin should return user when password matches', () => {
    const result = service.checkLogin([mockUser], 'user123');
    expect(result).toEqual(mockUser);
    expect(service.isLoggedIn()).toBe(true);
  });

  it('checkLogin should return undefined when password does not match', () => {
    const result = service.checkLogin([mockUser], 'wrongpassword');
    expect(result).toBeUndefined();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('checkLogin should return undefined for empty users array', () => {
    const result = service.checkLogin([], 'user123');
    expect(result).toBeUndefined();
  });

  // ── HTTP calls ────────────────────────────────────────────────
  it('login() should GET users filtered by email', () => {
    service.login('user@flexzone.com', 'user123').subscribe(users => {
      expect(users).toEqual([mockUser]);
    });

    const req = http.expectOne(r => r.url === API && r.params.get('email') === 'user@flexzone.com');
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });

  it('register() should POST new user', () => {
    const newUser = { name: 'Test', email: 'test@test.com', password: '1234', role: 'user' };
    service.register(newUser).subscribe(u => expect(u).toEqual({ id: 3, ...newUser }));

    const req = http.expectOne(API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush({ id: 3, ...newUser });
  });

  it('checkEmailExists() should GET users by email', () => {
    service.checkEmailExists('user@flexzone.com').subscribe(res => expect(res.length).toBe(1));

    const req = http.expectOne(r => r.url === API && r.params.get('email') === 'user@flexzone.com');
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });

  it('updateUser() should PUT updated user and update signal', () => {
    const updated = { ...mockUser, name: 'New Name' };
    service.updateUser(updated).subscribe();

    const req = http.expectOne(`${API}/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updated);
    req.flush(updated);

    expect(service.currentUserSignal()).toEqual(updated);
  });
});
