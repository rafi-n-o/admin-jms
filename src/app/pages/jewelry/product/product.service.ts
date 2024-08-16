import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private baseURL = environment.baseURL;

    getProducts(
        subcategoryId: number,
        search: string,
        rows: number,
        page: number
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.baseURL}/admin-products?subcategoryId=${subcategoryId}&search=${search}&limit=${rows}&page=${page}`
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getProduct(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/admin-products/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    createProduct(form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/admin-products`, form)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    updateProduct(id: number, form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .put(`${this.baseURL}/admin-products/${id}`, form)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    deleteProduct(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${this.baseURL}/admin-products/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
