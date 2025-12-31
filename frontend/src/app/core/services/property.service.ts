import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {
    private apiUrl = `${environment.apiUrl}/properties`;

    constructor(private http: HttpClient) { }

    getAllProperties(filters: any = {}) {
        return this.http.get<any>(this.apiUrl, { params: filters });
    }

    getOwnerProperties() {
        return this.http.get<any>(`${this.apiUrl}/owner`);
    }

    getPropertyById(id: number) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    addProperty(data: any) {
        return this.http.post<any>(this.apiUrl, data);
    }

    updateProperty(id: number, data: any) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, data);
    }
}
