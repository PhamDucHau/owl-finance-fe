import { Routes } from '@angular/router';

// theme pages
import { AppWelcomeComponent } from './welcome-page.component';

export const WelcomePageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppWelcomeComponent,
      },
    ],
  },
];
