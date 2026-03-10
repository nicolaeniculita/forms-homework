import { Routes } from '@angular/router';

import { NetworkTableComponent } from './features/network-table/network-table.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'network' },
  { path: 'network', component: NetworkTableComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'network' },
];
