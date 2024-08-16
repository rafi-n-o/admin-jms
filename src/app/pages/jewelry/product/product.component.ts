import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryService } from '../category/category.service';
import { ProductService } from './product.service';

interface Product {
    id?: number;
    categoryId?: number;
    subcategoryId: number;
    name: string;
}

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

interface Category {
    id: number;
    name: string;
    subcategories: [];
}

interface Subcategory {
    id: number;
    categoryId: number;
    name: string;
}

@Component({
    templateUrl: './product.component.html',
})
export class ProductComponent {
    loading: boolean;
    products: Product[] = [];
    errorMessage: string;
    totalRecords: number;
    subcategoryId: number;
    search: string = '';
    rows: number = 5;
    first: number = 0;
    currentPage: number = 1;
    categories: Category[] = [];
    subcategories: Subcategory[] = [];
    product: Product = {
        categoryId: null,
        subcategoryId: null,
        name: '',
    };
    subcategoryIdValidation: string;
    nameValidation: string;

    productDialog: boolean = false;
    deleteProductDialog: boolean = false;
    titleDialog: string;
    id: number;

    constructor(
        private productsService: ProductService,
        private categoriesService: CategoryService
    ) {}

    ngOnInit(): void {
        this.loadProducts(null, '', this.rows, 1);
        this.loadCategories();
    }

    onPageChange(event: PageEvent) {
        this.loadProducts(
            this.subcategoryId,
            this.search,
            event.rows,
            event.page + 1
        );
        this.first = event.first;
        this.rows = event.rows;
        this.currentPage = event.page + 1;
    }

    loadProducts(
        categoryId: number,
        search: string,
        rows: number,
        page: number
    ): void {
        this.loading = true;
        this.productsService
            .getProducts(categoryId, search, rows, page)
            .then((data) => {
                this.products = data.data;
                this.totalRecords = data.totalRecords;
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

    loadCategories(): void {
        this.categoriesService
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
            });
    }

    onCategoryChange(event: any) {
        const selectedCategory = this.categories.find(
            (category) => category.id === event.value
        );
        this.subcategories = selectedCategory
            ? selectedCategory.subcategories
            : [];
    }

    btnEdit(id: number) {
        this.productDialog = true;
        this.titleDialog = 'Ubah Produk';
        this.id = id;
        this.subcategoryIdValidation = null;
        this.nameValidation = null;
        this.productsService
            .getProduct(id)
            .then((data) => {
                this.product.categoryId = data.subcategory.category.id;
                const selectedCategory = this.categories.find(
                    (category) => category.id === data.subcategory.category.id
                );
                this.subcategories = selectedCategory
                    ? selectedCategory.subcategories
                    : [];
                this.product.subcategoryId = data.subcategory.id;
                this.product.name = data.name;
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
        this.deleteProductDialog = true;
    }

    btnConfirmDelete() {
        this.deleteProductDialog = false;
        this.productsService
            .deleteProduct(this.id)
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil dihapus',
                }).then(() => {
                    this.loadProducts(
                        this.subcategoryId,
                        this.search,
                        this.rows,
                        this.currentPage
                    );
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
        this.productDialog = true;
        this.titleDialog = 'Tambah Produk';
        this.product = { subcategoryId: null, name: '' };
        this.subcategoryIdValidation = null;
        this.nameValidation = null;
    }

    btnHideDialog() {
        this.productDialog = false;
    }

    btnSave() {
        if (this.titleDialog === 'Tambah Produk') {
            this.productsService
                .createProduct(this.product)
                .then((data) => {
                    this.productDialog = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil ditambahkan',
                    }).then(() => {
                        this.loadProducts(null, '', 5, 1);
                        this.first = 0;
                        this.rows = 5;
                        this.search = '';
                    });
                })
                .catch((err) => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach(
                            (errorMsg: string) => {
                                if (errorMsg.includes('subcategory')) {
                                    this.subcategoryIdValidation = errorMsg;
                                }
                                if (errorMsg.includes('name')) {
                                    this.nameValidation = errorMsg;
                                }
                            }
                        );
                    } else if (err?.response?.data?.message) {
                        this.productDialog = false;
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.productDialog = false;
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage,
                        }).then(() => {
                            this.productDialog = true;
                        });
                    }
                });
        }

        if (this.titleDialog === 'Ubah Produk') {
            this.productsService
                .updateProduct(this.id, this.product)
                .then((data) => {
                    this.productDialog = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Berhasil diubah',
                    }).then(() => {
                        this.loadProducts(
                            this.subcategoryId,
                            this.search,
                            this.rows,
                            this.currentPage
                        );
                    });
                })
                .catch((err) => {
                    console.error(err);
                    if (Array.isArray(err.response.data.message)) {
                        err.response.data.message.forEach(
                            (errorMsg: string) => {
                                if (errorMsg.includes('subcategory')) {
                                    this.subcategoryIdValidation = errorMsg;
                                }
                                if (errorMsg.includes('name')) {
                                    this.nameValidation = errorMsg;
                                }
                            }
                        );
                    } else if (err?.response?.data?.message) {
                        this.productDialog = false;
                        this.errorMessage = err.response.data.message;
                    } else {
                        this.productDialog = false;
                        this.errorMessage = err.message;
                    }

                    if (this.errorMessage.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: this.errorMessage,
                        }).then(() => {
                            this.productDialog = true;
                        });
                    }
                });
        }
    }
}
