import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PropertyService } from '../../../../core/services/property.service';

@Component({
    selector: 'app-property-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
    properties: any[] = [];
    loading = true;
    filters = {
        location: '',
        maxRent: '',
        amenities: ''
    };

    constructor(private propertyService: PropertyService) { }

    ngOnInit() {
        this.loadProperties();
    }

    loadProperties() {
        this.loading = true;
        const activeFilters: any = {};
        if (this.filters.location) activeFilters.location = this.filters.location;
        if (this.filters.maxRent) activeFilters.maxRent = this.filters.maxRent;
        if (this.filters.amenities) activeFilters.amenities = this.filters.amenities;

        this.propertyService.getAllProperties(activeFilters).subscribe({
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

    applyFilters() {
        this.loadProperties();
    }

    clearFilters() {
        this.filters = {
            location: '',
            maxRent: '',
            amenities: ''
        };
        this.loadProperties();
    }
}
