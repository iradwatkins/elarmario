# El Armario (elarmario.com.do) - SaaS Platform Documentation

**⚠️ READ THIS FIRST - Configuration and architecture guide**

---

## 🎯 Site Configuration

**Domain:** elarmario.com.do
**Type:** Independent SaaS Platform
**Port:** 3012
**Database:** elarmario (PostgreSQL)
**Database URL:** postgresql://stepperslife:securepass123@localhost:5432/elarmario
**MinIO Container:** elarmario-minio
**MinIO Port:** 9012 (Console: 9112)
**MinIO Bucket:** elarmario
**PM2 Process:** elarmario (when configured)
**Directory:** /root/websites/elarmario

---

## 🏗️ Architecture

### This is a **Standalone SaaS Platform**

✅ **Own PostgreSQL database** (elarmario)
✅ **Own MinIO container** (elarmario-minio)
✅ **Independent authentication** (Clerk)
✅ **Own email service** (Resend)
✅ **Fully isolated** from other sites

❌ **NOT part of Stepperslife ecosystem**
❌ **Does NOT share resources** with other sites
❌ **Completely independent** operation

---

## 🔐 Authentication (Clerk)

### Sign Up Methods Enabled

1. **Google OAuth** - One-click sign up with Google
2. **Magic Link** - Passwordless email authentication

### Clerk Configuration

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Setup Steps for Clerk

1. Go to https://dashboard.clerk.com
2. Create a new application for "El Armario"
3. Enable authentication methods:
   - ✅ Email (Magic Link)
   - ✅ Google OAuth
4. Copy the API keys to `.env` file
5. Configure redirect URLs:
   - Sign in: https://elarmario.com.do/sign-in
   - Sign up: https://elarmario.com.do/sign-up
   - After sign in: https://elarmario.com.do/dashboard
   - After sign up: https://elarmario.com.do/onboarding

---

## 📧 Email Service (Resend)

### Configuration

```env
RESEND_API_KEY=re_YOUR_KEY_HERE
RESEND_FROM_EMAIL=noreply@elarmario.com.do
RESEND_FROM_NAME="El Armario"
```

### Setup Steps for Resend

1. Go to https://resend.com
2. Create account and verify domain: elarmario.com.do
3. Add DNS records (Resend will provide):
   - SPF record
   - DKIM record
4. Copy API key to `.env` file
5. Create email templates for:
   - Welcome email
   - Notifications
   - Password reset (if using password auth)

### DNS Records for Email (from Resend)

Add these to elarmario.com.do DNS:

```
TXT  @  v=spf1 include:_spf.resend.com ~all
TXT  resend._domainkey  [DKIM value from Resend]
```

---

## 🗄️ Database Structure

**Database:** elarmario (isolated PostgreSQL)

Recommended schema for SaaS:

```sql
-- Users (managed by Clerk, store additional data)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Organizations/Teams (if multi-tenant)
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions (if using payments)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(50),
  plan VARCHAR(50),
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📦 MinIO Storage

**Container:** elarmario-minio
**Port:** 9012
**Console:** http://localhost:9112
**Credentials:** minioadmin / minioadmin
**Bucket:** elarmario

### Usage Example

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});

// Upload file
await s3Client.send(new PutObjectCommand({
  Bucket: 'elarmario',
  Key: 'uploads/file.jpg',
  Body: fileBuffer,
}));
```

---

## 🔧 Environment Variables

**Location:** `/root/websites/elarmario/.env`

### Required Configuration

✅ Update these before deploying:

1. **Clerk Keys** (from dashboard.clerk.com)
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY

2. **Resend API Key** (from resend.com)
   - RESEND_API_KEY

3. **NextAuth Secret** (already generated)
   - NEXTAUTH_SECRET

### Optional Configuration

- Stripe keys (for payments)
- Analytics IDs
- Feature flags

---

## 🚀 Deployment Checklist

### Infrastructure (✅ Done)

- [x] PostgreSQL database created
- [x] MinIO container running
- [x] Nginx configuration created
- [x] .env file template created

### Required Before Launch

- [ ] Update Clerk API keys in `.env`
- [ ] Update Resend API key in `.env`
- [ ] Setup DNS records:
  - [ ] A record: elarmario.com.do → 72.60.28.175
  - [ ] SPF record for Resend
  - [ ] DKIM record for Resend
