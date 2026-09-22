import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';

const mockRoute = {} as ActivatedRouteSnapshot;
const mockState = { url: '/admin' } as RouterStateSnapshot;

describe('adminGuard', () => {
  let auth: AuthService;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    auth   = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => localStorage.clear());

  it('should allow access for admin user', () => {
    auth.saveUser({ id: 1, name: 'Admin', role: 'admin' });
    const result = TestBed.runInInjectionContext(() => adminGuard(mockRoute, mockState));
    expect(result).toBe(true);
  });

  it('should redirect to /login when not logged in', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const result = TestBed.runInInjectionContext(() => adminGuard(mockRoute, mockState));
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to /unauthorized when logged in but not admin', () => {
    auth.saveUser({ id: 2, name: 'Mahmoud', role: 'user' });
    const navigateSpy = vi.spyOn(router, 'navigate');
    const result = TestBed.runInInjectionContext(() => adminGuard(mockRoute, mockState));
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/unauthorized']);
  });

  it('should NOT redirect to /unauthorized for admin user', () => {
    auth.saveUser({ id: 1, name: 'Admin', role: 'admin' });
    const navigateSpy = vi.spyOn(router, 'navigate');
    TestBed.runInInjectionContext(() => adminGuard(mockRoute, mockState));
    expect(navigateSpy).not.toHaveBeenCalledWith(['/unauthorized']);
  });
});
