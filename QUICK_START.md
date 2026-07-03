// QUICK_START.md
# VoIPCall Quick Start Guide

Welcome to VoIPCall! This guide will get you up and running in minutes.

## 📋 What's Included

This is a **production-ready, full-stack VoIP calling application** with:

✅ Modern Landing Page  
✅ User Authentication (Email + Google OAuth)  
✅ Call Dashboard with Dial Pad  
✅ Browser-to-Phone & Browser-to-Browser Calls  
✅ Credit System with Daily Bonuses  
✅ Call History & Analytics  
✅ Admin Dashboard  
✅ User Settings & Profile Management  
✅ Dark Mode UI with Glassmorphism  
✅ Responsive Design  
✅ Security Features (JWT, Encryption, Rate Limiting)  
✅ Database & Caching  
✅ Docker Support  
✅ Deployment Ready  

## 🚀 5-Minute Setup

### 1. Install Dependencies

```bash
cd "d:/project's/projetc 1"
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
```
DATABASE_URL="postgresql://user:password@localhost:5432/voip_db"
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
```

### 3. Setup Database

```bash
# Install PostgreSQL and start it
# Then run migrations:
npm run db:push

# Seed test data:
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 5. Test Credentials

**Admin Account:**
- Email: `admin@voipcall.com`
- Password: `change-me-in-production`

**Test Users:**
- user1@test.com → user5@test.com
- Password: `test123456`

## 📁 Project Structure

```
├── app/                      # Next.js pages and routes
│   ├── api/                 # Backend API endpoints
│   ├── dashboard/           # User dashboard
│   ├── admin/               # Admin dashboard
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── DialPad.tsx
│   ├── CallInterface.tsx
│   └── CreditCard.tsx
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useCall.ts
│   └── useCredits.ts
├── lib/                     # Utility libraries
│   ├── auth.ts              # JWT & password handling
│   ├── db.ts                # Database client
│   ├── redis.ts             # Caching
│   └── twilio.ts            # VoIP integration
├── prisma/
│   └── schema.prisma        # Database schema
├── utils/
│   ├── constants.ts         # App constants
│   ├── helpers.ts           # Helper functions
│   └── validators.ts        # Input validation
└── middleware/              # Express/Next middleware
```

## 🔑 Key Features Explained

### 🔐 Authentication
- Email/password signup and login
- Google OAuth integration
- JWT-based sessions
- Secure password hashing with bcrypt
- Device fingerprinting

### 📞 Calling System
- Initiate calls via dial pad
- Real-time call status
- Call timer and duration
- Mute/unmute controls
- Speaker toggle
- Twilio integration for phone calls
- WebRTC for browser-to-browser

### 💳 Credit System
- Users get 5 free credits on signup
- Daily bonus (5 credits/day)
- Per-minute pricing by country
- Real-time credit tracking
- Transaction history

### 📊 Dashboard
- Credit balance display
- Call history
- User stats
- Settings management
- Profile management

### ⚙️ Admin Panel
- User management
- Platform analytics
- Call statistics
- Revenue tracking

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     - Create account
POST   /api/auth/login        - Login
GET    /api/auth/me           - Get current user
```

### Calls
```
POST   /api/calls/initiate    - Start a call
POST   /api/calls/[id]/end    - End a call
GET    /api/calls/history     - Get call history
```

### Credits
```
GET    /api/credits           - Get balance
POST   /api/credits/daily-bonus - Claim daily bonus
```

### Admin
```
GET    /api/admin/users       - List users
GET    /api/admin/analytics   - Platform analytics
```

## 🛠️ Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/voip_db

# JWT
JWT_SECRET=your-super-secret-key

# Twilio
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Admin
ADMIN_EMAIL=admin@voipcall.com
```

## 📦 Dependencies

### Frontend
- Next.js 15 - React framework
- TailwindCSS - Styling
- Framer Motion - Animations
- Lucide Icons - UI icons

### Backend
- Express.js - API
- Prisma - Database ORM
- Redis - Caching
- Twilio - VoIP API

### Database
- PostgreSQL - Primary DB
- Redis - Cache layer

## 🚢 Deployment

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Railway (Backend + DB)
```bash
npm install -g railway
railway login
railway init
railway up
```

### Docker
```bash
docker build -t voip-app .
docker run -p 3000:3000 voip-app
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 📚 Documentation

- [README.md](README.md) - Full documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [SECURITY.md](SECURITY.md) - Security policies
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guide

## 🆘 Common Issues

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U user -d voip_db

# Reset database
npm run db:push
npm run db:seed
```

### Twilio Integration Not Working
- Verify TWILIO_ACCOUNT_SID in .env.local
- Check TWILIO_AUTH_TOKEN is correct
- Ensure phone number is verified
- Check Twilio account has credits

## 🎯 Next Steps

1. **Customize Branding**
   - Update logo and colors in tailwind.config.ts
   - Modify landing page content
   - Update brand names

2. **Add Payment System**
   - Integrate Stripe for premium credits
   - Setup subscription plans
   - Configure payment webhooks

3. **Enhance Features**
   - Add video calling
   - Enable call recording
   - Implement transcription
   - Add SMS support

4. **Deploy to Production**
   - Setup custom domain
   - Configure SSL certificates
   - Setup monitoring and logging
   - Enable backups

## 📞 Support

- Email: support@voipcall.com
- Issues: GitHub Issues
- Docs: See documentation files

## 📝 License

MIT License - See LICENSE file

---

**Ready to build? Start coding! 🚀**

Questions? Check [README.md](README.md) or open an issue on GitHub.
