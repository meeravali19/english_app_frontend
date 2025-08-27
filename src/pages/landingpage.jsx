import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  MessageSquare,
  Briefcase,
  Rocket,
  Lightbulb,
  Repeat,
  Edit,
  Menu,
  X,
} from "lucide-react";

// ==================== Data ====================
const importancePoints = [
  {
    title: "Exam Success",
    description:
      "Strong English skills help you score better in competitive exams and secure higher marks.",
    icon: <BookOpen className="w-12 h-12 text-blue-600 mb-4" />,
  },
  {
    title: "Communication Skills",
    description:
      "Fluent English boosts your ability to communicate effectively in interviews and daily life.",
    icon: <MessageSquare className="w-12 h-12 text-green-600 mb-4" />,
  },
  {
    title: "Career Growth",
    description:
      "Better English proficiency opens doors to more job opportunities and career advancement.",
    icon: <Briefcase className="w-12 h-12 text-purple-600 mb-4" />,
  },
  {
    title: "Confidence Booster",
    description:
      "Speaking English with ease increases your confidence in both professional and social settings.",
    icon: <Rocket className="w-12 h-12 text-red-600 mb-4" />,
  },
];

const features = [
  {
    id: 1,
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    title: "Vocabulary Practice",
    description:
      "Learn new words daily with synonyms, antonyms, and context examples.",
  },
  {
    id: 2,
    icon: <Lightbulb className="w-8 h-8 text-green-500" />,
    title: "Idioms & Phrases",
    description:
      "Understand common idioms and phrases with examples for better fluency.",
  },
  {
    id: 3,
    icon: <Repeat className="w-8 h-8 text-purple-500" />,
    title: "Phrasal Verbs",
    description:
      "Master commonly used phrasal verbs with quizzes and usage examples.",
  },
  {
    id: 4,
    icon: <Edit className="w-8 h-8 text-yellow-500" />,
    title: "One-Word Substitution",
    description:
      "Quickly practice synonyms and one-word substitutions for exams.",
  },
  {
    id: 5,
    icon: <Repeat className="w-8 h-8 text-red-500" />,
    title: "Infinite Quiz Practice",
    description:
      "Practice unlimited quizzes to test and improve your English skills.",
  },
];

// ==================== Components ====================

// Navbar
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="Infinite Practice Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="text-gray-800">Infinite</span>{" "}
            <span className="text-blue-700">Practice</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden sm:flex space-x-6 text-gray-700 font-medium">
          <li><a href="#home" className="hover:text-blue-500">Home</a></li>
          <li><a href="#features" className="hover:text-blue-500">Features</a></li>
          <li><a href="#about" className="hover:text-blue-500">About Us</a></li>
          <li><a href="#importance" className="hover:text-blue-500">Importance</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col space-y-4 py-4 px-6 text-gray-700 font-medium">
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About Us</a></li>
            <li><a href="#importance" onClick={() => setMenuOpen(false)}>Importance</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-12"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-700 leading-snug">
        Empower Your Learning Journey 🚀
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto mb-8">
        Stay consistent, stay motivated, and achieve your goals. Start preparing smarter, not harder.
      </p>
      <Link to="/home">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Start Learning
        </button>
      </Link>
    </section>
  );
}

// Features Section
function Features() {
  return (
    <section id="features" className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Key Features
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 bg-gradient-to-r from-blue-100 to-blue-200 py-16"
    >
      <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center"> About Us</h3>
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl">
        {/* Left - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Student preparing for exam"
            className="w-72 md:w-96 max-w-full drop-shadow-xl rounded-full"
          />
        </div>
        {/* Right - Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            English Mastery was built with one vision — to make English learning{" "}
            <span className="font-semibold text-blue-700">simple, effective, and motivating</span>.
            We understand the struggles of preparing for competitive exams: endless word lists,
            tricky grammar, and pressure to perform. That’s why we designed a platform
            that provides a <span className="font-semibold">structured pathway to success</span>.
          </p>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            Our mission is to help students stay consistent, boost their confidence,
            and build English as a skill for life — not just an exam subject.
          </p>
        </div>
      </div>
    </section>
  );
}

// Importance Section
function Importance() {
  return (
    <section id="importance" className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          Why English is Important?
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {importancePoints.map((point, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 flex flex-col items-center"
            >
              {point.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{point.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 border-t mt-10">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} Infinite Practice. All rights reserved.
        • <Link to="/privacy-policy" className="underline ml-1">Privacy Policy</Link> • 
        <Link to="/terms-and-conditions" className="underline ml-1">Terms & Conditions</Link>
      </p>
    </footer>
  );
}

// ==================== Main Landing Page ====================
export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 scroll-smooth overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Importance />
      <Footer />
    </div>
  );
}
