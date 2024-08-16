import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private baseURL = environment.baseURL;

    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/admin-categories`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getCategory(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/admin-categories/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    createCategory(form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/admin-categories`, form)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    updateCategory(id: number, form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .put(`${this.baseURL}/admin-categories/${id}`, form)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    deleteCategory(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${this.baseURL}/admin-categories/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getSubcategory(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/admin-subcategories/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    createSubcategory(form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/admin-subcategories`, form)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    updateSubcategory(id: number, form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .put(`${this.baseURL}/admin-subcategories/${id}`, form)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    deleteSubcategory(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${this.baseURL}/admin-subcategories/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
