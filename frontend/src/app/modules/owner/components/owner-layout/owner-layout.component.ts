import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-owner-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent],
    templateUrl: './owner-layout.component.html',
    styleUrls: ['./owner-layout.component.scss']
})
export class OwnerLayoutComponent { }
