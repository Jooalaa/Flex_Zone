import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

    http = inject(HttpClient)

    apiUrl = 'http://localhost:3000/users'

    currentUserSignal = signal<any>(this.getSavedUser())

    isLoggedIn = computed(() => this.currentUserSignal() != null)
    isAdmin = computed(() => this.currentUserSignal()?.role == 'admin')

    getSavedUser() {
        const saved = localStorage.getItem('currentUser')
        return saved ? JSON.parse(saved) : null
    }

    saveUser(user: any) {
        this.currentUserSignal.set(user)
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    login(email: any, password: any) {
        return this.http.get<any[]>(this.apiUrl, { params: { email } })
    }

    checkLogin(users: any[], password: any) {
        const found = users.find(u => u.password == password)
        if (found) {
            this.saveUser(found)
        }
        return found
    }

    register(newUser: any) {
        return this.http.post<any>(this.apiUrl, newUser)
    }

    checkEmailExists(email: any) {
        return this.http.get<any[]>(this.apiUrl, { params: { email } })
    }

    updateUser(user: any) {
        this.saveUser(user)
        return this.http.put(`${this.apiUrl}/${user.id}`, user)
    }

    logout() {
        this.currentUserSignal.set(null)
        localStorage.removeItem('currentUser')
    }
}
