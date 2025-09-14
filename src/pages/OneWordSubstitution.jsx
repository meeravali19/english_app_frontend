import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../components/LoadingAnimation";

export default function OneWordSubstitution() {
  const [mode, setMode] = useState('list');
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quizItem, setQuizItem] = useState(null);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE = `${API_URL}/onewordsubs`;

  // Fetch substitutions from API
  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    try {
      setLoading(true); 
      const res = await axios.get(API_BASE);
      setSubs(res.data);
    } catch (err) {
      console.error('Error fetching substitutions:', err);
    }finally {
      setLoading(false);
    }
  };

  // Quiz helpers
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  const startQuiz = () => {
    if (!subs.length) {
      alert('No data available for quiz.');
      return;
    }
    const item = subs[Math.floor(Math.random() * subs.length)];
    const distractors = subs
      .filter(s => s._id !== item._id)
      .map(s => s.substitution);

    const wrong = shuffle([...new Set(distractors)]).slice(0, 3);
    const options = shuffle([...wrong, item.substitution]);

    setQuizItem({ ...item, options });
    setSelected('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (!quizItem) return;
    setFeedback(
      selected === quizItem.substitution
        ? '✅ Correct!'
        : `❌ Wrong. Correct: ${quizItem.substitution}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-6 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        
        {/* Header Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
          <button
            onClick={() => { setMode('quiz'); startQuiz(); }}
            className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 hover:scale-105 transition"
          >
            💡 Quiz
          </button>
          <button
            onClick={() => setMode('list')}
            className="flex-1 sm:flex-none px-4 py-2 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 hover:scale-105 transition"
          >
            📜 View List
          </button>
        </div>

        {/* Quiz Mode */}
        {mode === 'quiz' && quizItem && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-purple-700">
              What is the one word for <span className="text-blue-600 break-words">"{quizItem.phrase}"</span>?
            </h2>
            <div className="space-y-3">
              {quizItem.options.map((opt, i) => (
                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                    className="h-4 w-4"
                  />
                  <span className="text-gray-700 break-words">{opt}</span>
                </label>
              ))}
            </div>
            {!feedback ? (
              <button
                onClick={checkAnswer}
                disabled={!selected}
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 hover:scale-105 transition disabled:opacity-50"
              >
                Submit
              </button>
            ) : (
              <>
                <p className={`mt-3 font-semibold text-lg ${feedback.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
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
        {mode === 'list' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Saved One Word Substitutions</h2>
            {loading ? (
              <Loader /> // <-- show loader while fetching
            ) : subs.length === 0 ? (
              <p className="text-gray-600">No one word substitutions saved.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {subs.map((s) => (
                  <li
                    key={s._id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl shadow-sm transition hover:bg-blue-50"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-indigo-500 text-lg">💡</span>
                      <div>
                        <p className="font-semibold text-indigo-700 text-lg break-words">{s.phrase}</p>
                        <p className="text-green-700 font-bold mt-1 break-words">{s.substitution}</p>
                        <p className="text-sm text-gray-600 mt-1 break-words">{s.meaning}</p>
                      </div>
                    </div>
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
