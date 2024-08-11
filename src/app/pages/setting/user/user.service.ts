import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseURL = environment.baseURL;

    getUsers(search: string, rows: number, page: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseURL}/admin-users?search=${search}&limit=${rows}&page=${page}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    getUser(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseURL}/admin-users/${id}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }

    createUser(form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(`${this.baseURL}/admin-users`, form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }

    updateUser(id: number, form: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.put(`${this.baseURL}/admin-users/${id}`, form)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    deleteUser(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.baseURL}/admin-users/${id}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
}
