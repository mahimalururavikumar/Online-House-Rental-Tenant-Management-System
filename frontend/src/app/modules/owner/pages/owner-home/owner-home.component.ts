import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { PropertyService } from '../../../../core/services/property.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-owner-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatGridListModule
    ],
    templateUrl: './owner-home.component.html',
    styleUrls: ['./owner-home.component.scss']
})
export class OwnerHomeComponent implements OnInit {
    public authService = inject(AuthService);
    private propertyService = inject(PropertyService);
    properties: any[] = [];
    loading = true;

    ngOnInit() {
        this.propertyService.getAllProperties().subscribe({
            next: res => {
                this.properties = res.properties || res;
                this.loading = false;
            },
            error: err => {
                console.error('Error loading properties:', err);
                this.loading = false;
            }
        });
    }
}
