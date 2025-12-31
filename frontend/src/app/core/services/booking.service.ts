import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private apiUrl = `${environment.apiUrl}/bookings`;

    constructor(private http: HttpClient) { }

    createBooking(propertyId: number) {
        return this.http.post(`${this.apiUrl}/${propertyId}`, {});
    }

    getMyBookings() {
        return this.http.get(`${this.apiUrl}/my`);
    }

    getOwnerAllBookings() {
        return this.http.get<any>(`${this.apiUrl}/owner-requests`);
    }

    getBookingsForProperty(propertyId: number) {
        return this.http.get<any>(`${this.apiUrl}/property/${propertyId}`);
    }

    updateBookingStatus(bookingId: number, status: 'Approved' | 'Rejected') {
        return this.http.patch(`${this.apiUrl}/${bookingId}`, { status });
    }
}
