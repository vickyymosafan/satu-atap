import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Kost Property related interfaces
export interface KostImage {
    id: string;
    url: string;
    alt: string;
    is_primary: boolean;
    order: number;
}

export interface KostAmenity {
    id: string;
    name: string;
    icon: string;
    category: 'basic' | 'comfort' | 'security' | 'connectivity';
    is_popular: boolean;
}

export interface KostLocation {
    id: string;
    address: string;
    district: string;
    city: string;
    province: string;
    postal_code: string;
    latitude?: number;
    longitude?: number;
    nearby_landmarks: string[];
}

export interface KostProperty {
    id: string;
    title: string;
    description: string;
    price_monthly: number;
    price_daily?: number;
    property_type: 'putra' | 'putri' | 'campur';
    room_type: 'single' | 'shared';
    available_rooms: number;
    total_rooms: number;
    images: KostImage[];
    amenities: KostAmenity[];
    location: KostLocation;
    rating: number;
    review_count: number;
    is_featured: boolean;
    is_verified: boolean;
    owner: {
        id: string;
        name: string;
        avatar?: string;
        phone: string;
        response_rate: number;
        response_time: string;
    };
    rules: string[];
    facilities: string[];
    created_at: string;
    updated_at: string;
}
