<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Landing Page Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration options for the landing page performance, caching,
    | and feature toggles.
    |
    */

    'performance' => [
        /*
        |--------------------------------------------------------------------------
        | Caching Configuration
        |--------------------------------------------------------------------------
        */
        'cache' => [
            // Featured properties cache duration (in minutes)
            'featured_properties_ttl' => env('CACHE_FEATURED_PROPERTIES_TTL', 30),
            
            // Availability data cache duration (in minutes)
            'availability_ttl' => env('CACHE_AVAILABILITY_TTL', 5),
            
            // Statistics cache duration (in minutes)
            'stats_ttl' => env('CACHE_STATS_TTL', 10),
            
            // Image cache duration (in minutes)
            'images_ttl' => env('CACHE_IMAGES_TTL', 1440), // 24 hours
        ],

        /*
        |--------------------------------------------------------------------------
        | Image Optimization
        |--------------------------------------------------------------------------
        */
        'images' => [
            // Enable WebP format conversion
            'webp_enabled' => env('IMAGES_WEBP_ENABLED', true),
            
            // Image quality settings
            'quality' => [
                'thumbnail' => env('IMAGE_QUALITY_THUMBNAIL', 80),
                'medium' => env('IMAGE_QUALITY_MEDIUM', 85),
                'large' => env('IMAGE_QUALITY_LARGE', 90),
            ],
            
            // Image sizes for responsive images
            'sizes' => [
                'thumbnail' => [150, 150],
                'small' => [300, 200],
                'medium' => [600, 400],
                'large' => [1200, 800],
                'hero' => [1920, 1080],
            ],
            
            // Lazy loading configuration
            'lazy_loading' => [
                'enabled' => env('IMAGES_LAZY_LOADING', true),
                'threshold' => env('IMAGES_LAZY_THRESHOLD', '100px'),
            ],
        ],

        /*
        |--------------------------------------------------------------------------
        | API Rate Limiting
        |--------------------------------------------------------------------------
        */
        'rate_limiting' => [
            // Requests per minute for availability API
            'availability_rpm' => env('API_AVAILABILITY_RPM', 60),
            
            // Requests per minute for search API
            'search_rpm' => env('API_SEARCH_RPM', 30),
            
            // Requests per minute for contact forms
            'contact_rpm' => env('API_CONTACT_RPM', 10),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Real-time Features
    |--------------------------------------------------------------------------
    */
    'realtime' => [
        // Enable WebSocket connections
        'websocket_enabled' => env('WEBSOCKET_ENABLED', true),
        
        // WebSocket server configuration
        'websocket' => [
            'host' => env('WEBSOCKET_HOST', 'localhost'),
            'port' => env('WEBSOCKET_PORT', 6001),
            'scheme' => env('WEBSOCKET_SCHEME', 'ws'),
        ],
        
        // Availability update intervals
        'availability' => [
            'update_interval' => env('AVAILABILITY_UPDATE_INTERVAL', 30), // seconds
            'heartbeat_interval' => env('AVAILABILITY_HEARTBEAT_INTERVAL', 30), // seconds
            'max_reconnect_attempts' => env('AVAILABILITY_MAX_RECONNECT', 5),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | SEO Configuration
    |--------------------------------------------------------------------------
    */
    'seo' => [
        // Default meta tags
        'meta' => [
            'title' => env('SEO_TITLE', 'Satu Atap - Platform Kost Terpercaya'),
            'description' => env('SEO_DESCRIPTION', 'Temukan kost impianmu dengan mudah. Platform terpercaya dengan ribuan pilihan kost berkualitas di seluruh Indonesia.'),
            'keywords' => env('SEO_KEYWORDS', 'kost, boarding house, sewa kamar, kost murah, kost dekat kampus'),
            'author' => env('SEO_AUTHOR', 'Satu Atap'),
        ],
        
        // Open Graph tags
        'og' => [
            'title' => env('OG_TITLE', 'Satu Atap - Platform Kost Terpercaya'),
            'description' => env('OG_DESCRIPTION', 'Temukan kost impianmu dengan mudah. Platform terpercaya dengan ribuan pilihan kost berkualitas.'),
            'image' => env('OG_IMAGE', '/images/og-image.jpg'),
            'url' => env('OG_URL', env('APP_URL')),
        ],
        
        // Twitter Card tags
        'twitter' => [
            'card' => 'summary_large_image',
            'site' => env('TWITTER_SITE', '@satuatap'),
            'creator' => env('TWITTER_CREATOR', '@satuatap'),
        ],
        
        // Structured data
        'structured_data' => [
            'enabled' => env('STRUCTURED_DATA_ENABLED', true),
            'organization' => [
                'name' => 'Satu Atap',
                'url' => env('APP_URL'),
                'logo' => env('APP_URL') . '/images/logo.png',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Feature Toggles
    |--------------------------------------------------------------------------
    */
    'features' => [
        // Enable/disable specific sections
        'hero_section' => env('FEATURE_HERO_SECTION', true),
        'featured_properties' => env('FEATURE_FEATURED_PROPERTIES', true),
        'map_section' => env('FEATURE_MAP_SECTION', true),
        'testimonials' => env('FEATURE_TESTIMONIALS', true),
        'cta_section' => env('FEATURE_CTA_SECTION', true),
        
        // Enable/disable specific features
        'real_time_availability' => env('FEATURE_REAL_TIME_AVAILABILITY', true),
        'price_alerts' => env('FEATURE_PRICE_ALERTS', true),
        'favorites' => env('FEATURE_FAVORITES', true),
        'social_sharing' => env('FEATURE_SOCIAL_SHARING', true),
        'dark_mode' => env('FEATURE_DARK_MODE', true),
        
        // Third-party integrations
        'google_maps' => env('FEATURE_GOOGLE_MAPS', true),
        'whatsapp_integration' => env('FEATURE_WHATSAPP', true),
        'analytics' => env('FEATURE_ANALYTICS', true),
    ],

    /*
    |--------------------------------------------------------------------------
    | Content Configuration
    |--------------------------------------------------------------------------
    */
    'content' => [
        // Featured properties limit
        'featured_properties_limit' => env('FEATURED_PROPERTIES_LIMIT', 6),
        
        // Testimonials configuration
        'testimonials' => [
            'limit' => env('TESTIMONIALS_LIMIT', 10),
            'auto_rotate' => env('TESTIMONIALS_AUTO_ROTATE', true),
            'rotation_interval' => env('TESTIMONIALS_ROTATION_INTERVAL', 5000), // milliseconds
        ],
        
        // Search configuration
        'search' => [
            'suggestions_limit' => env('SEARCH_SUGGESTIONS_LIMIT', 6),
            'popular_searches' => [
                'Kost dekat UI',
                'Kost Jakarta Selatan',
                'Kost murah Depok',
                'Kost Bandung',
                'Kost dekat ITB',
                'Kost Yogyakarta',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Analytics Configuration
    |--------------------------------------------------------------------------
    */
    'analytics' => [
        // Google Analytics
        'google_analytics' => [
            'enabled' => env('GA_ENABLED', false),
            'tracking_id' => env('GA_TRACKING_ID'),
        ],
        
        // Facebook Pixel
        'facebook_pixel' => [
            'enabled' => env('FB_PIXEL_ENABLED', false),
            'pixel_id' => env('FB_PIXEL_ID'),
        ],
        
        // Custom events tracking
        'events' => [
            'property_view' => env('TRACK_PROPERTY_VIEW', true),
            'search_performed' => env('TRACK_SEARCH', true),
            'contact_form_submitted' => env('TRACK_CONTACT_FORM', true),
            'whatsapp_clicked' => env('TRACK_WHATSAPP', true),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Contact Information
    |--------------------------------------------------------------------------
    */
    'contact' => [
        'phone' => env('CONTACT_PHONE', '+62 812-3456-7890'),
        'email' => env('CONTACT_EMAIL', 'support@satuatap.com'),
        'whatsapp' => env('CONTACT_WHATSAPP', '6281234567890'),
        'address' => env('CONTACT_ADDRESS', 'Jakarta, Indonesia'),
        'support_hours' => env('SUPPORT_HOURS', '24/7'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Social Media Links
    |--------------------------------------------------------------------------
    */
    'social' => [
        'facebook' => env('SOCIAL_FACEBOOK'),
        'instagram' => env('SOCIAL_INSTAGRAM'),
        'twitter' => env('SOCIAL_TWITTER'),
        'linkedin' => env('SOCIAL_LINKEDIN'),
        'youtube' => env('SOCIAL_YOUTUBE'),
    ],
];
