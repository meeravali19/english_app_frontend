// src/pages/PrivacyPolicy.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
          <h1 className="text-lg md:text-xl font-semibold">Privacy Policy</h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <article className="rounded-2xl border bg-white shadow-sm p-5 md:p-8 leading-relaxed">
          <p className="text-sm text-slate-500 mb-6">
            Effective Date: <span className="font-medium">22-08-2025</span>
          </p>

          <p className="mb-6">
            At <span className="font-semibold">Infinite Pratice</span>,
            we respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our services.
          </p>

          {/* Sections */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                We do not collect personally identifiable information unless you
                provide it voluntarily.
              </li>
              <li>
                Our site may use cookies and third-party services such as Google
                AdSense.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">2. How We Use Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To improve the overall user experience.</li>
              <li>To provide relevant content and personalized advertisements.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">3. Third-Party Services</h2>
            <p>
              Google AdSense and other third-party vendors may use cookies to
              serve ads based on your prior visits to our site or other websites.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">4. Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect
              your personal information from unauthorized access, disclosure,
              alteration, or destruction.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You can disable cookies at any time through your browser settings.
              </li>
              <li>
                You have the right to contact us for any questions regarding this
                Privacy Policy.
              </li>
            </ul>
          </section>

          <p className="mt-8 text-sm text-slate-600">
            By using our website/app, you agree to the terms of this Privacy Policy.
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
