import { Routes } from '@angular/router';

export const OWNER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/my-properties/my-properties.component').then(m => m.MyPropertiesComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./pages/property-form/property-form.component').then(m => m.PropertyFormComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./pages/property-form/property-form.component').then(m => m.PropertyFormComponent)
    },
    {
        path: 'bookings/:propertyId',
        loadComponent: () => import('./pages/booking-requests/booking-requests.component').then(m => m.BookingRequestsComponent)
    }
];
