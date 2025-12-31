import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
    selector: 'app-all-booking-requests',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './all-booking-requests.component.html',
    styleUrls: ['./all-booking-requests.component.scss']
})
export class AllBookingRequestsComponent implements OnInit {
    private bookingService = inject(BookingService);
    private snackBar = inject(MatSnackBar);

    bookings: any[] = [];
    loading = true;

    ngOnInit() {
        this.fetchBookings();
    }

    fetchBookings() {
        this.loading = true;
        this.bookingService.getOwnerAllBookings().subscribe({
            next: res => {
                this.bookings = res.bookings || [];
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching bookings:', err);
                this.snackBar.open('Error loading booking requests', 'Close', { duration: 3000 });
                this.loading = false;
            }
        });
    }

    updateStatus(bookingId: number, status: 'Approved' | 'Rejected') {
        this.bookingService.updateBookingStatus(bookingId, status).subscribe({
            next: () => {
                this.snackBar.open(`Booking ${status} successfully`, 'Close', { duration: 3000 });
                this.fetchBookings(); // Refresh list
            },
            error: (err) => {
                const msg = err.error?.message || `Failed to ${status.toLowerCase()} booking`;
                this.snackBar.open(msg, 'Close', { duration: 3000 });
            }
        });
    }
}
