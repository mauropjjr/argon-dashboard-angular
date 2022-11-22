import { AssinaturasComponent } from './../../pages/assinaturas/assinaturas.component';
import { ConsultoresComponent } from './../../pages/consultores/consultores.component';
import { ClientesComponent } from './../../pages/clientes/clientes.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'consultores',       component: ConsultoresComponent},
    { path: 'assinaturas',       component: AssinaturasComponent},
    { path: 'clientes',       component: ClientesComponent}
];
