"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
};

type Application = {
  id: number;
  name: string;
  email: string;
  resumePath: string;
  job?: Job;
};

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [newJob, setNewJob] = useState<Omit<Job, "id">>({
    title: "",
    description: "",
    location: "",
    type: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/jobs")
      .then((res) => res.json())
      .then((data: Job[]) => setJobs(data));

    fetch("http://localhost:3001/applications")
      .then((res) => res.json())
      .then((data: Application[]) => setApplications(data));
  }, []);

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:3001/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    const res = await fetch("http://localhost:3001/jobs");
    const updated = await res.json();
    setJobs(updated);
    setNewJob({ title: "", description: "", location: "", type: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Add Job Form */}p
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
        <form onSubmit={handleAddJob} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full border p-2 rounded"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Job Type (Full-time, Part-time, etc.)"
            className="w-full border p-2 rounded"
            value={newJob.type}
            onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Add Job
          </button>
        </form>
      </div>
      {/* Jobs List */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
        <ul className="space-y-2">
          {jobs.map((job) => (
            <li key={job.id} className="border-b pb-2">
              <strong>{job.title}</strong> - {job.location} ({job.type})
            </li>
          ))}
        </ul>
      </div>
      {/* Applications List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Applications</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Job</th>
              <th className="p-2 border">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="text-center">
                <td className="p-2 border">{app.name}</td>
                <td className="p-2 border">{app.email}</td>
                <td className="p-2 border">{app.job?.title}</td>
                <td className="p-2 border">
                  <a
                    href={`http://localhost:3001/applications/download/${app.resumePath}`}
                    className="text-blue-500 hover:underline"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
