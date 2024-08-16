import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryService } from '../category/category.service';
import { ItemService } from './item.service';
import { Table } from 'primeng/table';

interface Item {
    id: number;
    image?: string;
    registered?: boolean;
    product: object;
}

interface Product {
    id?: number;
    categoryId?: number;
    subcategoryId?: number;
    name?: string;
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

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    templateUrl: './item.component.html',
})
export class ItemComponent {
    loading: boolean = false;
    items: Item[] = [];
    products: Product[] = [];
    errorMessage: string;
    totalRecords: number;
    categories: Category[] = [];
    subcategories: Subcategory[] = [];
    filterProduct: Product = {
        categoryId: null,
        subcategoryId: null,
    };
    arrValidation: string;
    registered: string = '';
    search: string = '';
    rows: number = 5;
    first: number = 0;
    currentPage: number = 1;

    itemDialog: boolean = false;
    titleDialog: string;

    targetProducts: any[] = [];
    selectedItems: Item[] = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private categoriesService: CategoryService,
        private itemsService: ItemService
    ) {}

    ngOnInit(): void {
        this.loadItems('', '', this.rows, 1);
        this.loadCategories();
    }

    onPageChange(event: PageEvent) {
        this.loadItems(
            this.registered,
            this.search,
            event.rows,
            event.page + 1
        );
        this.first = event.first;
        this.rows = event.rows;
        this.currentPage = event.page + 1;
    }

    handleSearch(event: Event) {
        this.search = (event.target as HTMLInputElement).value;
        this.loadItems(
            this.registered,
            (event.target as HTMLInputElement).value,
            this.rows,
            1
        );
        this.first = 0;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
        this.loadItems(this.registered, '', 5, 1);
        this.first = 0;
        this.rows = 5;
        this.search = '';
    }

    loadItems(
        registered: string,
        search: string,
        rows: number,
        page: number
    ): void {
        (this.loading = true),
            this.itemsService
                .getItems(registered, search, rows, page)
                .then((data) => {
                    this.items = data.data;
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

    onSubcategoryChange(event: any) {
        this.loadProducts(event.value);
    }

    loadProducts(subcategoryId: number): void {
        this.loading = true;
        this.itemsService
            .getProductsBySubcategoryId(subcategoryId)
            .then((data) => {
                this.products = data;
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

    btnAdd() {
        this.itemDialog = true;
        this.titleDialog = 'Tambah Barang';
        this.filterProduct = { categoryId: null, subcategoryId: null };
    }

    isInTarget(product: any): boolean {
        return this.targetProducts.includes(product);
    }

    onMoveToTarget(event: any): void {
        const movedItems = event.items;
        movedItems.forEach((item: any) => {
            item.quantity = 1;
        });
    }

    btnSave() {
        const form = {
            arr: this.targetProducts,
        };

        this.itemsService
            .createItem(form)
            .then((data) => {
                this.itemDialog = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Berhasil ditambahkan',
                }).then(() => {
                    this.filter.nativeElement.value = '';
                    this.loadItems('', '', 5, 1);
                    this.first = 0;
                    this.rows = 5;
                    this.search = '';
                });
            })
            .catch((err) => {
                console.error(err);
                if (Array.isArray(err.response.data.message)) {
                    err.response.data.message.forEach((errorMsg: string) => {
                        if (errorMsg.includes('arr')) {
                            this.arrValidation = errorMsg;
                        }
                    });
                } else if (err?.response?.data?.message) {
                    this.itemDialog = false;
                    this.errorMessage = err.response.data.message;
                } else {
                    this.itemDialog = false;
                    this.errorMessage = err.message;
                }

                if (this.errorMessage.length) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: this.errorMessage,
                    }).then(() => {
                        this.itemDialog = true;
                    });
                }
            });
    }

    btnPrint() {
        const ids = this.selectedItems.map((item) => item.id);
        console.log(ids);
    }
}
