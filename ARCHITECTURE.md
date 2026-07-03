// ARCHITECTURE.md
# VoIPCall Architecture

## System Overview

VoIPCall is a modern, scalable full-stack application built with Next.js, React, WebRTC, and Twilio.

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (Browser)                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Next.js / React                                       │  │
│  │  - Landing Page                                        │  │
│  │  - Authentication                                      │  │
│  │  - Dashboard                                           │  │
│  │  - Call Interface                                      │  │
│  │  - Admin Panel                                         │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS
                          │
┌─────────────────────────────────────────────────────────────┐
│                    CDN (Cloudflare)                          │
│  - Static file caching                                      │
│  - DDoS protection                                          │
│  - Edge locations worldwide                                │
└─────────────────────────────────────────────────────────────┘
                          │
                          │
┌─────────────────────────────────────────────────────────────┐
│              Backend (Next.js API Routes)                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ /api/auth        - Authentication & Sessions           │  │
│  │ /api/calls       - Call management                      │  │
│  │ /api/credits     - Credit system                        │  │
│  │ /api/admin       - Admin operations                     │  │
│  │ /api/twilio      - Twilio webhooks                      │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
    PostgreSQL            Redis              Twilio
    ┌─────────┐          ┌─────┐         ┌──────────────┐
    │ Database│          │Cache│         │ Voice API    │
    │ - Users │          │     │         │ - Calls      │
    │ - Calls │          └─────┘         │ - SMS        │
    │ - Creds │                          └──────────────┘
    │ - Trans │
    └─────────┘
```

## Core Modules

### Authentication Module
- JWT token generation and validation
- Password hashing with bcrypt
- Session management
- OAuth integration (Google)
- Device fingerprinting

### Call Management Module
- Call initiation and termination
- Real-time status updates
- Duration tracking
- Recording support
- Quality monitoring

### Credit System Module
- Balance management
- Transaction tracking
- Daily bonus distribution
- Rate limiting
- Fraud detection

### Admin Module
- User management
- Analytics dashboard
- Abuse monitoring
- Report management
- System health monitoring

## Data Flow

### Call Initiation Flow
```
User Input → Validation → Credit Check → Create Call Record
    ↓
Twilio API Call → WebRTC Connection → Real-time Updates
    ↓
Call Recording → Duration Tracking → Credit Deduction
    ↓
Transaction Log → Analytics Update → Call Complete
```

### Authentication Flow
```
User Credentials → Hash & Compare → JWT Generation → Session Store
    ↓
Client Token Store → API Requests (Bearer Token) → Token Validation
    ↓
User Context → Protected Routes → Secure Operations
```

## API Architecture

### Request/Response Pattern
```
GET /api/resource
├── Authorization Check (JWT)
├── Rate Limit Check
├── Business Logic
├── Database Query
└── Response (JSON)

Response Format:
{
  "success": boolean,
  "message": string (optional),
  "data": T (optional),
  "error": string (optional)
}
```

### Error Handling
- 400: Bad Request (validation error)
- 401: Unauthorized (auth failed)
- 403: Forbidden (permission denied)
- 404: Not Found (resource missing)
- 429: Rate Limited (too many requests)
- 500: Internal Server Error

## Database Schema

### Key Tables
- **Users** - User accounts and profiles
- **Credits** - Credit balance management
- **Calls** - Call records and history
- **Transactions** - Financial transactions
- **Devices** - Trusted devices
- **Sessions** - Active sessions
- **Reports** - User reports
- **Analytics** - Platform metrics

### Relationships
```
User (1) ──→ (1) Credits
User (1) ──→ (M) Calls
User (1) ──→ (M) Transactions
User (1) ──→ (M) Devices
User (1) ──→ (M) Sessions
User (1) ──→ (M) Reports
```

## Caching Strategy

### Redis Cache Layers
- **Session Cache** - Active user sessions
- **Rate Limit Cache** - API request counts
- **User Cache** - Frequently accessed user data
- **Credit Cache** - Real-time credit balance
- **Call Cache** - Recent call data

### Cache Invalidation
- Time-based expiry (TTL)
- Event-based invalidation
- Manual cache clearing

## Security Architecture

### Authentication & Authorization
- JWT tokens with expiration
- Refresh token rotation
- Role-based access control (RBAC)
- Scope-based permissions

### Data Protection
- TLS/HTTPS encryption in transit
- Database encryption at rest
- Sensitive data masking
- PII protection

### API Security
- Rate limiting per IP/user
- CORS policy enforcement
- CSRF token validation
- Input sanitization
- Output encoding

### Monitoring & Logging
- Request logging
- Error tracking
- Anomaly detection
- Audit trails

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Session store in Redis
- Database connection pooling
- Load balancing

### Vertical Scaling
- Efficient queries with indexes
- Caching strategies
- Connection pooling
- Memory optimization

### Database Optimization
- Query indexing
- Query optimization
- Slow query monitoring
- Replication setup

## Deployment Architecture

### Development
```
Local Machine
├── Next.js Dev Server (port 3000)
├── PostgreSQL (local)
└── Redis (local)
```

### Staging
```
Staging Environment
├── Next.js on Railway
├── PostgreSQL on Railway
└── Redis on Railway
```

### Production
```
Production Environment
├── Frontend on Vercel
├── Backend on Railway
├── PostgreSQL on Railway (with backups)
├── Redis on Railway
└── CDN on Cloudflare
```

## Performance Metrics

### Target KPIs
- Page Load: < 2s
- API Response: < 500ms
- Database Query: < 100ms
- Cache Hit Rate: > 80%
- Uptime: 99.9%

### Monitoring
- Application Performance Monitoring (APM)
- Error Rate Tracking
- Database Performance
- User Experience Metrics

## Future Architecture Improvements

- [ ] GraphQL API layer
- [ ] Microservices architecture
- [ ] Event-driven architecture
- [ ] Machine learning for fraud detection
- [ ] Real-time analytics pipeline
- [ ] Mobile app architecture
