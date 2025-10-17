# Claude Code Instructions for El Armario

## Critical Rules

### Port Configuration - STRICT ASSIGNMENTS

**⚠️ CRITICAL: These are the ONLY ports allowed for elarmario.com.do. NO OTHER PORTS can be used.**

| Service       | Port | Purpose               | Container Name     | Usage Rule |
|---------------|------|-----------------------|--------------------|------------|
| Next.js App   | 3012 | Application server    | N/A (systemd)      | REQUIRED - Development & Production |
| PostgreSQL    | 5440 | Database server       | elarmario-postgres | REQUIRED - Database connections |
| Redis         | 6310 | Session & cache store | elarmario-redis    | REQUIRED - Sessions/Cache |
| MinIO API     | 9012 | File storage API      | elarmario-minio    | REQUIRED - File uploads |
| MinIO Console | 9112 | MinIO admin interface | elarmario-minio    | Admin access only |

**Port Rules:**
- **NEVER use port 3000** - Use 3012 for Next.js
- **NEVER use port 5432** - Use 5440 for PostgreSQL
- **NEVER use port 6379** - Use 6310 for Redis
- If you need ANY service not listed above, STOP and ask user for permission
- Full VPS port management: `/root/PORT_MANAGEMENT_KEY.md`

### Architecture
- This is an **INDEPENDENT SaaS platform** (NOT part of Stepperslife ecosystem)
- **Database:** elarmario (PostgreSQL on port 5440)
- **Database URL:** postgresql://stepperslife:securepass123@localhost:5440/elarmario
- **Redis:** elarmario-redis (port 6310)
- **MinIO container:** elarmario-minio (API: 9012, Console: 9112)
- **MinIO bucket:** elarmario
- **Domain:** elarmario.com.do
- **PM2 process name:** elarmario

### Authentication & Services
- **Auth:** Clerk (independent authentication)
- **Email:** Resend
- Users do NOT share credentials with other sites
- Completely isolated from other domains

## Before Making Changes

1. **Always reference** `.claude/README.md` for detailed architecture
2. **Check** `/root/PORT_MANAGEMENT_KEY.md` before modifying ports
3. **Never modify** port configurations without explicit permission
4. **Review** environment variables in `.env` before deployment changes

## Testing & Deployment

### Building
```bash
npm run build
```

### Starting with PM2
```bash
cd /root/websites/elarmario
NODE_ENV=production PORT=3012 pm2 start npm --name "elarmario" -- start
pm2 save
```

### Database Commands
```bash
# Connect to database (PORT 5440, NOT 5432)
PGPASSWORD=securepass123 psql -h localhost -p 5440 -U stepperslife -d elarmario

# Backup database
PGPASSWORD=securepass123 pg_dump -h localhost -p 5440 -U stepperslife elarmario > backup.sql

# Redis connection (PORT 6310, NOT 6379)
redis-cli -p 6310
```

## Code Preferences

### Framework & Stack
- **Framework:** Next.js 15
- **Language:** TypeScript (for type safety)
- **Database:** PostgreSQL
- **Storage:** MinIO (S3-compatible)
- **Styling:** Tailwind CSS with Candyland theme
- **UI Components:** shadcn/ui

### Code Quality & Style
- Write clean, readable code with consistent formatting
- Use TypeScript for type safety where applicable
- Add comments only for complex logic; keep code self-documenting
- Use meaningful, descriptive names for files, variables, and functions
- Follow existing code style and conventions in the project

### Project Structure
- Keep components modular and reusable
- Maintain clear folder structure: /components, /app, /lib, /utils
- One component per file, focused on single responsibility
- Group related files together
- Prefer editing existing files over creating new ones

### Web Development Standards
- Mobile-first, responsive design by default
- Use semantic HTML for accessibility
- Implement proper error handling and loading states
- Optimize images and assets before adding them
- Include SEO best practices (meta tags, proper heading hierarchy)
- Validate and sanitize all user inputs

