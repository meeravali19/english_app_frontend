import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/LoadingAnimation";


export default function Vocabulary() {
  const [mode, setMode] = useState("list"); // default to list or quiz
  const [vocabList, setVocabList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quizItem, setQuizItem] = useState(null);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE = `${API_URL}/vocabulary`;

  // Fetch vocab list
  const fetchVocab = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setVocabList(res.data);
    } catch (err) {
      console.error("Error fetching vocab:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocab();
  }, []);

  // Quiz helpers
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const startQuiz = () => {
    if (!vocabList.length) return;
    const item = vocabList[Math.floor(Math.random() * vocabList.length)];
    const quizTypes = ["meaning"];
    if (item.synonyms?.length) quizTypes.push("synonym");
    if (item.antonyms?.length) quizTypes.push("antonym");
    const quizType = quizTypes[Math.floor(Math.random() * quizTypes.length)];

    let options = [];
    let question = "";
    let answer = "";

    if (quizType === "meaning") {
      question = `What is the meaning of "${item.word}"?`;
      const wrong = shuffle(
        vocabList.filter((v) => v.word !== item.word).map((v) => v.meaning)
      ).slice(0, 3);
      options = shuffle([...wrong, item.meaning]);
      answer = item.meaning;
    } else if (quizType === "synonym") {
      question = `Which of the following is a synonym of "${item.word}"?`;
      answer = item.synonyms[Math.floor(Math.random() * item.synonyms.length)];
      const wrong = shuffle(
        vocabList
          .filter((v) => v.word !== item.word && v.synonyms?.length)
          .flatMap((v) => v.synonyms)
          .filter((s) => !item.synonyms.includes(s))
      ).slice(0, 3);
      options = shuffle([...wrong, answer]);
    } else if (quizType === "antonym") {
      question = `Which of the following is an antonym of "${item.word}"?`;
      answer = item.antonyms[Math.floor((Math.random() * item.antonyms.length))];
      const wrong = shuffle(
        vocabList
          .filter((v) => v.word !== item.word && v.antonyms?.length)
          .flatMap((v) => v.antonyms)
          .filter((a) => !item.antonyms.includes(a))
      ).slice(0, 3);
      options = shuffle([...wrong, answer]);
    }

    setQuizItem({ ...item, options, question, answer });
    setSelected("");
    setFeedback("");
  };

  const checkAnswer = () => {
    if (!quizItem) return;
    setFeedback(
      selected === quizItem.answer
        ? "✅ Correct!"
        : `❌ Wrong. Correct: ${quizItem.answer}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-6 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        {/* Header Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={() => {
              setMode("quiz");
              startQuiz();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
          >
            📚 Quiz
          </button>
          <button
            onClick={() => setMode("list")}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 transition"
          >
            📜 View List
          </button>
        </div>

        {/* Quiz */}
        {mode === "quiz" && quizItem && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-purple-700">
              {quizItem.question}
            </h2>
            <div className="space-y-2">
              {quizItem.options.map((opt, i) => (
                <label
                  key={i}
                  className="block p-2 border rounded-md hover:bg-purple-50 cursor-pointer"
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
                className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
              >
                Submit
              </button>
            )}
            {feedback && (
              <>
                <p
                  className={`mt-3 font-semibold text-base sm:text-lg ${
                    feedback.startsWith("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {feedback}
                </p>
                <button
                  onClick={startQuiz}
                  className="mt-4 w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  Next
                </button>
              </>
            )}
          </div>
        )}

        {/* List */}
        {mode === "list" && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Saved Vocabulary
            </h2>
            {loading ? (
              <Loader/>
            ) : vocabList.length === 0 ? (
              <p className="text-gray-600">No vocabulary saved.</p>
            ) : (
              vocabList.map((v) => (
                <div key={v._id} className="overflow-x-auto">
                  <table className="min-w-[350px] w-full border border-gray-300 rounded-xl shadow-sm mb-2 bg-white">
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="text-lg sm:text-2xl font-bold text-indigo-700 py-2 text-center border-b border-gray-200"
                        >
                          {v.word}
                        </th>
                      </tr>
                      <tr>
                        <td
                          colSpan={2}
                          className="text-sm sm:text-md text-green-700 py-2 text-center border-b border-gray-100 font-semibold"
                        >
                          {v.meaning}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="align-top w-1/2 px-2 sm:px-4 py-2 border-r border-gray-100">
                          <span className="font-semibold text-blue-700">
                            Synonyms:
                          </span>
                          <ul className="list-disc list-inside text-blue-700 mt-1 text-sm">
                            {v.synonyms?.length > 0 ? (
                              v.synonyms.map((s, i) => <li key={i}>{s}</li>)
                            ) : (
                              <li className="text-gray-400">None</li>
                            )}
                          </ul>
                        </td>
                        <td className="align-top w-1/2 px-2 sm:px-4 py-2">
                          <span className="font-semibold text-red-700">
                            Antonyms:
                          </span>
                          <ul className="list-disc list-inside text-red-700 mt-1 text-sm">
                            {v.antonyms?.length > 0 ? (
                              v.antonyms.map((a, i) => <li key={i}>{a}</li>)
                            ) : (
                              <li className="text-gray-400">None</li>
                            )}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {v.example && (
                    <div className="text-green-700 text-sm italic text-center mb-2">
                      Example: {v.example}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
