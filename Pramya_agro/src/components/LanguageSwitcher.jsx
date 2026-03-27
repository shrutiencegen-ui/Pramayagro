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

  const changeLanguage = (lang) => {
    setActive(lang);
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="flex items-center gap-2">

      {/* hidden google */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {[
        { code: "en", label: "EN" },
        { code: "hi", label: "HI" },
        { code: "mr", label: "MR" },
      ].map((lng) => (
        <button
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
            active === lng.code
              ? "bg-emerald-500 text-black shadow-md"
              : "border border-white/20 text-gray-300 hover:bg-emerald-500 hover:text-black"
          }`}
        >
          {lng.label}
        </button>
      ))}
    </div>
  );
}