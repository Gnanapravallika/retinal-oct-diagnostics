# Stage 1: Build dependencies
FROM python:3.10-slim as builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install dependencies into a localized prefix path
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Minimal runtime environment
FROM python:3.10-slim as runner

WORKDIR /app

# Copy installed libraries from builder stage
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Copy source code and models directory
COPY src/ /app/src/
COPY models/ /app/models/

EXPOSE 8000

ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