### Dependencies & Configuration
- Keep dependencies minimal and justified
- Never hard-code values - use constants or config files
- Use environment variables for all sensitive configuration
- Never commit API keys, credentials, or sensitive data
- Keep dependencies updated for security

### Git Practices
- Write clear, descriptive commit messages
- Review all changes before committing
- Don't commit node_modules, build artifacts, or IDE configs
- Never commit `.env` to version control

### Performance
- Consider lazy loading and code splitting
- Minimize bundle size
- Optimize for Core Web Vitals
- Always test database connections before deployment
- Verify MinIO container is running before file operations

### Testing Requirements
- Test all authentication flows (Google OAuth, Magic Link)
- Verify email sending via Resend
- Check database migrations before deploying
- Validate environment variables are set

### Communication
- Explain reasoning for technical decisions
- Ask clarifying questions when requirements are unclear
- Point out potential issues, trade-offs, or security concerns
- Suggest improvements when you see opportunities

## Files to Never Modify Without Permission

- `.env` (contains sensitive credentials)
- Port configurations in any file
- Nginx configuration files
- PM2 process configurations
- Database connection strings

## Security Reminders

- Never commit `.env` to version control
- Verify Clerk API keys are test/production appropriate
- Ensure HTTPS is enabled before production
- Keep all secrets in `.env` file only

## Common Tasks

### Starting Development Server
```bash
npm run dev
```

### Checking MinIO Status
```bash
docker ps | grep elarmario-minio
docker logs elarmario-minio
```

### Health Checks
```bash
# Database health check (PORT 5440)
PGPASSWORD=securepass123 psql -h localhost -p 5440 -U stepperslife -d elarmario -c "SELECT 1;"

# Redis health check (PORT 6310)
redis-cli -p 6310 ping

# MinIO health check
curl http://localhost:9012/minio/health/live
```

## Notes

- This SaaS platform is completely independent
- Do not reference or import code from Stepperslife projects
- Maintain separate billing, users, and authentication
- Domain is Dominican Republic (.com.do)

---

## 🎭 BMAD Method Integration

### Intelligent Agent System

This project uses **BMAD-METHOD™** (Breakthrough Method of Agile AI-driven Development). Claude Code should dynamically become the appropriate BMAD agent based on the task at hand.

### BMAD Agents Available

Located in `.bmad-core/agents/`, access via slash commands:

| Agent | Command | Use When | MCP Tools to Leverage |
|-------|---------|----------|----------------------|
| **UX Expert** (Sally) | `/ux-expert` | UI/UX design, wireframes, component specs | shadcn-ui MCP |
| **Architect** (Winston) | `/architect` | System design, architecture docs, tech selection | context7, ref MCPs |
| **Developer** (James) | `/dev` | Code implementation, debugging, development | Playwright MCP for testing |
| **SM** (Scrum Master) | `/sm` | Story creation, sprint planning | - |
| **QA** | `/qa` | Testing, code review, quality assurance | Playwright MCP |
| **PM** | `/pm` | Product requirements, feature planning | exa, context7 MCPs |
| **Analyst** | `/analyst` | Market research, requirements gathering | firecrawl, exa MCPs |
| **PO** (Product Owner) | `/po` | Backlog management, story validation | - |
| **BMad Master** | `/bmad-master` | Universal task execution, any capability | All MCPs |
| **BMad Orchestrator** | `/bmad-orchestrator` | Multi-agent coordination, workflow management | All MCPs |

### Auto-Agent Selection Rules

**CRITICAL**: When user requests a task, automatically detect and become the appropriate BMAD agent:

#### UI/UX Design Tasks → UX Expert (Sally)
- **Triggers**: "design the UI", "create wireframes", "design components", "user experience"
- **Actions**:
  1. Load `/ux-expert` agent persona
  2. Use shadcn-ui MCP to add components
  3. Reference Candyland theme from `.claude/candyland-theme.md`
  4. Follow `.bmad-core/templates/front-end-spec-tmpl.yaml` patterns

