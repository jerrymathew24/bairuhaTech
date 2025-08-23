"use client";

export default function JobForm({
  jobForm,
  setJobForm,
  onSubmit,
}: {
  jobForm: { title: string; description: string; location: string; type: string };
  setJobForm: (job: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <section>
      <h1 className="text-3xl mt-11 font-extrabold text-gray-600 mb-6 text-center">
        Add New Job Opening
      </h1>

      <form
        onSubmit={onSubmit}
        className="bg-white/70 backdrop-blur-md p-6 rounded-2xl space-y-4 max-w-md mx-auto border border-blue-300"
      >
        <input
          type="text"
          placeholder="Job Title"
          value={jobForm.title}
          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
          className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Description"
          value={jobForm.description}
          onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
          className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={jobForm.location}
          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
          className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Type (Full-time / Part-time)"
          value={jobForm.type}
          onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
          className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
        >
          Add Job
        </button>
      </form>
    </section>
  );
}
