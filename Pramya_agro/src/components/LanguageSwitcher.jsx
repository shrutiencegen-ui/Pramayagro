"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [active, setActive] = useState("en");

  useEffect(() => {
    // ✅ Prevent multiple script load
    if (window.googleTranslateLoaded) return;
    window.googleTranslateLoaded = true;

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,mr",
        },
        "google_translate_element"
      );
    };
  }, []);

  // ❌ REMOVE interval loop (major bug source)
  // Instead use one-time fix
  useEffect(() => {
    const timer = setTimeout(() => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.style.display = "none";
      document.body.style.top = "0px";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (lang) => {
    setActive(lang);

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="relative inline-block text-left">

      {/* Hidden Google Element */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom Button */}
      <button className="inline-flex items-center justify-center gap-2 w-24 px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg shadow-md hover:bg-emerald-600 transition">
        {active.toUpperCase()}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Invisible Select */}
      <select
        className="absolute inset-0 opacity-0 cursor-pointer"
        value={active}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">EN</option>
        <option value="hi">HI</option>
        <option value="mr">MR</option>
      </select>

    </div>
  );
}