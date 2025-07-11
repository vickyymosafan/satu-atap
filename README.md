# Satu Atap - Header Only Version

A simplified version of the Satu Atap platform with only the header component remaining. Built with Laravel 12, React, TypeScript, and Inertia.js.

## Features

- 🎨 Responsive header with navigation
- 🌙 Dark/Light theme support
- 🔐 User authentication
- 📱 Mobile-friendly design

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React 18, TypeScript, Inertia.js
- **Styling**: Tailwind CSS
- **Database**: SQLite (default) / MySQL / PostgreSQL
- **Build Tool**: Vite
- **Package Manager**: npm

## Quick Start

**TL;DR - Get running in 5 minutes:**

```bash
# 1. Clone and setup
git clone <repository-url>
cd satu-atap
composer install
npm install

# 2. Configure environment
cp .env.example .env
php artisan key:generate
touch database/database.sqlite

# 3. Setup database with sample data (includes image download)
php artisan migrate:fresh --seed
php artisan storage:link

# 4. Start development servers
composer run dev
```

Visit http://localhost:8000 to see the application with all sample data and images!

**Automated Setup (Linux/macOS):**
```bash
chmod +x setup.sh
./setup.sh
```

**Verify Installation:**
```bash
php verify-installation.php
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.2 or higher**
- **Composer** (latest version)
- **Node.js 18+ and npm**
- **Git**

## Installation Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd satu-atap
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node.js Dependencies

```bash
npm install
```

### 4. Environment Setup

Copy the environment file and configure it:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

### 5. Database Setup

The project uses SQLite by default. Create the database file:

```bash
touch database/database.sqlite
```

**Alternative: Using MySQL/PostgreSQL**

If you prefer MySQL or PostgreSQL, update your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=satu_atap
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 6. Run Migrations and Seeders

This will create all tables and populate them with sample data including downloaded images:

```bash
php artisan migrate:fresh --seed
```

**What this command does:**
- Drops all existing tables
- Creates fresh database structure
- Runs all migrations (users, kost properties, images, amenities, locations)
- Seeds the database with sample data
- Downloads and stores 8 property images locally
- Creates 4 featured properties with complete data

### 7. Create Storage Symlink

Link the storage directory for public file access:

```bash
php artisan storage:link
```

### 8. Build Frontend Assets

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
```

## Running the Application

### Development Mode

Start both servers simultaneously:

```bash
composer run dev
```

