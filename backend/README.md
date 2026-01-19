# Twindix Admin API

Laravel 11-based REST API for Twindix Admin Panel Access Control System

## Features

✅ **Authentication** - Sanctum-based API authentication with login/logout
✅ **Permissions Management** - Role-based & SubType-based permissions  
✅ **Regions Management** - Geographic regions with country assignments
✅ **User Types** - User types and subtypes with permissions
✅ **Super Admins Management** - Hierarchical admin management with pause/resume
✅ **Activity Logging** - Comprehensive audit trail for all operations
✅ **API Documentation** - Swagger/OpenAPI auto-generated docs

## Tech Stack

- **Laravel 11** - PHP Framework
- **Laravel Sanctum** - API Authentication
- **Spatie Laravel Permission** - RBAC system
- **Spatie Laravel Activity Log** - Activity tracking
- **L5-Swagger** - API documentation
- **MySQL/SQLite** - Database

## Installation

1. **Install Dependencies**
```bash
composer install
```

2. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Configure Database**
Edit `.env` file:
```
DB_CONNECTION=sqlite
# Or for MySQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=twindix_admin
# DB_USERNAME=root
# DB_PASSWORD=
```

4. **Run Migrations & Seed**
```bash
php artisan migrate:fresh --seed
```

5. **Start Server**
```bash
php artisan serve
```

## API Documentation

Access Swagger UI at: `http://localhost:8000/api/documentation`

Generate/regenerate docs:
```bash
php artisan l5-swagger:generate
```

## Test Credentials

**Owner Account:**
- Email: owner@twindix.com
- Password: password123

**Super Admin Account:**
- Email: superadmin@twindix.com  
- Password: password123

**Admin Account:**
- Email: admin@twindix.com
- Password: password123

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout (authenticated)
- `GET /api/auth/me` - Get current user (authenticated)

### Permissions
- `GET /api/permissions` - List permissions by role/type/subtype
- `GET /api/permissions/groups` - Get grouped permissions
- `PUT /api/permissions/assign` - Assign permissions

### Regions
- `GET /api/regions` - List all regions
- `POST /api/regions` - Create region
- `GET /api/regions/{id}` - Get single region
- `PUT /api/regions/{id}` - Update region
- `DELETE /api/regions/{id}` - Delete region
- `GET /api/countries` - List all countries

### User Types
- `GET /api/user-types` - List types with subtypes
- `POST /api/user-types` - Create type
- `PUT /api/user-types/{id}` - Update type
- `DELETE /api/user-types/{id}` - Delete type
- `POST /api/user-types/{id}/sub-types` - Create subtype
- `PUT /api/user-sub-types/{id}` - Update subtype
- `DELETE /api/user-sub-types/{id}` - Delete subtype

### Super Admins & Admins
- `GET /api/super-admins` - List super admins
- `POST /api/super-admins` - Create super admin
- `GET /api/super-admins/{id}` - Get super admin
- `PUT /api/super-admins/{id}` - Update super admin
- `DELETE /api/super-admins/{id}` - Delete super admin
- `POST /api/super-admins/{id}/pause` - Pause account
- `POST /api/super-admins/{id}/resume` - Resume account
- `POST /api/admins` - Create admin under super admin

## Database Schema

### Core Tables
- **users** - Admin users with roles, types, regions
- **permissions** - System permissions
- **roles** - User roles (Owner, Super Admin, Admin)
- **user_types** - User type categories
- **user_sub_types** - User subcategories
- **regions** - Geographic regions
- **countries** - World countries
- **activity_log** - Audit trail

### Relationships
- Users belong to Regions, Types, SubTypes
- Users can manage other Users (hierarchical)
- Regions contain multiple Countries
- SubTypes have Permissions
- Roles have Permissions

## Activity Logging

All CRUD operations are automatically logged with:
- Who performed the action (causer)
- What was changed (subject)
- Old and new values (properties)
- Timestamp

View logs via activity_log table or implement viewing endpoints.

## Git Workflow

### Commit Conventions
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `config:` - Configuration changes
- `refactor:` - Code refactoring
- `test:` - Tests

### Branch Strategy
- `main` - Production code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes

## Development

**Code Formatting:**
```bash
./vendor/bin/pint
```

**Run Tests:**
```bash
php artisan test
```

**Clear Cache:**
```bash
php artisan optimize:clear
```

## Security

- All API routes require authentication (except login)
- Permissions checked via authorization gates
- Paused users cannot access API
- Activity log tracks all sensitive operations

## Contributing

1. Create feature branch from `develop`
2. Implement with tests
3. Follow commit conventions
4. Submit for review

## License

Proprietary - Twindix Platform

## Support

For issues or questions, contact the development team.
