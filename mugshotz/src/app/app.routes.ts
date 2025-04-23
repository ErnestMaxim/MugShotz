import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'details',
        loadChildren: () => import('./features/details/details.routes').then(r => r.DETAILS_ROUTES)
    },
    {
        path: 'about',
        loadChildren: () => import('./features/about/about.routes').then(r => r.ABOUT_ROUTES)
    }
];
