import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
        { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
    ])],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
