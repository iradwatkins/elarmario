# elarmario

**El Armario** - Independent SaaS Platform

## 🚀 Overview

El Armario is a standalone SaaS platform built with modern web technologies, designed for scalability, security, and performance.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Candyland Theme)
- **UI Components:** shadcn/ui
- **Database:** PostgreSQL (port 5440)
- **Cache/Session:** Redis (port 6310)
- **File Storage:** MinIO S3-compatible (port 9012)
- **Authentication:** Clerk
- **Email:** Resend

## 📋 Port Configuration

| Service       | Port | Container Name     |
|---------------|------|--------------------|
| Next.js App   | 3012 | N/A (systemd)      |
| PostgreSQL    | 5440 | elarmario-postgres |
| Redis         | 6310 | elarmario-redis    |
| MinIO API     | 9012 | elarmario-minio    |
| MinIO Console | 9112 | elarmario-minio    |

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL client
- Redis client

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

Visit: `http://localhost:3012`

### Database Setup

```bash
# Connect to database
PGPASSWORD=securepass123 psql -h localhost -p 5440 -U stepperslife -d elarmario

# Run migrations (when available)
npm run migrate
```

### Production Deployment

```bash
# Build the application
npm run build

# Start with PM2
NODE_ENV=production PORT=3012 pm2 start npm --name "elarmario" -- start
pm2 save
```

## 🎨 Design System

This project uses the **Candyland Theme** with vibrant, playful colors:
- Primary: Pink (`#ffc0cb`)
- Secondary: Sky Blue (`#87ceeb`)
- Accent: Yellow (`#ffff00`)

## 📁 Project Structure

```
/root/websites/elarmario/
├── app/                # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions
├── public/            # Static assets
├── .bmad-core/        # BMAD Method agents & templates
├── .claude/           # Claude Code configuration
└── docs/              # Documentation
```

## 🔐 Security

- All sensitive data in `.env` (never committed)
- Clerk for secure authentication
- HTTPS enabled in production
- Input validation and sanitization

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint
```

## 📚 Documentation

- [Architecture](.claude/README.md)
- [BMAD Method](.bmad-core/data/bmad-kb.md)
- [Theme Guide](.claude/candyland-theme.md)

## 🌐 Domain

**Production:** https://elarmario.com.do

## 📄 License

Proprietary - All Rights Reserved

## 🤝 Contributing

This is a private project. Please contact the owner for contribution guidelines.

---

**Built with BMAD-METHOD™** - AI-driven Agile Development
