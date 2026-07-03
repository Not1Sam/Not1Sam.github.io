# Contributing

This is a personal portfolio project, but suggestions and bug reports are welcome.

## Development Setup

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/my-change`
4. Make your changes
5. Test locally (see README.md for setup instructions)
6. Commit with a clear message
7. Push and create a Pull Request

## Code Style

### Frontend (TypeScript/React)

- Use TypeScript for all components
- Follow existing patterns (functional components, hooks)
- Use Tailwind CSS classes (avoid inline styles unless dynamic)
- Keep components small and focused

### Backend (Python/FastAPI)

- Follow PEP 8 style
- Use type hints
- Add docstrings for complex functions
- Keep routes thin — business logic goes in `services/`

## Commit Messages

Use conventional commits:

- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `refactor: improve code structure`
- `chore: maintenance tasks`

## Pull Requests

- Keep PRs focused on one change
- Describe what changed and why
- Add screenshots for UI changes
- Ensure CI passes before requesting review

## Reporting Issues

Open an issue with:

- Clear title
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
