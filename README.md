# Not1Sam.github.io

Personal portfolio website for Houssam Belkasaoui (Not1Sam) — Software Engineer from Morocco.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend | FastAPI + SQLAlchemy (async) + SQLite |
| Auth | JWT (python-jose) + password-only admin login |
| Deployment | GitHub Pages (frontend) + Docker/Portainer (backend) |
| HTTPS | Cloudflare Tunnel |

## Project Structure

```
Not1Sam.github.io/
├── frontend/          # React SPA (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages
│   │   └── lib/         # Utilities, types, constants
│   └── public/          # Static assets
├── backend/           # FastAPI server
│   └── app/
│       ├── routers/     # API endpoints
│       ├── models/      # SQLAlchemy models
│       ├── schemas/     # Pydantic models
│       └── services/    # Auth, business logic
├── docker-compose.yml  # Production deployment
└── .github/workflows/  # CI/CD pipelines
```

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your settings
uvicorn app.main:app --reload --port 8000
# API docs at http://localhost:8000/docs
```

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | JWT signing key | (required) |
| `ADMIN_PASSWORD` | Admin login password | (required) |
| `ADMIN_USERNAME` | Admin username | `admin` |
| `DATABASE_URL` | SQLite connection string | `sqlite+aiosqlite:///./data/portfolio.db` |
| `ALLOWED_ORIGINS` | CORS origins (comma-separated) | `http://localhost:5173` |

## Deployment

### Frontend (GitHub Pages)

Pushes to `main` branch auto-deploy to https://not1sam.github.io via GitHub Actions.

### Backend (Docker)

1. Build and push the Docker image (handled by CI):
   ```bash
   # CI builds: ghcr.io/not1sam/not1sam-backend:<version>
   ```

2. In Portainer, create a stack with the root `docker-compose.yml` and set environment variables:
   - `SECRET_KEY` — random string for JWT signing
   - `ADMIN_PASSWORD` — your admin password
   - `TUNNEL_TOKEN` — Cloudflare Tunnel token

3. The backend is accessible via:
   - HTTP: `http://84.8.221.29:8001`
   - HTTPS: `https://x7k9m2.bungus.fyi` (Cloudflare Tunnel)

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | Public | Admin login |
| `/api/auth/me` | GET | Admin | Get current admin |
| `/api/blog` | GET | Public | List blog posts |
| `/api/blog` | POST | Admin | Create blog post |
| `/api/blog/{id}` | PUT | Admin | Update blog post |
| `/api/blog/{id}` | DELETE | Admin | Delete blog post |
| `/api/certificates` | GET | Public | List certificates |
| `/api/certificates` | POST | Admin | Upload certificate |
| `/api/contact` | POST | Public | Submit contact message |
| `/api/contact` | GET | Admin | List messages |
| `/api/health` | GET | Public | Health check |

## License

MIT
