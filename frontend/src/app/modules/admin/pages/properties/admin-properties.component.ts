import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
    selector: 'app-admin-properties',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './admin-properties.component.html',
    styleUrls: ['./admin-properties.component.scss']
})
export class AdminPropertiesComponent implements OnInit {
    private adminService = inject(AdminService);
    private snackBar = inject(MatSnackBar);

    properties: any[] = [];
    loading = true;
    displayedColumns: string[] = ['title', 'location', 'owner', 'status', 'action'];

    ngOnInit() {
        this.fetchProperties();
    }

    fetchProperties() {
        this.loading = true;
        this.adminService.getAllProperties().subscribe({
            next: res => {
                this.properties = res.properties || res;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching system properties:', err);
                this.snackBar.open('Error loading properties', 'Close', { duration: 3000 });
                this.loading = false;
            }
        });
    }

    toggleStatus(property: any) {
        const newStatus = !property.isActive;

        this.adminService
            .togglePropertyStatus(property.id, newStatus)
            .subscribe({
                next: () => {
                    property.isActive = newStatus;
                    this.snackBar.open(
                        `Property ${newStatus ? 'Activated' : 'Blocked'} successfully`,
                        'Close',
                        { duration: 3000 }
                    );
                },
                error: (err) => {
                    console.error('Error toggling property status:', err);
                    this.snackBar.open('Failed to update property status', 'Close', { duration: 3000 });
                }
            });
    }
}
