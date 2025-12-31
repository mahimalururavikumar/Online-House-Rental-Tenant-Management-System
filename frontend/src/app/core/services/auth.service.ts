import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient) { }

    login(data: { email: string; password: string }) {
        return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
            tap(res => this.storeToken(res.token))
        );
    }

    register(data: any) {
        const endpoint = data.role === 'ADMIN' ? '/register-admin' : '/register';
        return this.http.post(`${this.apiUrl}${endpoint}`, data);
    }

    private storeToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUserRole(): string | null {
        const token = this.getToken();
        if (!token) return null;
        const decoded = this.jwtHelper.decodeToken(token);
        return decoded?.role || null;
    }

    getUserId(): number | null {
        const token = this.getToken();
        if (!token) return null;
        const decoded = this.jwtHelper.decodeToken(token);
        return decoded?.id || null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return token ? !this.jwtHelper.isTokenExpired(token) : false;
    }

    isAdmin(): boolean {
        return this.getUserRole()?.toUpperCase() === 'ADMIN';
    }

    isOwner(): boolean {
        return this.getUserRole()?.toUpperCase() === 'OWNER';
    }

    isTenant(): boolean {
        return this.getUserRole()?.toUpperCase() === 'TENANT';
    }

    logout() {
        localStorage.removeItem('token');
    }
}
