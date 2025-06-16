<?php

/**
 * Installation Verification Script for Satu Atap
 * 
 * Run this script to verify that your installation is working correctly.
 * Usage: php verify-installation.php
 */

echo "🏠 Satu Atap - Installation Verification\n";
echo "=====================================\n\n";

$errors = [];
$warnings = [];
$success = [];

// Check PHP version
echo "📋 Checking PHP version...\n";
if (version_compare(PHP_VERSION, '8.2.0', '>=')) {
    $success[] = "✅ PHP version: " . PHP_VERSION;
} else {
    $errors[] = "❌ PHP version " . PHP_VERSION . " is too old. Requires PHP 8.2+";
}

// Check if Laravel is installed
echo "📋 Checking Laravel installation...\n";
if (file_exists('artisan')) {
    $success[] = "✅ Laravel artisan found";
} else {
    $errors[] = "❌ Laravel artisan not found. Run 'composer install'";
}

// Check environment file
echo "📋 Checking environment configuration...\n";
if (file_exists('.env')) {
    $success[] = "✅ Environment file (.env) exists";
    
    // Check if APP_KEY is set
    $envContent = file_get_contents('.env');
    if (strpos($envContent, 'APP_KEY=base64:') !== false) {
        $success[] = "✅ Application key is generated";
    } else {
        $warnings[] = "⚠️  Application key not generated. Run 'php artisan key:generate'";
    }
} else {
    $errors[] = "❌ Environment file (.env) not found. Copy from .env.example";
}

// Check database
echo "📋 Checking database...\n";
if (file_exists('database/database.sqlite')) {
    $success[] = "✅ SQLite database file exists";
    
    // Check if tables exist
    try {
        $pdo = new PDO('sqlite:database/database.sqlite');
        $result = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='kost_properties'");
        if ($result && $result->fetch()) {
            $success[] = "✅ Database tables exist";
            
            // Check if data exists
            $result = $pdo->query("SELECT COUNT(*) as count FROM kost_properties");
            $count = $result->fetch()['count'];
            if ($count > 0) {
                $success[] = "✅ Sample data loaded ($count properties)";
            } else {
                $warnings[] = "⚠️  No sample data found. Run 'php artisan db:seed'";
            }
        } else {
            $warnings[] = "⚠️  Database tables not found. Run 'php artisan migrate'";
        }
    } catch (Exception $e) {
        $warnings[] = "⚠️  Could not connect to database: " . $e->getMessage();
    }
} else {
    $warnings[] = "⚠️  SQLite database file not found. Run 'touch database/database.sqlite'";
}

// Check storage symlink
echo "📋 Checking storage symlink...\n";
if (is_link('public/storage')) {
    $success[] = "✅ Storage symlink exists";
} else {
    $warnings[] = "⚠️  Storage symlink not found. Run 'php artisan storage:link'";
}

// Check if images are downloaded
echo "📋 Checking downloaded images...\n";
$imageDir = 'storage/app/public/kost-images';
if (is_dir($imageDir)) {
    $imageFiles = glob($imageDir . '/*.jpg');
    $imageCount = count($imageFiles);
    if ($imageCount >= 8) {
        $success[] = "✅ Property images downloaded ($imageCount images)";
    } else {
        $warnings[] = "⚠️  Only $imageCount images found. Expected 8. Run 'php artisan db:seed --class=KostImageSeeder'";
    }
} else {
    $warnings[] = "⚠️  Image directory not found. Run 'php artisan migrate:fresh --seed'";
}

// Check Node.js dependencies
echo "📋 Checking Node.js dependencies...\n";
if (is_dir('node_modules')) {
    $success[] = "✅ Node.js dependencies installed";
    
    // Check if build files exist
    if (is_dir('public/build')) {
        $success[] = "✅ Frontend assets built";
    } else {
        $warnings[] = "⚠️  Frontend assets not built. Run 'npm run build' or 'npm run dev'";
    }
} else {
    $warnings[] = "⚠️  Node.js dependencies not installed. Run 'npm install'";
}

// Check composer dependencies
echo "📋 Checking Composer dependencies...\n";
if (is_dir('vendor')) {
    $success[] = "✅ Composer dependencies installed";
} else {
    $errors[] = "❌ Composer dependencies not installed. Run 'composer install'";
}

// Check file permissions
echo "📋 Checking file permissions...\n";
$writableDirs = ['storage', 'bootstrap/cache'];
foreach ($writableDirs as $dir) {
    if (is_writable($dir)) {
        $success[] = "✅ $dir is writable";
    } else {
        $warnings[] = "⚠️  $dir is not writable. Run 'chmod -R 775 $dir'";
    }
}

// Display results
echo "\n🎯 VERIFICATION RESULTS\n";
echo "======================\n\n";

if (!empty($success)) {
    echo "✅ SUCCESS:\n";
    foreach ($success as $item) {
        echo "   $item\n";
    }
    echo "\n";
}

if (!empty($warnings)) {
    echo "⚠️  WARNINGS:\n";
    foreach ($warnings as $item) {
        echo "   $item\n";
    }
    echo "\n";
}

if (!empty($errors)) {
    echo "❌ ERRORS:\n";
    foreach ($errors as $item) {
        echo "   $item\n";
    }
    echo "\n";
}

// Final status
if (empty($errors)) {
    if (empty($warnings)) {
        echo "🎉 INSTALLATION COMPLETE!\n";
        echo "Your Satu Atap installation is ready to use.\n\n";
        echo "Next steps:\n";
        echo "1. Start the development server: composer run dev\n";
        echo "2. Visit: http://localhost:8000\n";
        echo "3. Login with: test@example.com / password\n\n";
    } else {
        echo "✅ INSTALLATION MOSTLY COMPLETE!\n";
        echo "Your installation is functional but has some warnings.\n";
        echo "Address the warnings above for the best experience.\n\n";
    }
} else {
    echo "❌ INSTALLATION INCOMPLETE!\n";
    echo "Please fix the errors above before proceeding.\n\n";
    exit(1);
}

// API Test
echo "🔗 Testing API endpoint...\n";
if (function_exists('curl_init')) {
    // This would require the server to be running
    echo "   To test the API, start the server and visit:\n";
    echo "   http://localhost:8000/api/kosts/featured\n\n";
} else {
    echo "   cURL not available for API testing\n\n";
}

echo "📚 For more information, see README.md\n";
echo "🐛 If you encounter issues, check the troubleshooting section\n\n";

exit(0);
