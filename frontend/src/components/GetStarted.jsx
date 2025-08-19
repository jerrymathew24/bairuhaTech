// components/GetStarted.tsx
import Image from "next/image";

export default function GetStarted() {
  return (
    <section
      id="get-started"
      className="bg-gradient-to-b from-sky-50 to-sky-100 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 gap-12">
        
        {/* Left Illustration */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Image
            src="/getstarted.jpg" // <-- put your getstarted.PNG inside public/
            alt="Advisory Expert"
            width={500}
            height={400}
            className="w-4/5 sm:w-3/4 md:w-full max-w-md h-auto rounded-3xl"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="uppercase text-xs sm:text-sm font-semibold text-indigo-800 tracking-widest">
            Get Started
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-900 mt-3">
            Talk To An Advisory Expert
          </h2>

          <p className="mt-3 text-gray-700 max-w-lg mx-auto md:mx-0">
            Our AI-powered software engineers can answer your business and technical questions.
          </p>

          {/* Bullet Points */}
          <ul className="mt-6 space-y-4 text-gray-800 text-base sm:text-lg">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-indigo-600"></span>
              <span>
                Keep your business outcomes on track with flexible AI engineers ready to fill in the gaps in your workforce.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-indigo-600"></span>
              <span>
                Unlock immediate value through AI staff augmentation that requires no onboarding, training, or ongoing support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2 rounded-full bg-indigo-600"></span>
              <span>
                Redeploy your skilled human workers to high-value tasks that accelerate growth across the business.
              </span>
            </li>
          </ul>

          {/* CTA Button */}
          <button className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-700 text-white font-semibold shadow-lg hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
