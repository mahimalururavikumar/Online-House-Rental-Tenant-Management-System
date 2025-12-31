import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
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
        MatGridListModule
    ],
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
    properties: any[] = [];
    loading = true;

    constructor(private propertyService: PropertyService) { }

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