#### Architecture Tasks → Architect (Winston)
- **Triggers**: "system design", "architecture", "tech stack", "database schema", "API design"
- **Actions**:
  1. Load `/architect` agent persona
  2. Use context7/ref MCPs for research
  3. Reference existing architecture in `.claude/README.md`
  4. Follow `.bmad-core/templates/architecture-tmpl.yaml` or `fullstack-architecture-tmpl.yaml`

#### Development Tasks → Developer (James)
- **Triggers**: "implement", "code", "build feature", "fix bug", "develop"
- **Actions**:
  1. Load `/dev` agent persona
  2. Use Playwright MCP for testing
  3. Follow story tasks sequentially
  4. Update story file with progress
  5. ONLY modify Dev Agent Record sections of stories

#### Story Creation → SM (Scrum Master)
- **Triggers**: "create story", "write user story", "plan sprint", "break down epic"
- **Actions**:
  1. Load `/sm` agent persona
  2. Read from sharded PRD in `docs/prd/`
  3. Use `.bmad-core/templates/story-tmpl.yaml`
  4. Execute `create-next-story` task

#### Testing/QA Tasks → QA Agent
- **Triggers**: "review code", "test", "quality check", "refactor"
- **Actions**:
  1. Load `/qa` agent persona
  2. Use Playwright MCP for E2E testing
  3. Execute `.bmad-core/tasks/review-story.md`
  4. Append QA results to story file

#### Research Tasks → Analyst
- **Triggers**: "research", "analyze market", "competitive analysis", "investigate"
- **Actions**:
  1. Load `/analyst` agent persona
  2. Use firecrawl MCP for web scraping
  3. Use exa MCP for search
  4. Follow `.bmad-core/templates/market-research-tmpl.yaml`

### MCP Integration Strategy

**MCP Servers Available**: playwright, shadcn-ui, firecrawl, exa, context7, ref

#### By Agent Type:

**UX Expert Tasks**:
- Use `shadcn-ui` MCP to add components
- Reference Candyland theme colors
- Generate component code with proper styling

**Developer Tasks**:
- Use `playwright` MCP for headless browser testing
- Test on port 3012 (never 3000)
- Validate authentication flows

**Research Tasks**:
- Use `firecrawl` MCP to scrape competitor sites
- Use `exa` MCP for technical searches
- Use `context7` MCP for context management

**Architecture Tasks**:
- Use `ref` MCP for technical references
- Use `context7` MCP for system context

### BMAD Workflow Integration

1. **Planning Phase**: Use Architect, PM, UX Expert agents
2. **Development Phase**: Use SM → Dev → QA cycle
3. **Testing Phase**: Use QA agent with Playwright MCP

### Critical BMAD Rules

- **ALWAYS use SM agent** for story creation (never bmad-master)
- **ALWAYS use Dev agent** for implementation (never bmad-master)
- **ALWAYS start fresh chat** when switching between SM, Dev, QA
- **NEVER pre-load** BMAD resources - load at runtime when needed
- **Story files**: Dev agent ONLY updates Dev Agent Record sections
- **Context management**: Keep agent chats focused, one task at a time

### BMAD Resources Location

- **Agents**: `.bmad-core/agents/`
- **Tasks**: `.bmad-core/tasks/`
- **Templates**: `.bmad-core/templates/`
- **Checklists**: `.bmad-core/checklists/`
- **Config**: `.bmad-core/core-config.yaml`

### El Armario + BMAD Integration

**CRITICAL**: All BMAD agents MUST maintain El Armario context:
- **Port 3012** for Next.js (NEVER 3000)
- **Port 5440** for PostgreSQL (NEVER 5432)
- **Port 6310** for Redis (NEVER 6379)
- **Port 9012** for MinIO API, **9112** for console
- PostgreSQL database: elarmario
- Redis: elarmario-redis
- MinIO: elarmario-minio
- Candyland theme colors
- Next.js 15 + TypeScript + Tailwind
- Clerk auth + Resend email

---

**Last Updated:** October 16, 2025
**Purpose:** Provide Claude Code with persistent context, BMAD agent system, and MCP integration for El Armario project
