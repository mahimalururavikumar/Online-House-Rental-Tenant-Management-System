import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
    standalone: true,
    selector: 'app-my-bookings',
    templateUrl: './my-bookings.component.html',
    styleUrls: ['./my-bookings.component.scss'],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatChipsModule
    ]
})
export class MyBookingsComponent implements OnInit {
    bookings: any[] = [];
    loading = true;

    constructor(private bookingService: BookingService) { }

    ngOnInit() {
        this.bookingService.getMyBookings().subscribe({
            next: (res: any) => {
                this.bookings = res.bookings || [];
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching bookings:', err);
                this.loading = false;
            }
        });
    }
}
