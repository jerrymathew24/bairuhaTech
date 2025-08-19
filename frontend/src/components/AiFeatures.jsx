import Image from "next/image";

const features = [
  {
    id: 1,
    title: "AI Talent Matching",
    description:
      "Struggling to find the right developers? Our AI curates a list of top talents tailored to your project, letting you focus only on meaningful interviews.",
    img: "/interview.jpg",
  },
  {
    id: 2,
    title: "Reimagining Workflows",
    description:
      "Say goodbye to repetitive tasks. We use AI to automate manual processes, freeing your team to focus on strategic, high-value innovation.",
    img: "/reimagine.jpg",
  },
  {
    id: 3,
    title: "Optimize Costs with AI",
    description:
      "Our AI-driven models cut hiring and development costs by up to 65% while keeping productivity high. Transparent pricing, predictable outcomes.",
    img: "/costcut.jpg",
  },
];

export default function AiFeatures() {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-50 via-sky-100 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center bg-white/70 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl p-8 hover:shadow-xl transition"
            >
              <div className="w-full h-40 mb-6 relative">
                <Image
                  src={feature.img}
                  alt={feature.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
