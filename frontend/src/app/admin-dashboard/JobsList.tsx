"use client";

export default function JobsList({
  jobs,
  onDelete,
}: {
  jobs: any[];
  onDelete: (id: number) => void;
}) {
  return (
    <section className="mt-8 max-w-3xl mx-auto">
      <h1 className="text-3xl mt-11 font-extrabold text-gray-700 mb-6 text-center">
        Posted Job Openings
      </h1>
      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 bg-white/70 backdrop-blur-md rounded-2xl flex justify-between items-center border border-purple-300 hover:scale-105 transition-transform duration-200"
            >
              <div>
                <h3 className="font-bold text-blue-800 text-lg">{job.title}</h3>
                <p className="text-blue-600">{job.description}</p>
                <p className="text-sm text-blue-500">
                  {job.location} • {job.type}
                </p>
              </div>
              <button
                onClick={() => onDelete(job.id)}
                className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-white font-semibold shadow-md transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic text-center">No jobs posted yet.</p>
      )}
    </section>
  );
}
