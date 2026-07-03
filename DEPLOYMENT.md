// DEPLOYMENT.md
# Deployment Guide

## Overview

This guide covers deployment of VoIPCall to production environments.

## Prerequisites

- Node.js 18+
- Docker (optional)
- PostgreSQL database
- Redis instance
- Twilio account

## Deployment Options

### 1. Vercel (Recommended for Frontend)

**Advantages:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions

**Steps:**

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### 2. Railway (Backend + Database)

**Setup:**

1. Create Railway account
2. Create PostgreSQL service
3. Create Redis service
4. Deploy application

```bash
npm install -g railway
railway login
railway init
railway up
```

### 3. Docker & Kubernetes

**Build Docker image:**

```bash
docker build -t voip-calling-app .
docker tag voip-calling-app:latest your-registry/voip-calling-app:latest
docker push your-registry/voip-calling-app:latest
```

**Deploy with Docker Compose:**

```bash
docker-compose -f docker-compose.yml up -d
```

### 4. Traditional VPS (AWS EC2, DigitalOcean, etc.)

**Steps:**

1. SSH into server
2. Install Node.js and PostgreSQL
3. Clone repository
4. Install dependencies
5. Setup environment variables
6. Build application
7. Start with PM2

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "voip-app" -- start
pm2 save
pm2 startup
```

## Environment Variables

```env
# Production
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/voip_db

# Redis
REDIS_URL=redis://host:6379

# JWT
JWT_SECRET=generate-strong-random-string
NEXTAUTH_SECRET=generate-strong-random-string
NEXTAUTH_URL=https://yourdomain.com

# OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Twilio
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890

# Admin
ADMIN_EMAIL=admin@yourdomain.com
```

## Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Seed data
npx prisma db seed
```

## SSL/HTTPS Setup

### Vercel
Automatic HTTPS with custom domain

### Railway
Automatic HTTPS included

### Self-hosted (Let's Encrypt + Nginx)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Nginx configuration
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

## Monitoring & Logging

### Application Monitoring

```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs voip-app
```

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

Configure Sentry in `next.config.js`

### Database Monitoring

Use PostgreSQL built-in monitoring tools or third-party services.

## Performance Optimization

### Database
- Add indexes on frequently queried columns
- Use connection pooling (PgBouncer)
- Regular maintenance and vacuuming

### Application
- Enable compression
- Optimize images
- Use CDN for static assets
- Implement caching strategies

### Redis
- Set appropriate memory limits
- Enable persistence
- Use keyspace notifications

## Backup & Recovery

### Database Backups

```bash
# Daily automated backup
0 2 * * * /usr/bin/pg_dump voip_db > /backups/voip_db_$(date +%Y%m%d).sql
```

### Point-in-time Recovery

Enable WAL (Write-Ahead Logging) in PostgreSQL:

```
wal_level = replica
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database encrypted
- [ ] Redis password protected
- [ ] Firewall configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] API keys rotated
- [ ] Logs monitored
- [ ] Regular security updates

## Scaling

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple instances
- Use session store (Redis)

### Vertical Scaling
- Increase server resources
- Optimize application code
- Cache aggressively

## Rollback Procedures

```bash
# Previous deployment
railway logs --follow

# Rollback to previous version
railway down
git revert HEAD
npm run build
railway up
```

## Troubleshooting

### Common Issues

1. **Database Connection Refused**
   - Check DATABASE_URL
   - Verify firewall rules
   - Test connection manually

2. **Out of Memory**
   - Check Node.js heap size
   - Profile memory usage
   - Scale vertically

3. **High API Response Time**
   - Check database queries
   - Review slow query logs
   - Add caching layer

## Support

For deployment issues, check:
- Application logs
- Database logs
- Server system logs
- Twilio logs