- [ ] Get SSL certificate:
  ```bash
  certbot --nginx -d elarmario.com.do -d www.elarmario.com.do
  ```
- [ ] Build application: `npm run build`
- [ ] Start PM2 process:
  ```bash
  cd /root/websites/elarmario
  NODE_ENV=production PORT=3012 pm2 start npm --name "elarmario" -- start
  pm2 save
  ```

### Clerk Dashboard Setup

- [ ] Enable Google OAuth
- [ ] Enable Email (Magic Link)
- [ ] Configure redirect URLs
- [ ] Customize sign-in/sign-up pages
- [ ] Set up webhooks (optional)

### Resend Dashboard Setup

- [ ] Verify domain
- [ ] Create email templates
- [ ] Test email delivery
- [ ] Monitor email logs

---

## 📝 Common Commands

### Database

```bash
# Connect to database
PGPASSWORD=securepass123 psql -h localhost -U stepperslife -d elarmario

# Backup database
PGPASSWORD=securepass123 pg_dump -h localhost -U stepperslife elarmario > backup.sql

# Restore database
PGPASSWORD=securepass123 psql -h localhost -U stepperslife elarmario < backup.sql
```

### MinIO

```bash
# Check container status
docker ps | grep elarmario-minio

# View logs
docker logs elarmario-minio

# Restart container
docker restart elarmario-minio

# Access MinIO console
# Open: http://YOUR_IP:9112
```

### Application

```bash
# Install dependencies
cd /root/websites/elarmario
npm install

# Development
npm run dev

# Build
npm run build

# Start production
NODE_ENV=production PORT=3012 npm start

# With PM2
pm2 start npm --name "elarmario" -- start
pm2 logs elarmario
pm2 restart elarmario
```

---

## 🔒 Security Checklist

- [ ] Enable HTTPS (SSL certificate)
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable email verification in Clerk
- [ ] Use secure session storage
- [ ] Implement CSP headers
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## 💳 Payment Integration (Optional)

If adding subscriptions with Stripe:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Setup:
1. Create Stripe account
2. Configure products and pricing
3. Set up webhooks
4. Implement subscription logic
5. Handle payment success/failure

---

## 📊 Monitoring

### Recommended Tools

- **Error Tracking:** Sentry
- **Analytics:** PostHog or Google Analytics
- **Uptime:** UptimeRobot
- **Performance:** Vercel Analytics
- **Email:** Resend Dashboard

### Key Metrics to Track

- Sign up rate
- User activation
- Email deliverability
- API response times
- Error rates
- Database performance

---

## 🛠️ Tech Stack

**Framework:** Next.js 15
**Authentication:** Clerk
**Email:** Resend
**Database:** PostgreSQL
**Storage:** MinIO (S3-compatible)
**Deployment:** PM2 + Nginx
**SSL:** Let's Encrypt (Certbot)

---

## 📚 Resources

- **Clerk Docs:** https://clerk.com/docs
- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **MinIO Docs:** https://min.io/docs

---

## ⚠️ Important Notes

1. **This is NOT part of Stepperslife** - Completely separate system
2. **Independent authentication** - Users don't share login with other sites
3. **Separate billing** - If using Stripe, set up separate account
4. **Own domain** - elarmario.com.do (Dominican Republic)
5. **SaaS model** - Build for multi-tenant or single-tenant as needed

---

## 🆘 Troubleshooting

### Database Connection Issues
```bash
# Test connection
PGPASSWORD=securepass123 psql -h localhost -U stepperslife -d elarmario -c "SELECT 1;"
```

### MinIO Not Accessible
```bash
# Check if container is running
docker ps | grep elarmario-minio

# Check port
ss -tlnp | grep 9012
```

### Clerk Authentication Errors
- Verify API keys are correct
- Check redirect URLs match exactly
- Ensure HTTPS is enabled (Clerk requires it in production)

### Email Not Sending
- Verify Resend domain is verified
- Check DNS records are correct
- Review Resend dashboard logs
- Confirm API key has correct permissions

---

**Last Updated:** October 9, 2025
**Version:** 1.0
**Status:** Infrastructure Ready - Awaiting Application Code
