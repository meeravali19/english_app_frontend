// src/pages/TermsAndConditions.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl px-3 py-2 text-sm font-medium border hover:bg-slate-50 active:scale-[0.99] transition"
          >
            ← Back
          </button>
          <h1 className="text-lg md:text-xl font-semibold">Terms & Conditions</h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <article className="rounded-2xl border bg-white shadow-sm p-5 md:p-8 leading-relaxed">
          <p className="text-sm text-slate-500 mb-6">
            Effective Date: <span className="font-medium">22-08-2025</span>
          </p>

          <p className="mb-6">
            These Terms & Conditions govern your use of{" "}
            <span className="font-semibold">Infinite Pratice</span>. By
            accessing or using our services, you agree to comply with these
            terms. Please read them carefully.
          </p>

          {/* Sections */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                By using our site, you agree to comply with these Terms &
                Conditions.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">2. Use of Website</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>The content is for educational and personal use only.</li>
              <li>You may not copy, sell, or misuse the material in any way.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">3. Intellectual Property</h2>
            <p>
              All content, including quizzes and learning material, is the
              property of <span className="font-semibold">[Your Website/App Name]</span> and
              is protected under applicable intellectual property laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">4. Third-Party Ads</h2>
            <p>
              Advertisements displayed on our platform are provided by Google
              AdSense or its partners. We are not responsible for the accuracy,
              relevance, or safety of third-party ad content.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">5. Limitation of Liability</h2>
            <p>
              We are not responsible for technical issues, errors, or damages
              arising from the use of our website/app. Your use of the site is at
              your own risk.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">6. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by the laws of{" "}
              <span className="font-semibold">India</span>, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <p className="mt-8 text-sm text-slate-600">
            By using our website/app, you acknowledge that you have read,
            understood, and agreed to these Terms & Conditions.
          </p>
        </article>

        {/* Bottom back link */}
        <div className="mx-auto max-w-4xl px-1 py-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm underline underline-offset-4 hover:no-underline"
          >
            ← Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
