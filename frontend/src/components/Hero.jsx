import { ShieldCheck, Lock } from "lucide-react";
import UrlInput from "./UrlInput";
import HeroIllustration from "./HeroIllustration";

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#08111F] px-6 pt-24 pb-20"
    >
      {/* Background Glow */}
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-green-500/10 blur-[140px]" />
      <div className="absolute -right-20 top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-10 lg:px-16 xl:px-24">

        {/* Hero Content */}
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 backdrop-blur-md">
              <ShieldCheck size={18} />
              Machine Learning Powered
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white lg:text-7xl">
              Analyze URLs
              <br />
              <span className="text-green-500">
                Before You Click.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              Detect phishing, malicious and suspicious websites before opening
              them using our intelligent Machine Learning based URL Risk
              Analyzer.
            </p>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <HeroIllustration />
          </div>

        </div>

        {/* URL INPUT */}
        <div className="mt-16 flex flex-col items-center">

          <div className="w-full max-w-3xl">
            <UrlInput />
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
            <Lock size={16} />
            No URLs are stored. Your privacy comes first.
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;