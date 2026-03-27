"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [active, setActive] = useState("en");

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,mr",
        },
        "google_translate_element"
      );
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.style.display = "none";
      document.body.style.top = "0px";
    }, 500);
    return () => clearInterval(interval);
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
      {/* hidden google */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <button
        className="inline-flex justify-between items-center w-24 px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none"
        onClick={() => setActive((prev) => prev)} // toggle handled by select
      >
        {active.toUpperCase()}
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <select
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        value={active}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
      </select>
    </div>
  );
}