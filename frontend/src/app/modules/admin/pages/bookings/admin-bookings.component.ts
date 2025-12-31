import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
    selector: 'app-admin-bookings',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatChipsModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './admin-bookings.component.html',
    styleUrls: ['./admin-bookings.component.scss']
})
export class AdminBookingsComponent implements OnInit {
    private adminService = inject(AdminService);

    bookings: any[] = [];
    loading = true;
    displayedColumns: string[] = ['tenant', 'property', 'status', 'createdAt'];

    ngOnInit() {
        this.fetchBookings();
    }

    fetchBookings() {
        this.loading = true;
        this.adminService.getAllBookings().subscribe({
            next: res => {
                this.bookings = res.bookings || res;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching system bookings:', err);
                this.loading = false;
            }
        });
    }
}
