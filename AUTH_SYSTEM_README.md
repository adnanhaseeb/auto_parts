# Auto Parts Store - Authentication System

## 🔐 Complete Authentication System

This application now includes a comprehensive authentication system with role-based access control.

## Features

### Authentication
- ✅ User Registration (Sign Up)
- ✅ User Login (Sign In)
- ✅ Secure Password Hashing (bcrypt)
- ✅ JWT Token Management
- ✅ Session Management
- ✅ Password Visibility Toggle
- ✅ Form Validation

### Authorization
- ✅ Role-Based Access Control (RBAC)
- ✅ User Roles: `USER` and `ADMIN`
- ✅ Protected Routes (Middleware)
- ✅ Admin Panel Access Control
- ✅ Profile Page Protection

### User Interface
- ✅ Modern Login/Signup Forms
- ✅ User Menu with Role Detection
- ✅ Admin Panel Dashboard
- ✅ User Profile Page
- ✅ Responsive Design

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file with:
```bash
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key
JWT_SECRET=your-jwt-secret-key
```

### 3. Seed Admin User
Visit: http://localhost:3000/api/auth/seed-admin
This creates an admin user with:
- Email: `admin@autoparts.com`
- Password: `admin123`

### 4. Start Development Server
```bash
npm run dev
```

## 🔑 Demo Credentials

### Admin Account
- **Email**: admin@autoparts.com
- **Password**: admin123
- **Role**: ADMIN
- **Access**: Full admin panel access

### Test User Account
You can create a regular user account through the signup form at `/auth/signup`

## 📱 Authentication Pages

### Login Page
- **URL**: `/auth/login`
- **Features**: 
  - Email/Password authentication
  - Password visibility toggle
  - Remember me functionality
  - Role-based redirects (Admin → /admin, User → /)
  - Demo credentials display
  - "Forgot password" link (placeholder)

### Signup Page
- **URL**: `/auth/signup`
- **Features**: 
  - Full name, email, password registration
  - Password confirmation
  - Automatic login after signup
  - Form validation
  - Redirect to store after registration

## 🛡️ Protected Routes

### Admin Routes (`/admin/*`)
- **Access**: ADMIN role only
- **Middleware**: Automatic redirect to login if unauthorized
- **Features**: 
  - Admin dashboard
  - User management (planned)
  - Product management (planned)
  - Sales analytics (planned)

### User Profile (`/profile`)
- **Access**: Any authenticated user
- **Features**:
  - View account information
  - Edit profile (planned)
  - Order history (planned)
  - Wishlist management (planned)

## 🎯 User Experience

### Header Component
- **Logged Out**: Shows "Sign In" and "Sign Up" buttons
- **Logged In**: Shows user dropdown with:
  - User name and email
  - Profile link
  - Admin panel link (if admin)
  - Settings link
  - Logout option

### Role-Based Features
- **Regular Users**: Can browse products, manage profile, place orders
- **Admin Users**: All user features + admin panel access + user management

## 🔧 Technical Implementation

### Authentication Stack
- **NextAuth.js**: Session management and authentication
- **MongoDB**: User data storage
- **Mongoose**: ODM for user model
- **bcryptjs**: Password hashing
- **JWT**: Token-based authentication

### Security Features
- ✅ Password hashing with salt
- ✅ CSRF protection (NextAuth built-in)
- ✅ Session token encryption
- ✅ Secure cookie settings
- ✅ Route protection middleware
- ✅ Role validation on server-side

### Database Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  role: Enum ['USER', 'ADMIN'] (default: 'USER'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Components

### Forms
- Modern card-based design
- Loading states and animations
- Error handling with toast notifications
- Responsive layout
- Accessibility features

### Navigation
- Role-based menu items
- User avatar and dropdown
- Mobile-responsive design
- Authentication state awareness

## 📝 Next Steps

### Planned Features
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] OAuth providers (Google, GitHub)
- [ ] User profile editing
- [ ] Account deletion
- [ ] Admin user management
- [ ] Audit logs
- [ ] Rate limiting
- [ ] Password strength requirements

### Security Enhancements
- [ ] Account lockout after failed attempts
- [ ] Password history tracking
- [ ] Session timeout
- [ ] IP-based restrictions
- [ ] Security headers
- [ ] Input sanitization

## 🚨 Important Notes

1. **Change Default Credentials**: Update the admin credentials in production
2. **Environment Variables**: Never commit `.env.local` to version control
3. **HTTPS**: Use HTTPS in production for secure cookie transmission
4. **Secret Keys**: Generate strong, unique secret keys for production
5. **Database Security**: Ensure MongoDB is properly secured with authentication

## 📞 Support

If you encounter any issues with the authentication system, please check:
1. Environment variables are properly set
2. MongoDB connection is working
3. Admin user is seeded
4. NextAuth configuration is correct

For development help, refer to:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Setup Guide](https://docs.mongodb.com/)
- [Next.js Authentication Guide](https://nextjs.org/docs/authentication)