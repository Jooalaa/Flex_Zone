import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {

  http = inject(HttpClient)

  loading = signal(true)

  stats = signal([
    { label: 'Total Members', value: 0, icon: '👥' },
    { label: 'Trainers', value: 0, icon: '🏋️' },
    { label: 'Workout Plans', value: 0, icon: '📋' },
    { label: 'Active Classes', value: 0, icon: '📅' },
    { label: 'Bookings Made', value: 0, icon: '✅' },
    { label: 'Total Spots Left', value: 0, icon: '🎟️' },
  ])

  ngOnInit() {
    forkJoin({
      users: this.http.get<any[]>('http://localhost:3000/users'),
      trainers: this.http.get<any[]>('http://localhost:3000/trainers'),
      plans: this.http.get<any[]>('http://localhost:3000/plans'),
      classes: this.http.get<any[]>('http://localhost:3000/classes'),
      bookings: this.http.get<any[]>('http://localhost:3000/bookings'),
    }).subscribe(({ users, trainers, plans, classes, bookings }) => {
      const membersOnly = users.filter(u => u.role == 'user').length
      const totalSpotsLeft = classes.reduce((sum, c) => sum + c.spotsLeft, 0)

      this.stats.set([
        { label: 'Total Members', value: membersOnly, icon: '👥' },
        { label: 'Trainers', value: trainers.length, icon: '🏋️' },
        { label: 'Workout Plans', value: plans.length, icon: '📋' },
        { label: 'Active Classes', value: classes.length, icon: '📅' },
        { label: 'Bookings Made', value: bookings.length, icon: '✅' },
        { label: 'Total Spots Left', value: totalSpotsLeft, icon: '🎟️' },
      ])
      this.loading.set(false)
    })
  }
}
