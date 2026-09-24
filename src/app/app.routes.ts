import { Routes } from '@angular/router';

import { HomeComponent } from './home/home';
import { DemoButtonComponent } from './demo/demo-button/demo-button';
import { DemoInputComponent } from './demo/demo-input/demo-input';
import { DemoCardComponent } from './demo/demo-card/demo-card';
import { DemoModalComponent } from './demo/demo-modal/demo-modal';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'demo/button',
    component: DemoButtonComponent
  },
  {
    path: 'demo/input',
    component: DemoInputComponent
  },
  {
    path: 'demo/card',
    component: DemoCardComponent
  },
  {
    path: 'demo/modal',
    component: DemoModalComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];