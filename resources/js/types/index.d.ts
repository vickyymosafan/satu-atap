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

// Why Choose Us section interfaces
export interface CompanyBenefit {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'service' | 'quality' | 'support' | 'technology';
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface TrustIndicator {
    id: string;
    title: string;
    description: string;
    icon: string;
    badge_type: 'security' | 'verification' | 'quality' | 'service';
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface PlatformStatistic {
    id: string;
    metric_name: string;
    metric_value: string;
    metric_label: string;
    icon: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface VerificationBadge {
    id: string;
    title: string;
    description: string;
    icon: string;
    badge_color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface WhyChooseUsData {
    benefits: CompanyBenefit[];
    trust_indicators: TrustIndicator[];
    statistics: PlatformStatistic[];
    verification_badges: VerificationBadge[];
}

// Contact & Support section interfaces
export interface ContactForm {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'pending' | 'in_progress' | 'resolved' | 'closed';
    responded_at?: string;
    admin_notes?: string;
    created_at: string;
    updated_at: string;
}

export interface ContactFormSubmission {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}



export interface SocialMediaLink {
    id: string;
    platform_name: string;
    platform_url: string;
    icon: string;
    display_name?: string;
    username?: string;
    platform_type: 'social' | 'messaging' | 'professional' | 'other';
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    category: 'general' | 'booking' | 'payment' | 'property' | 'account' | 'technical';
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    view_count: number;
    created_at: string;
    updated_at: string;
}

export interface ContactData {
    social_media: SocialMediaLink[];
    featured_faqs: FaqItem[];
    faq_categories: Record<string, string>;
}

// Legacy alias for backward compatibility
export type ContactSupportData = ContactData;
