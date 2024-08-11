import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { RoleService } from './role.service';

interface Role {
    id: number;
    name: string;
}

@Component({
    templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
    loading: boolean = true;
    roles: Role[] = [];
    errorMessage: string

    @ViewChild('filter') filter!: ElementRef;

    constructor(private roleService: RoleService) { }

    ngOnInit(): void {
        this.loadRoles();
    }

    loadRoles(): void {
        this.roleService.getRoles()
            .then(data => {
                this.roles = data;
            })
            .catch(err => {
                console.error(err);

                if (err?.response?.data?.message) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = err.message;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.errorMessage
                });
            }).finally(() => {
                this.loading = false
            });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}