import { ShieldCheck } from "lucide-react";
import shield from "../assets/shield.png";

function HeroIllustration() {
  return (
     <div className="relative flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute h-[380px] w-[380px] rounded-full bg-green-500/15 blur-[120px]"></div>

      {/* Rotating Ring */}
      <div className="absolute h-[360px] w-[360px] rounded-full border border-green-500/15 animate-spin-slow"></div>

      {/* Second Ring */}
      <div className="absolute h-[290px] w-[290px] rounded-full border border-green-500/10"></div>

      {/* Image */}
      <img
        src={shield}
        alt="Cyber Shield"
        className="floating relative z-20 w-[430px] select-none drop-shadow-[0_0_35px_rgba(34,197,94,0.4)]"
        draggable="false"
      />

    </div>
  );
}

export default HeroIllustration;