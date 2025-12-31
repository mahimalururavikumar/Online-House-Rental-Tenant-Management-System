import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PropertyService } from '../../../../core/services/property.service';

@Component({
    selector: 'app-my-properties',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './my-properties.component.html',
    styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent implements OnInit {
    properties: any[] = [];
    loading = true;

    constructor(private propertyService: PropertyService) { }

    ngOnInit() {
        this.propertyService.getOwnerProperties().subscribe({
            next: (res: any) => {
                this.properties = res.properties || res;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching owner properties:', err);
                this.loading = false;
            }
        });
    }

    deleteProperty(id: number) {
        if (confirm('Are you sure you want to delete this property? This action is irreversible.')) {
            // Delete logic will be implemented in a later step
            console.log('Delete property:', id);
        }
    }
}
