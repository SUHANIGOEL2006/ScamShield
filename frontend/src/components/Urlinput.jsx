import { Link2, Search } from "lucide-react";
import { useState } from "react";
import { analyzeURL } from "../services/api";
import ResultCard from "./ResultCard";

function UrlInput() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      alert("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const data = await analyzeURL(trimmedUrl);

      console.log("Backend response:", data);

      setResult(data);
    } catch (error) {
      console.error("Error:", error);

      alert(
        "Could not connect to the backend. Please make sure the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-28 max-w-5xl">

      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white">
          Analyze Any Website Instantly
        </h2>

        <p className="mt-3 text-slate-400">
          Paste a URL below and let our Machine Learning model detect phishing
          or malicious websites in real time.
        </p>
      </div>

      {/* Input Card */}
      <form
        onSubmit={handleSubmit}
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          p-4
          shadow-[0_0_60px_rgba(34,197,94,0.10)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-green-500/30
          hover:shadow-[0_0_70px_rgba(34,197,94,0.18)]
        "
      >
        <div className="flex flex-col gap-4 md:flex-row">

          {/* Input */}
          <div
            className="
              flex
              flex-1
              items-center
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-[#101B2D]
              px-6
              transition-all
              focus-within:border-green-500
              focus-within:shadow-[0_0_25px_rgba(34,197,94,.35)]
            "
          >
            <Link2
              size={22}
              className="text-green-400"
            />

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a suspicious URL..."
              disabled={loading}
              className="
                h-16
                w-full
                bg-transparent
                text-white
                outline-none
                placeholder:text-slate-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-emerald-400
              px-10
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_12px_40px_rgba(34,197,94,.45)]
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:scale-100
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Search size={20} />

              {loading ? "Analyzing..." : "Analyze URL"}
            </span>

            {/* Shine Effect */}
            <span
              className="
                absolute
                left-[-120%]
                top-0
                h-full
                w-1/2
                rotate-12
                bg-white/30
                blur-lg
                transition-all
                duration-700
                hover:left-[150%]
              "
            />
          </button>
        </div>
      </form>

      {/* Result */}
      <ResultCard result={result} />

      {/* Privacy */}
      <p className="mt-5 text-center text-sm text-slate-400">
        🔒 We never store your URLs. Your privacy is our priority.
      </p>

    </div>
  );
}

export default UrlInput;