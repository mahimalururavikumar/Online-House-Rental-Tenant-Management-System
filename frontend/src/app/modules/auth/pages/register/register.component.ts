import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-register',
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
        MatSelectModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        role: ['TENANT', Validators.required]
    });

    loading = false;
    hidePassword = true;

    roles = [
        { value: 'TENANT', label: 'Tenant (Search for homes)', icon: 'search' },
        { value: 'OWNER', label: 'Owner (List your property)', icon: 'add_home' },
        { value: 'ADMIN', label: 'Admin (System Management)', icon: 'admin_panel_settings' }
    ];

    onSubmit() {
        if (this.registerForm.invalid) return;

        this.loading = true;
        const { name, email, password, role, contact } = this.registerForm.value;

        this.authService.register({
            name: name || '',
            email: email || '',
            password: password || '',
            contact: contact || '',
            role: role || 'TENANT'
        }).subscribe({
            next: () => {
                this.snackBar.open('Registration successful! Please login.', 'Close', { duration: 3000 });
                this.router.navigate(['/auth/login']);
            },
            error: (err) => {
                this.snackBar.open(err.error?.message || 'Registration failed', 'Close', { duration: 3000 });
                this.loading = false;
            }
        });
    }
}
