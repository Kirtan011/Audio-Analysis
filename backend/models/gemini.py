import os
import time
from dotenv import load_dotenv
import google.generativeai as genai

# Load API key from .env once at module level
load_dotenv()
API_KEY = os.getenv("API_KEY")

if not API_KEY:
    raise ValueError("🔴 Gemini API_KEY not found in .env file.")

genai.configure(api_key=API_KEY)

# Initialize model once for performance
model = genai.GenerativeModel("gemini-2.5-pro")


def summarize_text_with_gemini(transcription: str, mode: str = "concise") -> str:
    """
    Summarizes transcription using Gemini 2.5 Pro.
    
    Modes:
      - "concise" (default): short paragraph summary
      - "bullet": bullet-point summary
      - "chat": show structured speaker dialogue
    """
    if not transcription.strip():
        return "⚠️ No transcription text provided."

    # Select prompt mode
    if mode == "bullet":
        summary_instruction = "Summarize the following text in 4-5 bullet points."
    elif mode == "chat":
        summary_instruction = "If it's a conversation, present it as cleaned-up speaker dialogue with each speaker labeled."
    else:
        summary_instruction = "Summarize the following in a short, concise paragraph."

    prompt = f"""
You are a helpful summarization assistant.

{summary_instruction}

Text:
\"\"\"
{transcription}
\"\"\"

Your response should be accurate, human-readable, and avoid unnecessary repetition.
"""

    # Retry mechanism in case of temporary failures
    for attempt in range(3):
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"❌ Gemini summarization failed (attempt {attempt + 1}): {e}")
            time.sleep(1)

    return "❌ Gemini summarization failed after multiple attempts."


# Local test runner (optional)
if __name__ == "__main__":
    test_text = """
    Interviewer: Welcome, doctor. Can you explain how AI is used in healthcare?
    Doctor: Sure! AI is helping with early diagnosis and robotic surgeries...
    Interviewer: Fascinating. What about patient data?
    Doctor: AI models analyze large datasets to predict outcomes more accurately.
    """
    print("📄 Input Text:", test_text)
    print("\n📝 Summary:\n", summarize_text_with_gemini(test_text, mode="chat"))
