import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/admin`;

    getAllUsers() {
        return this.http.get<any>(`${this.apiUrl}/users`);
    }

    getAllProperties() {
        return this.http.get<any>(`${this.apiUrl}/properties`);
    }

    getAllBookings() {
        return this.http.get<any>(`${this.apiUrl}/bookings`);
    }

    togglePropertyStatus(id: number, isActive: boolean) {
        return this.http.patch(
            `${this.apiUrl}/properties/${id}/status`,
            { isActive }
        );
    }
}
