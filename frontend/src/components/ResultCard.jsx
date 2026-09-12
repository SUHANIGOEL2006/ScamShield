import {
  Link2,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const phishingProbability =
    Number(result.phishing_probability || 0) * 100;

  const legitimateProbability =
    Number(result.legitimate_probability || 0) * 100;

  const isPhishing = Number(result.prediction) === 0;

  const confidence = Math.max(
    phishingProbability,
    legitimateProbability
  );

  return (
    <div
      className={`w-full max-w-4xl mx-auto mt-6 rounded-2xl border overflow-hidden
      ${
        isPhishing
          ? "border-red-500/40 bg-[#0a111d]"
          : "border-emerald-500/30 bg-[#0a111d]"
      }
      shadow-[0_0_35px_rgba(16,185,129,0.06)]`}
    >
      {/* MAIN CONTENT */}
      <div className="p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-7">

          {/* LEFT SIDE */}
          <div
            className={`flex flex-col items-center justify-center
            md:border-r md:pr-6
            ${
              isPhishing
                ? "md:border-red-500/20"
                : "md:border-emerald-500/20"
            }`}
          >
            {/* Shield */}
            <div
              className={`relative flex items-center justify-center
              w-24 h-24 rounded-full
              ${
                isPhishing
                  ? "bg-red-500/10"
                  : "bg-emerald-500/10"
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full blur-xl opacity-30
                ${
                  isPhishing
                    ? "bg-red-500"
                    : "bg-emerald-400"
                }`}
              />

              {isPhishing ? (
                <ShieldAlert
                  size={64}
                  strokeWidth={1.5}
                  className="relative text-red-400"
                />
              ) : (
                <ShieldCheck
                  size={64}
                  strokeWidth={1.5}
                  className="relative text-emerald-400"
                />
              )}
            </div>

            {/* Status */}
            <h2
              className={`mt-4 text-lg font-bold tracking-wide text-center
              ${
                isPhishing
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {isPhishing
                ? "PHISHING DETECTED"
                : "SAFE WEBSITE"}
            </h2>

            {/* Description */}
            <p className="text-xs text-slate-400 text-center mt-2 leading-relaxed max-w-[190px]">
              {isPhishing
                ? "This URL appears suspicious and may be unsafe to visit."
                : "This URL seems to be safe based on our analysis."}
            </p>

            {/* URL */}
            <div
              className={`w-full mt-5 flex items-center gap-2 px-3 py-2.5
              rounded-xl border
              ${
                isPhishing
                  ? "border-red-500/20 bg-red-500/[0.03]"
                  : "border-emerald-500/20 bg-emerald-500/[0.03]"
              }`}
            >
              <Link2
                size={15}
                className={
                  isPhishing
                    ? "text-red-400 shrink-0"
                    : "text-emerald-400 shrink-0"
                }
              />

              <span className="text-xs text-slate-300 truncate">
                {result.url}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center">

            {/* Overall Confidence */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                Overall Confidence
              </span>

              <span
                className={`text-xl font-bold
                ${
                  isPhishing
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                {confidence.toFixed(2)}%
              </span>
            </div>

            {/* Confidence Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
              <div
                className={`h-full rounded-full transition-all duration-700
                ${
                  isPhishing
                    ? "bg-red-500"
                    : "bg-emerald-400"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>

            {/* Probability Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Legitimate */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-400">
                    Legitimate
                  </span>

                  <span className="text-sm font-semibold text-slate-200">
                    {legitimateProbability.toFixed(2)}%
                  </span>
                </div>

                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                    style={{
                      width: `${legitimateProbability}%`,
                    }}
                  />
                </div>
              </div>

              {/* Phishing */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-red-400">
                    Phishing
                  </span>

                  <span className="text-sm font-semibold text-slate-200">
                    {phishingProbability.toFixed(2)}%
                  </span>
                </div>

                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${phishingProbability}%`,
                    }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM MESSAGE */}
      <div
        className={`mx-5 mb-5 px-4 py-3 rounded-xl border flex items-center justify-center gap-3 text-center
        ${
          isPhishing
            ? "border-red-500/20 bg-red-500/[0.04]"
            : "border-emerald-500/20 bg-emerald-500/[0.04]"
        }`}
      >
        {isPhishing ? (
          <AlertTriangle
            size={18}
            className="text-red-400 shrink-0"
          />
        ) : (
          <CheckCircle2
            size={18}
            className="text-emerald-400 shrink-0"
          />
        )}

        <p className="text-xs text-slate-300">
          {isPhishing
            ? "Be cautious. This website may be unsafe or attempt to steal your information."
            : "No suspicious activity found. This website is likely safe to visit."}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;