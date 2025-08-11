from faster_whisper import WhisperModel

# Load Whisper Model
model = WhisperModel("tiny", compute_type="int8")

def transcribe_audio(audio_path):
    segments, _ = model.transcribe(audio_path, task="translate")
    transcription = " ".join(segment.text.strip() for segment in segments)
    return transcription
