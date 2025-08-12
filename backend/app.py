import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from models.transcribe_module import transcribe_audio  # update if module name is different
from models.gemini import summarize_text_with_gemini
from models.emotion import predict_emotion

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "recordings")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/health")
def health_check():
    return jsonify({"status": "ok"}), 200

@app.route("/transcribe", methods=["POST"])
def upload_and_transcribe():
    if "audio" not in request.files:
        return jsonify({"success": False, "error": "No file part in the request"}), 400

    file = request.files["audio"]
    if file.filename == "":
        return jsonify({"success": False, "error": "No file selected"}), 400

    try:
        filename = secure_filename(file.filename)
        audio_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(audio_path)

        # Transcribe / summarize / emotion analysis
        text = transcribe_audio(audio_path)
        summarizeText=summarize_text_with_gemini(text)
        emotion_result = predict_emotion(audio_path)
        return jsonify({"success": True, "transcription": text, "summary": summarizeText , "emotionResult":emotion_result})

     
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500








