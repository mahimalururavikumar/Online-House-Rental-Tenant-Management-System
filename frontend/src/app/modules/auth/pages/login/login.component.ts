import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    loading = false;
    hidePassword = true;

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.loading = true;
        const { email, password } = this.loginForm.value;

        this.authService.login({
            email: email || '',
            password: password || ''
        }).subscribe({
            next: (res) => {
                this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
                this.redirectUser(res.user.role);
            },
            error: (err) => {
                this.snackBar.open(err.error?.message || 'Invalid credentials', 'Close', { duration: 3000 });
                this.loading = false;
            }
        });
    }

    private redirectUser(role: string) {
        switch (role.toUpperCase()) {
            case 'ADMIN':
                this.router.navigate(['/admin']);
                break;
            case 'OWNER':
                this.router.navigate(['/owner']);
                break;
            case 'TENANT':
            default:
                this.router.navigate(['/tenant']);
                break;
        }
    }
}
