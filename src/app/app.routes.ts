import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/pages/welcome/welcome.component').then(c =>c.WelcomeComponent),
        title: 'E-BookScore | Welcome'
      },
      {
        path: 'books',
        loadComponent: () => import('./components/pages/books/books.component').then(c =>c.BooksComponent),
        title: 'E-BookScore | Books'
      },
      {
        path: 'book/:bookId',
        loadComponent: () => import('./components/pages/book-details/book-details.component').then(c =>c.BookDetailsComponent),
        title: 'E-BookScore | Book Resume'
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Error 404'
  },
  {
    path: '**',
    redirectTo: '',
  }
];