This command will start:
- Laravel development server (http://localhost:8000)
- Queue worker for background jobs
- Vite development server for hot reloading

**Alternative: Start servers separately**

Terminal 1 - Laravel server:
```bash
php artisan serve
```

Terminal 2 - Frontend development:
```bash
npm run dev
```

### Access the Application

- **Main Application**: http://localhost:8000
- **Landing Page**: http://localhost:8000 (shows featured properties)
- **Dashboard**: http://localhost:8000/dashboard (requires login)

## Database Structure

The application includes only the basic Laravel authentication system:

### Authentication System
- **users**: User accounts and authentication
- **sessions**: User session management
- **password_reset_tokens**: Password reset functionality

### Sample Data Included

After running seeders, you'll have:
- **1 Test User** (email: test@example.com, password: password)

## API Endpoints

The application provides minimal API endpoints:

### Authenticated Endpoints
- `GET /api/user` - Get authenticated user data

## File Structure

```
satu-atap/
├── app/
│   ├── Http/Controllers/
│   │   ├── Auth/ (authentication controllers)
│   │   └── Settings/ (user settings controllers)
│   └── Models/
│       └── User.php
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   └── 0001_01_01_000002_create_jobs_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
├── resources/
│   └── js/
│       ├── components/
│       │   └── Landing/
│       │       ├── LandingPage.tsx
│       │       ├── components/
│       │       │   └── SatuAtapLogo.tsx
│       │       └── sections/
│       │           └── Header.tsx
│       └── pages/
│           ├── welcome.tsx
│           ├── dashboard.tsx
│           ├── auth/ (authentication pages)
│           └── settings/ (user settings pages)
└── routes/
    ├── web.php
    ├── api.php
    ├── auth.php
    └── settings.php
```

## Troubleshooting

### Installation Verification

Run the verification script to check your installation:

```bash
php verify-installation.php
```

This script will check:
- ✅ PHP version compatibility
- ✅ Laravel installation
- ✅ Environment configuration
- ✅ Database setup and sample data
- ✅ Storage symlink
- ✅ Downloaded images
- ✅ Node.js dependencies
- ✅ File permissions

### Common Issues

**1. Images not loading**
```bash
php artisan storage:link
```

**2. Database connection error**
- Check `.env` database configuration
- Ensure database exists and is accessible

**3. Permission errors**
```bash
chmod -R 775 storage bootstrap/cache
```

**4. Node modules issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

**5. Composer dependencies**
```bash
composer install --no-dev --optimize-autoloader
```

### Reset Everything

To start fresh:

```bash
php artisan migrate:fresh --seed
php artisan storage:link
npm run build
```

## Development Commands

```bash
# Database operations
php artisan migrate:fresh --seed    # Reset database with sample data
php artisan migrate:rollback        # Rollback last migration
php artisan db:seed                 # Run seeders only

# Cache operations
php artisan cache:clear             # Clear application cache
php artisan config:clear            # Clear config cache
php artisan route:clear             # Clear route cache

# Development tools
php artisan tinker                  # Interactive shell
php artisan route:list              # List all routes
php artisan make:model ModelName    # Create new model
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Production Deployment

### Environment Configuration

For production deployment, update your `.env` file:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database (use MySQL/PostgreSQL for production)
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password

# Cache & Session
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-email-password
```

### Production Build

```bash
# Install dependencies
composer install --no-dev --optimize-autoloader

# Build frontend assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Seed database (first time only)
php artisan db:seed --force
```

## Testing

### Run Tests

```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit

# Run with coverage
php artisan test --coverage
```

### Sample Test Data

The seeders create realistic test data:

- **Property 1**: "Kost Nyaman Dekat Kampus UI" - Mixed gender, Depok
- **Property 2**: "Kost Eksklusif Jakarta Selatan" - Male only, Kemang
- **Property 3**: "Kost Strategis Dekat Stasiun" - Female only, Central Jakarta
- **Property 4**: "Kost Budget Friendly" - Mixed gender, West Jakarta

Each property includes:
- Multiple high-quality images
- Complete location data with landmarks
- Realistic pricing (800K - 2.8M IDR/month)
- Amenities and facilities
- Owner contact information
- Rules and regulations

## Image Management

### How Images Work

1. **Seeding Process**: Images are automatically downloaded from Unsplash during seeding
2. **Local Storage**: Images are stored in `storage/app/public/kost-images/`
3. **Public Access**: Symlink allows access via `/storage/kost-images/`
4. **Fallback System**: If local image fails, falls back to original URL
5. **Metadata**: Each image includes alt text, order, and primary flag

### Adding New Images

To add images for new properties:

```php
// In your seeder or controller
KostImage::create([
    'property_id' => $propertyId,
    'filename' => 'custom-image.jpg',
    'original_name' => 'original-name.jpg',
    'path' => 'kost-images/custom-image.jpg',
    'url' => Storage::url('kost-images/custom-image.jpg'),
    'alt' => 'Image description',
    'is_primary' => true,
    'order' => 1,
    'mime_type' => 'image/jpeg',
    'size' => filesize($path),
]);
```

## Performance Optimization

### Database Optimization

```bash
# Index optimization
php artisan db:seed --class=DatabaseIndexSeeder

# Query optimization
php artisan model:show KostProperty
```

### Frontend Optimization

```bash
# Optimize images
npm run optimize-images

# Analyze bundle size
npm run analyze

# Preload critical resources
npm run preload
```

### Caching Strategy

The application uses multiple caching layers:

- **Database**: Query result caching
- **API**: Response caching for featured properties
- **Images**: Browser caching with proper headers
- **Static Assets**: Long-term caching with versioning

## Security Considerations

### Environment Security

- Never commit `.env` files
- Use strong database passwords
- Enable HTTPS in production
- Configure proper CORS settings

### Image Security

- Images are validated during upload
- File types are restricted
- Storage is isolated from web root
- Proper access controls implemented

## Monitoring & Logging

### Application Logs

```bash
# View logs
tail -f storage/logs/laravel.log

# Clear logs
php artisan log:clear
```

### Performance Monitoring

Monitor these key metrics:
- API response times
- Database query performance
- Image loading speeds
- User engagement metrics

## FAQ

**Q: How do I add more properties?**
A: Create new seeders or use the admin interface to add properties with images.

**Q: Can I use different image sources?**
A: Yes, modify the `KostImageSeeder` to use your preferred image source.

**Q: How do I backup the database?**
A: Use `php artisan backup:run` or your database's native backup tools.

**Q: Is the application mobile-friendly?**
A: Yes, it's fully responsive and optimized for mobile devices.

**Q: How do I customize the theme?**
A: Modify the Tailwind CSS configuration and component styles.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
