import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@radix-ui/themes";
import Emotion from "../components/Emotion";
import Transcribe from "../components/Transcribe";
import Summarize from "../components/Summarize";
import { useNavigate } from "react-router-dom";
import UploadDrawer from "../components/AudioUploadDrawer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import "../index.css";
import { Separator } from "@radix-ui/react-separator";

const AudioModel = () => {
  const [file, setFile] = useState(null);
  const [transcribeText, setTranscibeText] = useState("");
  const [summarizeText, setSummarizeText] = useState("");
  const [emotionAnalysis, setEmotionAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTranscibeText("");
    setSummarizeText("");
    setEmotionAnalysis(null);
    localStorage.clear();
  };

  const removeDataFromScreen = () => {
    setFile(null);
    setTranscibeText("");
    setSummarizeText("");
    setEmotionAnalysis(null);
    localStorage.clear();
  };

  const downloadTextFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please upload an audio file first.");
    const formData = new FormData();
    formData.append("audio", file);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/transcribe",
        formData
      );
      const { transcription, summary, emotionResult } = response.data || {};
      if (!transcription)
        return toast.error("Unexpected response from the server.");
      setTranscibeText(transcription);
      setSummarizeText(summary);
      setEmotionAnalysis(emotionResult);
      localStorage.setItem("transcription", transcription);
      localStorage.setItem("summary", summary);
      if (emotionResult) {
        localStorage.setItem("emotion", JSON.stringify(emotionResult));
      }
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Upload failed. Please check your server or file.");
      setTranscibeText("Analysis failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedTranscription = localStorage.getItem("transcription");
    const savedSummary = localStorage.getItem("summary");
    const savedEmotion = localStorage.getItem("emotion");
    if (savedTranscription) setTranscibeText(savedTranscription);
    if (savedSummary) setSummarizeText(savedSummary);
    if (savedEmotion) {
      try {
        setEmotionAnalysis(JSON.parse(savedEmotion));
      } catch (e) {
        console.error("Failed to parse emotion data from localStorage", e);
        setEmotionAnalysis(null);
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full text-white font-sans px-4 pt-28 pb-16">
      <h1 className="pb-4 text-2xl md:text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text">
        🎤 Audio Analysis
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8 max-w-screen-2xl mx-auto">
        {/* Left Sidebar */}
        <div className="space-y-6">
          <UploadDrawer
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            loading={loading}
          />
          {file && !loading && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white text-base">
                  📁 File Info
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-400 space-y-1">
                <p>
                  <strong>Name:</strong> {file.name}
                </p>
                <p>
                  <strong>Type:</strong> {file.type || "Unknown"}
                </p>
                <p>
                  <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)}{" "}
                  MB
                </p>
              </CardContent>
            </Card>
          )}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">💡 Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-400 space-y-2">
              <p>• Only MP3, WAV, M4A files supported (max 25MB).</p>
              <p>• Ensure clear audio for better transcription.</p>
              <p>• Emotions are analyzed from the audio's tone.</p>
            </CardContent>
          </Card>
        </div>

        {/* Center Content */}
        <div className="space-y-8">
          {loading ? (
            <div className="w-full h-full min-h-[400px] flex flex-col justify-center items-center bg-zinc-900/50 border border-zinc-800 rounded-lg">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              <p className="mt-6 text-xl text-zinc-300">Processing Audio...</p>
              <p className="text-sm text-zinc-500 mt-1">
                This may take a few moments. Please wait.
              </p>
            </div>
          ) : transcribeText || summarizeText ? (
            <>
              {transcribeText && (
                <Transcribe
                  transcribeText={transcribeText}
                  downloadTextFile={downloadTextFile}
                />
              )}
              {summarizeText && (
                <Summarize
                  summarizeText={summarizeText}
                  downloadTextFile={downloadTextFile}
                />
              )}
            </>
          ) : (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-zinc-300 bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 shadow-lg text-center">
              <div className="text-5xl mb-4">🎙️</div>
              <h2 className="text-2xl font-bold mb-2">
                Start by Uploading an Audio File
              </h2>
              <p className="text-sm max-w-xl text-zinc-400">
                EmoScribe will transcribe the speech, summarize key points using
                Gemini AI, and detect emotions from your voice tone — all in
                seconds.
              </p>
              <p className="text-xs mt-4 text-zinc-500 italic">
                Supported formats: MP3, WAV, M4A • Max size: 25MB
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-3 lg:sticky lg:top-28 h-fit">
          {!loading && emotionAnalysis && (
            <Emotion emotionAnalysis={emotionAnalysis} />
          )}

          {!loading && transcribeText && (
            <Card className="mt-5 bg-zinc-900 border-zinc-800">
              <Separator>
                <hr />
              </Separator>
              <CardHeader>
                <CardTitle className="text-white text-base">
                  ⚙️ Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full !bg-red-900 hover:!bg-red-700 !text-gray-200 hover:!text-white font-semibold"
                  variant="outline"
                  onClick={removeDataFromScreen}
                >
                  🔄 Clear & Start Over
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioModel;
