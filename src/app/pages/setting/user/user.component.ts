import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';

interface User {
    id?: number;
    nip: string;
    name: string;
    phone: string;
    roleId: number;
}

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

interface Role {
    id: number;
    name: string;
}

@Component({
    templateUrl: './user.component.html'
})
export class UserComponent {
    loading: boolean;
    users: User[] = [];
    errorMessage: string;
    totalRecords: number;
    search: string = '';
    rows: number = 5;
    first: number = 0;
    currentPage: number;
    roles: Role[] = [];
    user: User = { nip: '', name: '', phone: '', roleId: null };
    nipValidation: string;
    nameValidation: string;
    phoneValidation: string;
    roleIdValidation: string;

    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    titleDialog: string;
    id: number;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private userService: UserService, private roleService: RoleService) { }

    ngOnInit(): void {
        this.loadUsers('', this.rows, 1);
        this.loadRoles();
    }

    onPageChange(event: PageEvent) {
        this.loadUsers(this.search, event.rows, event.page + 1);
        this.first = event.first;
        this.rows = event.rows;
        this.currentPage = event.page + 1
    }

    handleSearch(event: Event) {
        this.search = (event.target as HTMLInputElement).value;
        this.loadUsers((event.target as HTMLInputElement).value, this.rows, 1);
        this.first = 0;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
        this.loadUsers('', 5, 1);
        this.first = 0;
        this.rows = 5;
        this.search = '';
    }

    loadUsers(search: string, rows: number, page: number): void {
        this.loading = true
        this.userService.getUsers(search, rows, page)
            .then(data => {
                this.users = data.data;
                this.totalRecords = data.totalRecords
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
            })
    }

    btnEdit(id: number) {
        this.userDialog = true;
        this.titleDialog = "Ubah User"
        this.id = id;
        this.nipValidation = null;
        this.nameValidation = null;
        this.phoneValidation = null;
        this.roleIdValidation = null;
        this.userService.getUser(id)
            .then(data => {
                this.user.nip = data.nip;
                this.user.name = data.name;
                this.user.phone = data.phone;
                this.user.roleId = data.role.id;
            }).catch(err => {
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
            })
    }

    btnDelete(id: number) {
        this.id = id
        this.deleteUserDialog = true;
    }

    btnConfirmDelete() {
        this.deleteUserDialog = false;
        this.userService.deleteUser(this.id)
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil dihapus'
                }).then(() => {
                    this.loadUsers(this.search, this.rows, this.currentPage);
                })
            }).catch(err => {
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
            })
    }

    btnAdd() {
        this.userDialog = true;
        this.titleDialog = "Tambah User";
        this.user = { nip: '', name: '', phone: '', roleId: null };
        this.nipValidation = null;
        this.nameValidation = null;
        this.phoneValidation = null;
        this.roleIdValidation = null;
    }

    btnHideDialog() {
        this.userDialog = false;
    }

    btnSave() {
        if (this.titleDialog === "Tambah User") {
            this.userService.createUser(this.user)
                .then(data => {
                    this.userDialog = false
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil ditambahkan'
                    }).then(() => {
                        this.filter.nativeElement.value = '';
                        this.loadUsers('', 5, 1);
                        this.first = 0;
                        this.rows = 5;
                        this.search = '';
                    })
                }).catch(err => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach((errorMsg: string) => {
                            if (errorMsg.includes('nip')) {
                                this.nipValidation = errorMsg;
                            }
                            if (errorMsg.includes('name')) {
                                this.nameValidation = errorMsg;
                            }
                            if (errorMsg.includes('phone')) {
                                this.phoneValidation = errorMsg;
                            }
                            if (errorMsg.includes('role')) {
                                this.roleIdValidation = errorMsg;
                            }
                        });
                    } else if (err?.response?.data?.message) {
                        this.userDialog = false
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.userDialog = false
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage
                        }).then(() => {
                            this.userDialog = true
                        })
                    }
                })
        }

        if (this.titleDialog === "Ubah User") {
            this.userService.updateUser(this.id, this.user)
                .then(data => {
                    this.userDialog = false
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil diubah'
                    }).then(() => {
                        this.loadUsers(this.search, this.rows, this.currentPage);
                    })
                }).catch(err => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach((errorMsg: string) => {
                            if (errorMsg.includes('nip')) {
                                this.nipValidation = errorMsg;
                            }
                            if (errorMsg.includes('name')) {
                                this.nameValidation = errorMsg;
                            }
                            if (errorMsg.includes('phone')) {
                                this.phoneValidation = errorMsg;
                            }
                            if (errorMsg.includes('role')) {
                                this.roleIdValidation = errorMsg;
                            }
                        });
                    } else if (err?.response?.data?.message) {
                        this.userDialog = false
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.userDialog = false
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage
                        }).then(() => {
                            this.userDialog = true
                        })
                    }
                })
        }

    }
}
