import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { ArrowRight, BrainCircuit, Mic, FileText } from "lucide-react";
import "../index.css";

// Feature Card Component for reusability and cleaner code
const FeatureCard = ({ icon, title, children }) => (
  <Card className="bg-zinc-900/50 border-zinc-800 shadow-lg hover:border-indigo-500/50 hover:bg-zinc-900 transition-all duration-300 group animate-fade-in-up">
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="bg-indigo-500/10 p-3 rounded-lg text-indigo-400">
        {icon}
      </div>
      <CardTitle className="text-white text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-zinc-400 text-sm">{children}</CardContent>
  </Card>
);

const HomePage = () => {
  return (
    <div className="background min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white px-4 pt-24 pb-12 font-sans overflow-hidden">
      <div className="text-center mt-10 mb-16 max-w-4xl mx-auto">
        <TypingAnimation className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text mb-4">
          👋 Welcome to EmoScribe
        </TypingAnimation>
        <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          Unlock insights from your audio. We transcribe, summarize, and detect
          emotions with state-of-the-art AI, all in one seamless experience.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard icon={<Mic size={24} />} title="Whisper Transcription">
          Uses <strong>Faster-Whisper</strong>, a lightweight version of
          OpenAI's model, to convert audio into accurate text with remarkable
          speed and efficiency.
        </FeatureCard>

        <FeatureCard icon={<FileText size={24} />} title="Gemini Summarization">
          Leverages <strong>Google's Gemini 1.5 Pro</strong> to generate fluent,
          context-aware summaries, distilling long transcriptions into key
          points.
        </FeatureCard>

        <FeatureCard
          icon={<BrainCircuit size={24} />}
          title="Emotion Detection"
        >
          Integrates <strong>Wav2Vec2</strong> to analyze vocal tones, providing
          a visual breakdown of the emotional landscape within your audio.
        </FeatureCard>
      </div>

      {/* Separator */}
      <Separator className="my-16 bg-zinc-800" />

      {/* Call to Action */}
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          Upload your audio file and let our AI do the heavy lifting. Go from
          sound to summary and sentiment in just a few clicks.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg shadow-indigo-600/20 transition-all duration-300 transform hover:scale-105"
        >
          <Link to="/AudioModel">
            Launch the App <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-zinc-800 pt-8 text-sm text-zinc-500 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">
            © {new Date().getFullYear()}
            <span className="font-semibold text-white"> EmoScribe</span>. All
            rights reserved.
          </p>
          <p>
            Built with ❤️ by Kirtan Suthar |{" "}
            <a
              href="https://github.com/kirtan-suthar/emoscribe" // Replace with your actual repo link
              className="text-indigo-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
