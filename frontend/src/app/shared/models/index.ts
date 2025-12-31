// Shared models/interfaces
// Data models will be defined here

export interface User {
    id: number;
    email: string;
    role: 'tenant' | 'owner' | 'admin';
    // Add more fields as needed
}

export interface Property {
    id: number;
    title: string;
    description: string;
    // Add more fields as needed
}

export interface Booking {
    id: number;
    propertyId: number;
    userId: number;
    // Add more fields as needed
}
