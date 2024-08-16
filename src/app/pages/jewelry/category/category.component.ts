import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { CategoryService } from './category.service';

interface Category {
    id?: number;
    name: string;
}

interface Subcategory {
    id?: number;
    categoryId?: number;
    name: string;
}

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
    loading: boolean = true;
    categories: Category[] = [];
    errorMessage: string;
    category: Category = { name: '' };
    subcategory: Subcategory = { name: '' };
    nameValidation: string;

    categoryDialog: boolean = false;
    subcategoryDialog: boolean = false;
    deleteCategoryDialog: boolean = false;
    deleteSubcategoryDialog: boolean = false;
    titleDialog: string;
    id: number;
    id_subcategory: number;

    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.loadCategories();
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    loadCategories(): void {
        this.categoryService
            .getCategories()
            .then((data) => {
                this.categories = data;
            })
            .catch((err) => {
                console.error(err);
                if (err?.response?.data?.message) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = err.message;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.errorMessage,
                });
            })
            .finally(() => {
                this.loading = false;
            });
    }

    btnEdit(id: number) {
        this.categoryDialog = true;
        this.titleDialog = 'Ubah Kategori';
        this.id = id;
        this.nameValidation = null;
        this.categoryService
            .getCategory(id)
            .then((data) => {
                this.category.name = data.name;
            })
            .catch((err) => {
                console.error(err);
                if (err?.response?.data?.message) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = err.message;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.errorMessage,
                });
            });
    }

    btnDelete(id: number) {
        this.id = id;
        this.deleteCategoryDialog = true;
    }

    btnConfirmDelete() {
        this.deleteCategoryDialog = false;
        this.categoryService
            .deleteCategory(this.id)
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil dihapus',
                }).then(() => {
                    this.loadCategories();
                });
            })
            .catch((err) => {
                console.error(err);
                if (err?.response?.data?.message) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = err.message;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.errorMessage,
                });
            });
    }

    btnAdd() {
        this.categoryDialog = true;
        this.titleDialog = 'Tambah Kategori';
        this.category = { name: '' };
        this.nameValidation = null;
    }

    btnHideDialog() {
        this.categoryDialog = false;
    }

    btnSave() {
        if (this.titleDialog === 'Tambah Kategori') {
            this.categoryService
                .createCategory(this.category)
                .then((data) => {
                    this.categoryDialog = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil ditambahkan',
                    }).then(() => {
                        this.filter.nativeElement.value = '';
                        this.loadCategories();
                    });
                })
                .catch((err) => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach(
                            (errorMsg: string) => {
                                if (errorMsg.includes('name')) {
                                    this.nameValidation = errorMsg;
                                }
                            }
                        );
                    } else if (err?.response?.data?.message) {
                        this.categoryDialog = false;
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.categoryDialog = false;
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage,
                        }).then(() => {
                            this.categoryDialog = true;
                        });
                    }
                });
        }

        if (this.titleDialog === 'Ubah Kategori') {
            this.categoryService
                .updateCategory(this.id, this.category)
                .then((data) => {
                    this.categoryDialog = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil diubah',
                    }).then(() => {
                        this.loadCategories();
                    });
                })
                .catch((err) => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach(
                            (errorMsg: string) => {
                                if (errorMsg.includes('name')) {
                                    this.nameValidation = errorMsg;
                                }
                            }
                        );
                    } else if (err?.response?.data?.message) {
                        this.categoryDialog = false;
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.categoryDialog = false;
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage,
                        }).then(() => {
                            this.categoryDialog = true;
                        });
                    }
                });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    btnEditSubcategory(id: number) {
        this.subcategoryDialog = true;
        this.titleDialog = 'Ubah Sub Kategori';
        this.id_subcategory = id;
        this.nameValidation = null;
        this.categoryService
            .getSubcategory(id)
            .then((data) => {
                this.subcategory.name = data.name;
            })
            .catch((err) => {
                console.error(err);
                if (err?.response?.data?.message) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = err.message;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.errorMessage,
                });
            });
    }

    btnDeleteSubcategory(id: number) {
        this.id_subcategory = id;
        this.deleteSubcategoryDialog = true;
    }

    btnConfirmDeleteSubcategory() {
        this.deleteSubcategoryDialog = false;
        this.categoryService
            .deleteSubcategory(this.id_subcategory)
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil dihapus',
                }).then(() => {
                    this.loadCategories();
                });
            })
            .catch((err) => {
                console.error(err);
                if (err?.response?.data?.message) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = err.message;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.errorMessage,
                });
            });
    }

    btnAddSubcategory(id: number) {
        this.subcategoryDialog = true;
        this.titleDialog = 'Tambah Sub Kategori';
        this.subcategory = { categoryId: id, name: '' };
        this.nameValidation = null;
    }

    btnHideDialogSubcategory() {
        this.subcategoryDialog = false;
    }

    btnSaveSubcategory() {
        if (this.titleDialog === 'Tambah Sub Kategori') {
            this.categoryService
                .createSubcategory(this.subcategory)
                .then((data) => {
                    this.subcategoryDialog = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil ditambahkan',
                    }).then(() => {
                        this.filter.nativeElement.value = '';
                        this.loadCategories();
                    });
                })
                .catch((err) => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach(
                            (errorMsg: string) => {
                                if (errorMsg.includes('name')) {
                                    this.nameValidation = errorMsg;
                                }
                            }
                        );
                    } else if (err?.response?.data?.message) {
                        this.subcategoryDialog = false;
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.subcategoryDialog = false;
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage,
                        }).then(() => {
                            this.subcategoryDialog = true;
                        });
                    }
                });
        }

        if (this.titleDialog === 'Ubah Sub Kategori') {
            this.categoryService
                .updateSubcategory(this.id_subcategory, this.subcategory)
                .then((data) => {
                    this.subcategoryDialog = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil diubah',
                    }).then(() => {
                        this.loadCategories();
                    });
                })
                .catch((err) => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach(
                            (errorMsg: string) => {
                                if (errorMsg.includes('name')) {
                                    this.nameValidation = errorMsg;
                                }
                            }
                        );
                    } else if (err?.response?.data?.message) {
                        this.subcategoryDialog = false;
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.subcategoryDialog = false;
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage,
                        }).then(() => {
                            this.subcategoryDialog = true;
                        });
                    }
                });
        }
    }
}
