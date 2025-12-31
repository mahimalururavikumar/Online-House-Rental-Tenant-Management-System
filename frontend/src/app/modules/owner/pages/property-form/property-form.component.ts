import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PropertyService } from '../../../../core/services/property.service';

@Component({
    selector: 'app-property-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './property-form.component.html',
    styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
    isEdit = false;
    propertyId!: number;
    loading = false;

    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private propertyService = inject(PropertyService);
    private snackBar = inject(MatSnackBar);

    propertyForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        rent: [null as number | null, [Validators.required, Validators.min(1)]],
        location: ['', Validators.required],
        amenities: [''],
        photos: [''],
        isActive: [true]
    });

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this.propertyId = +id;
            this.fetchPropertyDetails();
        }
    }

    fetchPropertyDetails() {
        this.loading = true;
        this.propertyService.getPropertyById(this.propertyId).subscribe({
            next: (res) => {
                const property = res.property || res;
                this.propertyForm.patchValue({
                    title: property.title,
                    description: property.description,
                    rent: property.rent,
                    location: property.location,
                    amenities: property.amenities,
                    photos: property.PropertyPhotos?.map((p: any) => p.photoUrl).join(', '),
                    isActive: property.isActive ?? true
                });
                this.loading = false;
            },
            error: (err) => {
                this.snackBar.open('Error fetching property details', 'Close', { duration: 3000 });
                this.loading = false;
            }
        });
    }

    submit() {
        if (this.propertyForm.invalid) return;

        this.loading = true;
        const formValue = this.propertyForm.value;

        const payload = {
            title: formValue.title,
            description: formValue.description,
            rent: formValue.rent,
            location: formValue.location,
            amenities: formValue.amenities,
            photos: formValue.photos
                ? (formValue.photos as string).split(',').map(url => url.trim()).filter(url => url !== '')
                : [],
            isActive: formValue.isActive
        };

        const request = this.isEdit
            ? this.propertyService.updateProperty(this.propertyId, payload)
            : this.propertyService.addProperty(payload);

        request.subscribe({
            next: () => {
                const message = `Property ${this.isEdit ? 'updated' : 'added'} successfully!`;
                this.snackBar.open(message, 'Close', { duration: 3000 });
                this.router.navigate(['/owner']);
            },
            error: (err) => {
                console.error('Error saving property:', err);
                this.snackBar.open(
                    err.error?.message || 'Error saving property. Please try again.',
                    'Close',
                    { duration: 3000 }
                );
                this.loading = false;
            }
        });
    }

    goBack() {
        this.router.navigate(['/owner']);
    }
}
