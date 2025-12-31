import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatChipsModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
    private adminService = inject(AdminService);

    users: any[] = [];
    loading = true;
    displayedColumns: string[] = ['name', 'email', 'role', 'createdAt'];

    ngOnInit() {
        this.adminService.getAllUsers().subscribe({
            next: res => {
                this.users = res.users || res;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }
}
