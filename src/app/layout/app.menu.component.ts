import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Beranda',
                        icon: 'pi pi-fw pi-home',
                        routerLink: [''],
                    },
                ],
            },
            {
                label: 'Perhiasan',
                items: [
                    {
                        label: 'Kategori',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/jewelry/category'],
                    },
                    {
                        label: 'Produk',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/jewelry/product'],
                    },
                    {
                        label: 'Barang',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/jewelry/item'],
                    },
                ],
            },
            {
                label: 'Setting',
                items: [
                    {
                        label: 'User',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/setting/user'],
                    },
                    {
                        label: 'Role',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/setting/role'],
                    },
                ],
            },
        ];
    }
}
