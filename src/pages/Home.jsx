import React from "react";


export default function Home() {
  const modules = [
    { name: "Vocabulary", path: "/Vocabulary", emoji: "📖" },
    { name: "Idioms", path: "/Idioms", emoji: "💡" },
    { name: "OneWordSubstitutions", path: "/OneWordSubstitution", emoji: "✍️" },
    { name: "PhrasalVerbs", path: "/Phrasalverbs", emoji: "🌀" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-center p-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Welcome Back 👋
      </h1>

      {/* Motivational line */}
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-10">
        Consistency is the key to cracking exams. Choose your practice module below 👇
      </p>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {modules.map((mod, idx) => (
          <a
            key={idx}
            href={mod.path}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all flex flex-col items-center"
          >
            <span className="text-4xl mb-3">{mod.emoji}</span>
            <h2 className="text-lg font-semibold text-gray-800">{mod.name}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
