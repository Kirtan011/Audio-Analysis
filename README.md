# 🔊 Emoscribe AI

An intelligent web application that transcribes audio, analyzes the emotional tone of speech, and provides concise AI-powered summaries.

---

## ✨ Features

- 🎤 **Audio Transcription:** Upload audio files (.wav, .mp3, etc.) and get highly accurate text transcriptions using the Faster-Whisper model.
- 😊 **Emotion Analysis:** Detects dominant emotions in speech (joy, sadness, anger, neutral, etc.) via a fine-tuned Wav2Vec2 model.
- 📝 **AI Summarization:** Generates concise, human-readable summaries using Google Gemini Pro API.
- 🚀 **Modern Tech Stack:** React frontend with Vite & Tailwind CSS; Python Flask backend with Gunicorn.

---

## 🏗️ Architecture

- **Frontend:** React + Vite handles UI, uploads, and results display.
- **Backend:** Flask API serves AI models for transcription, emotion detection, and summarization.
- **Deployment:** Containerized with Docker and deployable on Render or similar platforms.

---

## 🛠️ Tech Stack

| Category      | Technology                                                                      |
| ------------- | ------------------------------------------------------------------------------- |
| Frontend      | React, Vite, Tailwind CSS, Shadcn-UI                                            |
| Backend       | Python, Flask, Gunicorn                                                         |
| Transcription | faster-whisper                                                                  |
| Emotion AI    | PyTorch, transformers, librosa (wav2vec2-lg-xlsr-en-speech-emotion-recognition) |
| Summarization | Google Gemini Pro API                                                           |

---

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (v16+) and npm/yarn/pnpm
- Python 3.9+
- Git
- ffmpeg (install and ensure accessible via terminal)

### Steps

#### 1. **Clone the repo**

   ```bash
   git clone <your-repository-url>
   cd <project-folder>

   ```

#### 2. **Backend Setup**

   ```bash
   #Navigate to the backend folder
   cd backend

   #Create and activate a virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   #Install the required Python packages
   pip install -r requirements.txt

   ```

#### 3. **Frontend Setup**

   ```bash
   # Navigate to the frontend folder
   cd frontend

   # Install dependencies
   npm install

   ```

#### 4. **API KEY**

   The backend requires an API key for Google Gemini.
   In the backend directory, create a new file named .env.
   And then add your API key to this file:

   ```bash
   API_KEY="your_google_gemini_api_key_here"

   ```

#### 5. **Running the Application**

 1. **Start the Backend Server**:

In your first terminal (in the backend directory with the virtual environment activated):

      flask run

The Flask server will start, typically on http://127.0.0.1:5000.

 2. **Start the Frontend Development Server**:

In your second terminal (in the frontend directory):

      npm run dev

The React application will start, typically on http://localhost:5173

3. **Open your browser and navigate to http://localhost:5173 to use the application**.
