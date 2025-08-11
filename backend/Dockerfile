FROM python:3.10-slim

WORKDIR /app

# Install ffmpeg and other needed system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=10000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:$PORT", "--workers", "4"]
