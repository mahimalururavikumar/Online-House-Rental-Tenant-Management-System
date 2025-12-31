import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/admin-home/admin-home.component').then(m => m.AdminHomeComponent)
            },
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
            }
        ]
    }
];
