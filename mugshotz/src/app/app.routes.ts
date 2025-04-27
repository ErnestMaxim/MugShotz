import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'coffee',
        loadChildren: () => import('./features/coffee/coffee.routes').then(r => r.COFFEE_ROUTES)
    },
    {
        path: 'bakery',
        loadChildren: () => import('./features/bakery/bakery.routes').then(r => r.BAKERY_ROUTES)
    },
    {
        path: 'about',
        loadChildren: () => import('./features/about/about.routes').then(r => r.ABOUT_ROUTES)
    }
];
