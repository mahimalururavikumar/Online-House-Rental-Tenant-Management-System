import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
    {
        path: 'users',
        loadComponent: () => import('./pages/users/admin-users.component').then(m => m.AdminUsersComponent)
    },
    {
        path: 'properties',
        loadComponent: () => import('./pages/properties/admin-properties.component').then(m => m.AdminPropertiesComponent)
    },
    {
        path: 'bookings',
        loadComponent: () => import('./pages/bookings/admin-bookings.component').then(m => m.AdminBookingsComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    }
];
