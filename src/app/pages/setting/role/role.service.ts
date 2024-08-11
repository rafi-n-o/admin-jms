import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private baseURL = environment.baseURL;

    getRoles(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseURL}/admin-roles`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
