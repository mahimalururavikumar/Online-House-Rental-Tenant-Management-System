import { Routes } from '@angular/router';

export const TENANT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/property-list/property-list.component').then(m => m.PropertyListComponent)
    },
    {
        path: 'property/:id',
        loadComponent: () => import('./pages/property-details/property-details.component').then(m => m.PropertyDetailsComponent)
    },
    {
        path: 'book/:id',
        loadComponent: () => import('./pages/booking-request/booking-request.component').then(m => m.BookingRequestComponent)
    },
    {
        path: 'my-bookings',
        loadComponent: () => import('./pages/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent)
    }
];
