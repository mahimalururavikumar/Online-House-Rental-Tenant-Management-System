import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule],
    template: `
    <div class="unauthorized-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Access Denied</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>You do not have permission to access this page.</p>
          <p>Please contact your administrator if you believe this is an error.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="goBack()">Go Back</button>
          <button mat-raised-button (click)="goHome()">Go to Home</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
    styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    mat-card {
      max-width: 500px;
      text-align: center;
    }

    mat-card-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      padding: 16px;
    }
  `]
})
export class UnauthorizedComponent {
    constructor(private router: Router) { }

    goBack() {
        window.history.back();
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
