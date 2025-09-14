import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/LoadingAnimation";

export default function Idioms() {
  const [mode, setMode] = useState("list");
  const [idioms, setIdioms] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [quizItem, setQuizItem] = useState(null);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE = `${API_URL}/idioms`;

  useEffect(() => {
    fetchIdioms();
  }, []);

  const fetchIdioms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setIdioms(res.data);
    } catch (err) {
      console.error("Error fetching idioms:", err);
    }finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (!idioms.length) return;
    const item = idioms[Math.floor(Math.random() * idioms.length)];
    const wrong = shuffle(
      idioms.filter((i) => i._id !== item._id).map((i) => i.meaning)
    ).slice(0, 3);
    const options = shuffle([...wrong, item.meaning]);
    setQuizItem({ ...item, options });
    setSelected("");
    setFeedback("");
  };

  const checkAnswer = () => {
    if (!quizItem) return;
    setFeedback(
      selected === quizItem.meaning
        ? "✅ Correct!"
        : `❌ Wrong. Correct: ${quizItem.meaning}`
    );
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Header Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-3 mb-6">
          <button
            onClick={() => {
              setMode("quiz");
              startQuiz();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition"
          >
            📝 Quiz
          </button>
          <button
            onClick={() => setMode("list")}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 hover:scale-105 transition"
          >
            📜 View List
          </button>
        </div>

        {/* Quiz Mode */}
        {mode === "quiz" && quizItem && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-purple-700">
              What is the meaning of{" "}
              <span className="text-blue-600">"{quizItem.idiom}"</span>?
            </h2>
            <div className="space-y-2">
              {quizItem.options.map((opt, i) => (
                <label
                  key={i}
                  className="block p-2 border rounded-lg cursor-pointer hover:bg-purple-50"
                >
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {!feedback && (
              <button
                onClick={checkAnswer}
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 hover:scale-105 transition"
              >
                Submit
              </button>
            )}
            {feedback && (
              <>
                <p
                  className={`mt-3 font-semibold text-lg ${
                    feedback.startsWith("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {feedback}
                </p>
                <button
                  onClick={startQuiz}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 hover:scale-105 transition"
                >
                  Next
                </button>
              </>
            )}
          </div>
        )}

        {/* List Mode */}
        {mode === "list" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Saved Idioms
            </h2>
            
            {loading ? (
              <Loader /> // <-- show loader while fetching
            ) : idioms.length === 0 ? (
              <p className="text-gray-600">No idioms saved.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {idioms.map((i) => (
                  <li
                    key={i._id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 rounded-xl shadow-sm transition hover:bg-blue-50"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="text-indigo-500 text-lg">📝</span>
                      <div>
                        <p className="font-semibold text-indigo-700 text-lg">
                          {i.idiom}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {i.meaning}
                        </p>
                      </div>
                    </div>
                    {/* 🗑️ Delete button removed here */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
