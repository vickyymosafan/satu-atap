#!/bin/bash

# Satu Atap - Automated Setup Script
# This script automates the installation process for Unix-like systems

set -e  # Exit on any error

echo "🏠 Satu Atap - Automated Setup"
echo "============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if required tools are installed
print_status "Checking prerequisites..."

# Check PHP
if command -v php &> /dev/null; then
    PHP_VERSION=$(php -r "echo PHP_VERSION;")
    if php -r "exit(version_compare(PHP_VERSION, '8.2.0', '<') ? 1 : 0);"; then
        print_error "PHP 8.2+ required. Current version: $PHP_VERSION"
        exit 1
    else
        print_success "PHP version: $PHP_VERSION"
    fi
else
    print_error "PHP not found. Please install PHP 8.2+"
    exit 1
fi

# Check Composer
if command -v composer &> /dev/null; then
    print_success "Composer found"
else
    print_error "Composer not found. Please install Composer"
    exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js version: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_success "npm version: $NPM_VERSION"
else
    print_error "npm not found. Please install npm"
    exit 1
fi

echo ""

# Install PHP dependencies
print_status "Installing PHP dependencies..."
if composer install; then
    print_success "PHP dependencies installed"
else
    print_error "Failed to install PHP dependencies"
    exit 1
fi

echo ""

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
if npm install; then
    print_success "Node.js dependencies installed"
else
    print_error "Failed to install Node.js dependencies"
    exit 1
fi

echo ""

# Setup environment
print_status "Setting up environment..."
if [ ! -f .env ]; then
    if cp .env.example .env; then
        print_success "Environment file created"
    else
        print_error "Failed to create environment file"
        exit 1
    fi
else
    print_warning "Environment file already exists"
fi

# Generate application key
print_status "Generating application key..."
if php artisan key:generate; then
    print_success "Application key generated"
else
    print_error "Failed to generate application key"
    exit 1
fi

echo ""

# Setup database
print_status "Setting up database..."
if [ ! -f database/database.sqlite ]; then
    if touch database/database.sqlite; then
        print_success "SQLite database file created"
    else
        print_error "Failed to create SQLite database file"
        exit 1
    fi
else
    print_warning "SQLite database file already exists"
fi

# Run migrations and seeders
print_status "Running migrations and seeders (this may take a few minutes to download images)..."
if php artisan migrate:fresh --seed; then
    print_success "Database migrated and seeded with sample data"
else
    print_error "Failed to migrate and seed database"
    exit 1
fi

echo ""

# Create storage symlink
print_status "Creating storage symlink..."
if php artisan storage:link; then
    print_success "Storage symlink created"
else
    print_warning "Storage symlink may already exist"
fi

echo ""

# Set permissions
print_status "Setting file permissions..."
if chmod -R 775 storage bootstrap/cache; then
    print_success "File permissions set"
else
    print_warning "Could not set file permissions. You may need to run: sudo chmod -R 775 storage bootstrap/cache"
fi

echo ""

# Verify installation
print_status "Verifying installation..."
if php verify-installation.php; then
    echo ""
    print_success "Setup completed successfully!"
    echo ""
    echo "🎉 Your Satu Atap installation is ready!"
    echo ""
    echo "Next steps:"
    echo "1. Start the development server:"
    echo "   ${BLUE}composer run dev${NC}"
    echo ""
    echo "2. Or start servers separately:"
    echo "   Terminal 1: ${BLUE}php artisan serve${NC}"
    echo "   Terminal 2: ${BLUE}npm run dev${NC}"
    echo ""
    echo "3. Visit: ${BLUE}http://localhost:8000${NC}"
    echo ""
    echo "4. Login with:"
    echo "   Email: ${BLUE}test@example.com${NC}"
    echo "   Password: ${BLUE}password${NC}"
    echo ""
    echo "📚 For more information, see README.md"
else
    print_error "Installation verification failed. Please check the output above."
    exit 1
fi
