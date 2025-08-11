# Use a specific Python version for stability
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install ffmpeg, a crucial dependency for audio processing with librosa/whisper
RUN apt-get update && apt-get install -y \
    ffmpeg \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

# Copy only the requirements file first to leverage Docker's build cache
COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir makes the image smaller
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code into the container
COPY . .

# The PORT will be set by the deployment platform (e.g., Render)
# This ENV line is for local testing but will be overridden in production
ENV PORT=10000

# Command to run the application using a production-grade server (Gunicorn)
# This "shell" form correctly expands the $PORT environment variable
CMD gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120