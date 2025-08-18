// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-20 md:pt-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-800 text-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 py-12 md:py-20 lg:py-28 gap-8 md:gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="uppercase text-xs sm:text-sm tracking-widest font-semibold text-white/80">
            AI-Driven Innovation
          </p>

          <h1 className="sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug md:leading-tight mt-3">
            Bairuha Tech <br />
            <span className="text-white">powers teams with AI</span> <br />
            for intelligent software development.
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-md sm:max-w-xl mx-auto md:mx-0">
            From idea to deployment, we harness artificial intelligence to
            automate workflows, accelerate delivery, and ensure scalable
            enterprise solutions built for the future.
          </p>

          <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-indigo-800 font-semibold shadow-lg hover:bg-gray-100 transition">
            Get a Proof of Concept
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end w-full">
          <Image
            src="/hero.jpg" // keep in public/
            alt="AI-powered development illustration"
            width={500}
            height={400}
            priority
            className="w-4/5 sm:w-3/4 md:w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-xl object-contain shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
