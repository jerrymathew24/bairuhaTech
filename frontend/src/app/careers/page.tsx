"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to load jobs", err));
  }, []);

  const handleApply = (jobId: number) => {
    router.push(`/careers/${jobId}/apply`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl text-center font-bold text-blue-800 mb-6">Careers</h1>
      <div className="space-y-6 max-w-3xl mx-auto">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="p-6 bg-white shadow rounded-lg border">
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleApply(job.id)}
              >
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No job openings available right now.</p>
        )}
      </div>
    </div>
  );
}
