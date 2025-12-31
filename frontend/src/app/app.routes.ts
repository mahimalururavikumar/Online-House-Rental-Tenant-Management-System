import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    { path: 'login', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'register', redirectTo: '/auth/register', pathMatch: 'full' },
    {
        path: 'tenant',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['TENANT'] },
        loadChildren: () => import('./modules/tenant/tenant.routes').then(m => m.TENANT_ROUTES)
    },
    {
        path: 'owner',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['OWNER'] },
        loadChildren: () => import('./modules/owner/owner.routes').then(m => m.OWNER_ROUTES)
    },
    {
        path: 'admin',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ADMIN'] },
        loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('./shared/components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }
];
