import { ShieldCheck, Mail, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#08111F]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Top */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          {/* Logo & About */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-white">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  ScamShield
                </h2>

                <p className="text-sm text-green-400">
                  Intelligent URL Risk Analyzer
                </p>
              </div>
            </div>

            <p className="mt-5 leading-7 text-slate-400">
              ScamShield helps users identify potentially malicious
              websites using Machine Learning, enabling safer browsing
              and protection against phishing attacks.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="space-y-2">
              <a
                href="#home"
                className="block text-slate-400 transition hover:text-green-400"
              >
                Home
              </a>

              <a
                href="#about"
                className="block text-slate-400 transition hover:text-green-400"
              >
                About
              </a>

              <a
                href="mailto:support@scamshield.com"
                className="flex items-center justify-center gap-2 text-slate-400 transition hover:text-green-400 md:justify-end"
              >
                <Mail size={16} />
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-slate-800"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} ScamShield. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with
            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />
            for a safer web.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;