import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, GymClass } from '../models/models';

const CLASSES_API = 'http://localhost:3000/classes';
const BOOKINGS_API = 'http://localhost:3000/bookings';

@Injectable({ providedIn: 'root' })
export class ClassService {
  http = inject(HttpClient)

  getAll(): Observable<GymClass[]> {
    return this.http.get<GymClass[]>(CLASSES_API);
  }

  getById(id: number): Observable<GymClass> {
    return this.http.get<GymClass>(`${CLASSES_API}/${id}`);
  }

  create(gymClass: Omit<GymClass, 'id'>): Observable<GymClass> {
    return this.http.post<GymClass>(CLASSES_API, gymClass);
  }

  update(id: number, gymClass: Partial<GymClass>): Observable<GymClass> {
    return this.http.put<GymClass>(`${CLASSES_API}/${id}`, gymClass);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${CLASSES_API}/${id}`);
  }

  getBookingsForUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(BOOKINGS_API, { params: { userId } });
  }

  book(userId: number, classId: number): Observable<Booking> {
    const booking: Omit<Booking, 'id'> = {
      userId,
      classId,
      date: new Date().toISOString().slice(0, 10),
      status: 'confirmed',
    };
    return this.http.post<Booking>(BOOKINGS_API, booking);
  }

  decrementSpot(gymClass: GymClass): Observable<GymClass> {
    return this.update(gymClass.id, { spotsLeft: Math.max(0, gymClass.spotsLeft - 1) });
  }
}
