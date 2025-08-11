import torch
import librosa
import numpy as np
from transformers import Wav2Vec2FeatureExtractor, Wav2Vec2ForSequenceClassification

# Load emotion model and feature extractor
MODEL_NAME = "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"
feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(MODEL_NAME)
model = Wav2Vec2ForSequenceClassification.from_pretrained(MODEL_NAME)
emotion_labels = list(model.config.id2label.values())

def preprocess_audio(audio_path, target_sr=16000):
    """
    Load, resample, trim silence, and normalize audio
    """
    audio, _ = librosa.load(audio_path, sr=target_sr, mono=True)
    trimmed_audio, _ = librosa.effects.trim(audio)
    normalized_audio = librosa.util.normalize(trimmed_audio)
    return normalized_audio, target_sr

def chunk_audio(audio, chunk_size_sec=5, sr=16000):
    """
    Break long audio into smaller chunks for better emotion detection
    """
    chunk_len = chunk_size_sec * sr
    return [audio[i:i + chunk_len] for i in range(0, len(audio), chunk_len)]

def predict_emotion(audio_path, use_chunking=False):
    speech, sr = preprocess_audio(audio_path)

    if use_chunking:
        chunks = chunk_audio(speech, sr=sr)
        all_probs = []

        for chunk in chunks:
            inputs = feature_extractor(chunk, sampling_rate=sr, return_tensors="pt", padding=True)
            with torch.no_grad():
                logits = model(**inputs).logits
                probs = torch.nn.functional.softmax(logits, dim=1).squeeze()
                all_probs.append(probs)

        avg_probs = torch.stack(all_probs).mean(dim=0)
        emotion_scores = {emotion_labels[i]: float(avg_probs[i]) for i in range(len(avg_probs))}
    else:
        inputs = feature_extractor(speech, sampling_rate=sr, return_tensors="pt", padding=True)
        with torch.no_grad():
            logits = model(**inputs).logits
            probs = torch.nn.functional.softmax(logits, dim=1).squeeze()
        emotion_scores = {emotion_labels[i]: float(probs[i]) for i in range(len(probs))}

    sorted_emotions = sorted(emotion_scores.items(), key=lambda x: x[1], reverse=True)
    top_emotion, top_score = sorted_emotions[0]
    top_3 = sorted_emotions[:3]

    return {
        "dominant_emotion": top_emotion,
        "confidence": round(top_score, 4),
        "top_3_emotions": [{ "emotion": e, "score": round(s, 4) } for e, s in top_3],
        "all_emotions": {e: round(s, 4) for e, s in emotion_scores.items()}
    }

if __name__ == "__main__":
    import sys
    audio_file = sys.argv[1] if len(sys.argv) > 1 else "sample.wav"
    result = predict_emotion(audio_file, use_chunking=False)
    print(result)
