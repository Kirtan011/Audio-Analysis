"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Constants for easy configuration and consistency
const EMOJI_MAP = {
  sad: "😢",
  disgust: "🤢",
  angry: "😠",
  fearful: "😨",
  happy: "😊",
  neutral: "😐",
  surprised: "😮",
  calm: "😌",
};

const COLOR_MAP = {
  sad: "#3b82f6", // Blue
  disgust: "#16a34a", // Green
  angry: "#ef4444", // Red
  fearful: "#a855f7", // Purple
  happy: "#eab308", // Yellow
  neutral: "#6b7280", // Gray
  surprised: "#f97316", // Orange
  calm: "#22d3ee", // Cyan
};

const Emotion = ({ emotionAnalysis }) => {
  if (!emotionAnalysis || !emotionAnalysis.top_3_emotions) {
    return null;
  }

  const { dominant_emotion, confidence, top_3_emotions, all_emotions } =
    emotionAnalysis;

  const emotionChartData = {
    labels: top_3_emotions.map(
      (e) => `${EMOJI_MAP[e.emotion] || "📊"} ${e.emotion}`
    ),
    datasets: [
      {
        label: "Emotion Score",
        data: top_3_emotions.map((e) => e.score),
        backgroundColor: top_3_emotions.map(
          (e) => COLOR_MAP[e.emotion] || "#6b7280"
        ),
        borderRadius: 6,
        borderColor: "#4b5563",
        borderWidth: 1,
      },
    ],
  };

  const emotionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        ticks: { color: "#9ca3af", font: { weight: "bold" } },
        grid: { color: "#374151" },
        beginAtZero: true,
      },
      x: {
        ticks: { color: "#d1d5db", font: { size: 12, weight: "bold" } },
        grid: { display: false },
      },
    },
  };

  // Convert the all_emotions object to a sorted array
  const allEmotionsArray = Object.entries(all_emotions || {})
    .map(([emotion, score]) => ({ emotion, score }))
    .sort((a, b) => b.score - a.score);

  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <span className="text-2xl">🎭</span>
          Emotion Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-zinc-300 text-sm">
        {/* Dominant Emotion Section */}
        <div className="bg-zinc-800/50 p-4 rounded-lg text-center">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
            Dominant Emotion
          </p>
          <p className="text-3xl font-bold text-white mt-1 capitalize">
            {EMOJI_MAP[dominant_emotion] || "🤔"} {dominant_emotion}
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            Confidence:{" "}
            <span className="font-bold text-white">
              {(confidence * 100).toFixed(1)}%
            </span>
          </p>
        </div>

        {/* Top 3 Emotions Chart */}
        <div className="mt-4">
          <strong className="text-white">Top 3 Emotions</strong>
          <div className="mt-2 h-48">
            <Bar data={emotionChartData} options={emotionChartOptions} />
          </div>
        </div>

        {/* All Emotions List */}
        {allEmotionsArray.length > 0 && (
          <div className="mt-4">
            <strong className="text-white">Full Analysis</strong>
            <ul className="mt-2 space-y-2">
              {allEmotionsArray.map(({ emotion, score }) => (
                <li
                  key={emotion}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="capitalize">
                    {EMOJI_MAP[emotion]} {emotion}
                  </span>
                  <div className="w-1/2 bg-zinc-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{
                        width: `${score * 100}%`,
                        backgroundColor: COLOR_MAP[emotion] || "#6b7280",
                      }}
                    ></div>
                  </div>
                  <span className="font-mono text-zinc-400 w-10 text-right">
                    {(score * 100).toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Emotion;
