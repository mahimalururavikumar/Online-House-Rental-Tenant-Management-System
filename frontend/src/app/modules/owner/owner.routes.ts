import { Routes } from '@angular/router';
import { OwnerLayoutComponent } from './components/owner-layout/owner-layout.component';

export const OWNER_ROUTES: Routes = [
    {
        path: '',
        component: OwnerLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/owner-home/owner-home.component').then(m => m.OwnerHomeComponent)
            },
            {
                path: 'my-properties',
                loadComponent: () => import('./pages/my-properties/my-properties.component').then(m => m.MyPropertiesComponent)
            },
            {
                path: 'booking-requests',
                loadComponent: () => import('./pages/all-booking-requests/all-booking-requests.component').then(m => m.AllBookingRequestsComponent)
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
        ]
    }
];
