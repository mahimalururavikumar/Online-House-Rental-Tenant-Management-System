import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-tenant-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent],
    templateUrl: './tenant-layout.component.html',
    styleUrls: ['./tenant-layout.component.scss']
})
export class TenantLayoutComponent { }
