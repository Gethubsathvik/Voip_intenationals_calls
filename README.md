# VoIPCall - Modern Full-Stack VoIP Calling Website

A premium, production-ready browser-based VoIP calling platform built with Next.js, React, WebRTC, and Twilio. Make free calls to mobile numbers and landlines worldwide with crystal-clear audio.

## ✨ Features

### Core Calling
- ✅ Browser-to-phone calls using Twilio Voice API
- ✅ Browser-to-browser calls with WebRTC
- ✅ Crystal clear HD audio quality
- ✅ Real-time call status updates
- ✅ Call timer and duration tracking
- ✅ Mute/unmute functionality
- ✅ Speaker toggle
- ✅ Call recording support

### User Management
- ✅ Email/password authentication
- ✅ Google OAuth integration
- ✅ JWT-based sessions
- ✅ Secure password hashing
- ✅ Device fingerprinting
- ✅ Multi-device support

### Credit System
- ✅ 5 free credits for new users
- ✅ Daily bonus credits (5 credits/day)
- ✅ Per-minute call costs by country
- ✅ Real-time credit deduction
- ✅ Credit transaction history
- ✅ Anti-spam protection
- ✅ Rate limiting

### Dashboard
- ✅ Modern, responsive UI
- ✅ Live credit balance
- ✅ Dial pad interface
- ✅ Country selector
- ✅ Call history
- ✅ User settings
- ✅ Account management

### Admin Panel
- ✅ User management
- ✅ Platform analytics
- ✅ Call statistics
- ✅ Revenue tracking
- ✅ User reports
- ✅ Abuse monitoring

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 15 (React 19)
- TypeScript
- TailwindCSS
- Framer Motion
- Shadcn UI components
- Lucide Icons

**Backend:**
- Node.js / Next.js API routes
- Express.js (optional)
- PostgreSQL
- Prisma ORM
- Redis (caching & rate limiting)

**VoIP:**
- Twilio Voice API
- WebRTC (peer-to-peer)
- SIP protocol

**Deployment:**
- Vercel (Frontend)
- Railway (Backend/Database)
- Cloudflare (CDN)

### Project Structure

```
voip-calling-app/
├── app/
│   ├── api/
│   │   ├── auth/              # Authentication endpoints
│   │   ├── calls/             # Call management
│   │   ├── credits/           # Credit system
│   │   ├── admin/             # Admin endpoints
│   │   └── twilio/            # Twilio webhooks
│   ├── dashboard/             # User dashboard pages
│   ├── admin/                 # Admin pages
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/                # React components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── DialPad.tsx
│   ├── CallInterface.tsx
│   └── CreditCard.tsx
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts
│   ├── useCall.ts
│   └── useCredits.ts
├── lib/
│   ├── auth.ts                # Authentication utilities
│   ├── db.ts                  # Database client
│   ├── redis.ts               # Redis client
│   └── twilio.ts              # Twilio integration
├── middleware/                # Next.js middleware
│   ├── auth.ts
│   └── rateLimit.ts
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── types/
│   └── index.ts               # TypeScript types
├── utils/
│   ├── constants.ts           # App constants
│   └── helpers.ts             # Utility functions
├── public/                    # Static files
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- PostgreSQL 14+
- Redis (optional, for production)
- Twilio account with credits

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/voip-calling-app.git
cd voip-calling-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/voip_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Twilio
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Redis
REDIS_URL="redis://localhost:6379"

# Admin
ADMIN_EMAIL="admin@voipcall.com"
ADMIN_PASSWORD="change-me-in-production"
```

4. **Setup database:**

```bash
# Run migrations
npm run db:push

# Seed test data
npm run db:seed
```

5. **Start development server:**

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📊 Database Schema

The application uses Prisma ORM with PostgreSQL. Key models:

- **User** - User accounts and profiles
- **Credits** - Credit balance and daily bonuses
- **Call** - Call records and history
- **Transaction** - Credit transactions
- **Device** - Trusted devices
- **Report** - User reports and abuse monitoring
- **Session** - User sessions
- **Analytics** - Platform metrics

See [prisma/schema.prisma](prisma/schema.prisma) for full schema.

## 🔐 Security Features

- HTTPS only in production
- JWT-based authentication
- Password hashing with bcrypt
- Device fingerprinting
- API rate limiting
- CORS protection
- Input sanitization
- SQL injection prevention (Prisma)
- XSS protection
- CSRF tokens

## 💳 Pricing (Countries)

Calls are charged per minute:

| Country | Rate |
|---------|------|
| USA | $0.01/min |
| UK | $0.015/min |
| India | $0.005/min |
| Japan | $0.025/min |
| Australia | $0.02/min |

Users get 5 free credits daily + 5 free credits on signup.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Calls
- `POST /api/calls/initiate` - Start a call
- `POST /api/calls/[id]/end` - End a call
- `GET /api/calls/history` - Call history

### Credits
- `GET /api/credits` - Get credit balance
- `POST /api/credits/daily-bonus` - Claim daily bonus

### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/analytics` - Platform analytics

## 🚢 Deployment

### Vercel (Frontend)

```bash
npm install -g vercel
vercel
```

### Railway (Backend + Database)

1. Create Railway account at railway.app
2. Create PostgreSQL and Redis services
3. Deploy backend
4. Set environment variables

### Environment Variables (Production)

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=<generate-strong-secret>
NEXTAUTH_URL=https://yourdomain.com
```

## 📈 Analytics & Monitoring

The admin dashboard provides:

- Total users and active users
- Call statistics and trends
- Revenue tracking
- User engagement metrics
- Top countries by call volume
- Platform health metrics

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

## 📚 API Documentation

Full API documentation available at `/api/docs` (Swagger UI)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 🆘 Support

For support, email support@voipcall.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Video calling
- [ ] Conference calling
- [ ] Call recording & transcription
- [ ] AI voice assistant
- [ ] SMS messaging
- [ ] Mobile app (React Native)
- [ ] Premium subscription tiers
- [ ] International payment processing
- [ ] Real-time analytics dashboard
- [ ] Multi-language support

## 🙏 Acknowledgments

- Twilio for VoIP APIs
- Next.js team for the framework
- Tailwind CSS for styling
- All open-source contributors

---

**Made with ❤️ by the VoIPCall Team**

For more information, visit [voipcall.com](https://voipcall.com)
