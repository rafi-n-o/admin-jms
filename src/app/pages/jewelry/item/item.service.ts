import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    private baseURL = environment.baseURL;

    getItems(
        registered: string,
        search: string,
        rows: number,
        page: number
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.baseURL}/admin-items?registered=${registered}&search=${search}&limit=${rows}&page=${page}`
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getProductsBySubcategoryId(subcategoryId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.baseURL}/admin-products/subcategories/${subcategoryId}`
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    createItem(form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/admin-items`, form)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    print(form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/admin-items/print`, form, {
                    responseType: 'blob',
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
