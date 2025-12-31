import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PropertyService } from '../../../../core/services/property.service';

@Component({
  standalone: true,
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class PropertyDetailsComponent implements OnInit {
  property: any;
  loading = true;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.propertyService.getPropertyById(id).subscribe({
      next: res => {
        // Handle both possible response structures { property: ... } or direct property
        this.property = res.property || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching property:', err);
        this.loading = false;
      }
    });
  }

  bookProperty() {
    this.router.navigate(['/tenant/book', this.property.id]);
  }

  nextImage() {
    if (this.property?.PropertyPhotos?.length) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.property.PropertyPhotos.length;
    }
  }

  prevImage() {
    if (this.property?.PropertyPhotos?.length) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.property.PropertyPhotos.length) % this.property.PropertyPhotos.length;
    }
  }

  goBack() {
    this.router.navigate(['/tenant']);
  }
}
