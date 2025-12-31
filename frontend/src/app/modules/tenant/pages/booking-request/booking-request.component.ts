import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
    standalone: true,
    selector: 'app-booking-request',
    templateUrl: './booking-request.component.html',
    styleUrls: ['./booking-request.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule
    ]
})
export class BookingRequestComponent {
    propertyId!: number;
    loading = false;
    success = false;
    errorMsg = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private bookingService: BookingService
    ) {
        this.propertyId = Number(this.route.snapshot.paramMap.get('id'));
    }

    submitBooking() {
        this.loading = true;
        this.errorMsg = '';

        this.bookingService.createBooking(this.propertyId).subscribe({
            next: () => {
                this.success = true;
                this.loading = false;
            },
            error: err => {
                this.errorMsg = err.error?.message || 'Booking failed. You might already have a pending/active booking for this property.';
                this.loading = false;
            }
        });
    }

    goToMyBookings() {
        this.router.navigate(['/tenant/my-bookings']);
    }

    goBack() {
        window.history.back();
    }
}
