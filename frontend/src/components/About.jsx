import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
  {
    number: "90%",
    title: "Cyber Attacks",
    description:
      "Approximately 90% of cyber attacks begin with phishing emails or malicious links.",
  },
  {
    number: "3.4B+",
    title: "Phishing Emails",
    description:
      "Over 3.4 billion phishing emails are estimated to be sent worldwide every day.",
  },
  {
    number: "1M+",
    title: "Malicious Websites",
    description:
      "More than one million phishing and malicious websites are detected each year.",
  },
  {
    number: "$12B+",
    title: "Annual Losses",
    description:
      "Cyber scams and phishing attacks result in billions of dollars in financial losses annually.",
  },
];
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#08111F] px-6 py-28"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-green-500/10 blur-[130px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-sm font-medium uppercase tracking-wider text-green-400">
            About ScamShield
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Protecting Users from Malicious Websites,
            <br />
            One URL at a Time.
          </h2>
        </div>

        {/* Story */}

        <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-700/60 bg-[#101B2D]/60 p-10 backdrop-blur-lg">
          <div className="border-l-4 border-green-500 pl-8">
          <p className="text-lg leading-9 text-slate-300">
            The internet has become an essential part of our daily lives,
            but it has also become a common target for cybercriminals.
            Every day, thousands of fraudulent websites imitate trusted
            platforms to steal sensitive information such as passwords,
            banking credentials, and personal data through phishing
            attacks and online scams.
          </p>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            <span className="font-semibold text-green-400">
              ScamShield
            </span>{" "}
            is a Machine Learning-powered URL Risk Analyzer that helps
            users identify potentially malicious websites before they
            interact with them. Instead of relying only on traditional
            blacklists, ScamShield evaluates multiple URL characteristics
            including domain structure, HTTPS usage, suspicious keywords,
            special characters, URL length, and other security indicators
            to estimate the likelihood of phishing or malicious activity.
          </p>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            By providing an intelligent risk assessment within seconds,
            ScamShield enables users to make informed decisions, reduce
            exposure to cyber threats, and browse the internet with
            greater confidence.
          </p>
          </div>
        </div>

        {/* Statistics */}

        <div className="mt-24">
          <h3 className="mb-12 text-center text-3xl font-bold text-white">
            The Growing Impact of Cyber Threats
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div
                ref={ref}
                key={index}
                className="group rounded-3xl border border-slate-700 bg-[#101B2D]/70 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-500/40 hover:shadow-[0_0_35px_rgba(34,197,94,.15)]"
              >
                <h2 className="text-5xl font-extrabold text-green-400">
                  {item.number}
                </h2>

                <h4 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h4>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;