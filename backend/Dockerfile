# Stage 1: Dependencies
FROM python:3.12-slim AS deps

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
    build-essential

WORKDIR /app
COPY requirements.txt .

RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --prefer-binary --prefix=/deps -r requirements.txt

# Stage 2: Production image
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONOPTIMIZE=1 \
    WORKDIR=/app

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
    tini \
    wget

COPY --from=deps /deps /usr/local

WORKDIR $WORKDIR
COPY . .

RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser $WORKDIR && \
    mkdir -p $WORKDIR/data $WORKDIR/uploads && \
    chown -R appuser:appuser $WORKDIR/data $WORKDIR/uploads

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8000/api/health || exit 1

USER appuser

ENTRYPOINT ["tini", "--"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
