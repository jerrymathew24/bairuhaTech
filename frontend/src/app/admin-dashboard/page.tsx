"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
  });
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/admin-login");
      return;
    }

    fetch("http://localhost:3000/contact/submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSubmissions(data))
      .catch((err) => console.error("Failed to load submissions", err));

    fetch("http://localhost:3000/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load jobs", err));

    fetch("http://localhost:3000/applications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setApplications(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load applications", err));
  }, [router, token]);

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobForm),
      });
      const data = await res.json();
      if (res.ok) {
        setJobs((prev) => [...prev, data]);
        setJobForm({ title: "", description: "", location: "", type: "" });
      } else {
        alert("Error: " + (data.message || "Could not create job"));
      }
    } catch (err) {
      console.error("Failed to add job", err);
      alert("Something went wrong while adding the job");
    }
  };

  const deleteJob = async (jobId: number) => {
    if (!token || !confirm("Delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:3000/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  const deleteApplication = async (appId: number) => {
    if (!token || !confirm("Delete this application?")) return;
    try {
      const res = await fetch(`http://localhost:3000/applications/${appId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok)
        setApplications(applications.filter((app) => app.id !== appId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete application");
    }
  };

  const downloadResume = async (filename: string) => {
    if (!token) return alert("Admin not authenticated");
    try {
      const res = await fetch(
        `http://localhost:3000/applications/download/${filename}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to download resume");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download resume");
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-12 font-sans">
      {/* Contact Submissions */}
      <section>
        <h1 className="text-3xl mt-11 font-extrabold text-gray-600 mb-6 text-center">
          Contact Submissions
        </h1>
        {submissions.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-cyan-300 bg-white/70 backdrop-blur-md max-h-[400px] overflow-y-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-gradient-to-r from-cyan-400/60 via-blue-400/60 to-indigo-700/60 text-white">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Enquiry</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Country</th>
                  <th className="px-6 py-3">Agree?</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">{sub.id}</td>
                    <td className="px-6 py-4">
                      {sub.firstName} {sub.lastName}
                    </td>
                    <td className="px-6 py-4">{sub.email}</td>
                    <td className="px-6 py-4">{sub.phone}</td>
                    <td className="px-6 py-4">{sub.enquiries}</td>
                    <td className="px-6 py-4">{sub.companyName}</td>
                    <td className="px-6 py-4">{sub.country}</td>
                    <td className="px-6 py-4">
                      {sub.agreeToCommunications ? (
                        <span className="text-green-500 font-bold">✔</span>
                      ) : (
                        <span className="text-red-500 font-bold">✖</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          if (!token) return alert("Admin not authenticated");
                          if (
                            !confirm(
                              "Are you sure you want to delete this submission?"
                            )
                          )
                            return;
                          try {
                            const res = await fetch(
                              `http://localhost:3000/contact/submissions/${sub.id}`,
                              {
                                method: "DELETE",
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            if (res.ok)
                              setSubmissions(
                                submissions.filter((s) => s.id !== sub.id)
                              );
                            else alert("Failed to delete submission");
                          } catch (err) {
                            console.error(err);
                            alert("Failed to delete submission");
                          }
                        }}
                        className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-white font-semibold shadow-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 italic">
            No contact submissions received yet.
          </p>
        )}
      </section>

      {/* Applications */}
      <section>
        <h1 className="text-3xl mt-11 font-extrabold text-gray-600 mb-6 text-center">
          Job Applications
        </h1>
        {applications.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-cyan-300 bg-white/70 backdrop-blur-md max-h-[400px] overflow-y-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-gradient-to-r from-cyan-400/60 via-blue-400/60 to-indigo-700/60 text-white">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Job</th>
                  <th className="px-6 py-3">Applied At</th>
                  <th className="px-6 py-3">Resume</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-cyan-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">{app.id}</td>
                    <td className="px-6 py-4">{app.applicantName}</td>
                    <td className="px-6 py-4">{app.email}</td>
                    <td className="px-6 py-4">{app.job?.title}</td>
                    <td className="px-6 py-4">
                      {new Date(app.appliedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => downloadResume(app.resumePath)}
                        className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 text-white font-semibold shadow-md transition"
                      >
                        Download
                      </button>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-white font-semibold shadow-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 italic">
            No applications received yet.
          </p>
        )}
      </section>

      {/* Jobs Management */}
      <section>
        <h1 className="text-3xl mt-11 font-extrabold text-gray-600 mb-6 text-center">
          Add New Job Opening
        </h1>

        {/* Job Form */}
        <form
          onSubmit={handleJobSubmit}
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
            onChange={(e) =>
              setJobForm({ ...jobForm, description: e.target.value })
            }
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={jobForm.location}
            onChange={(e) =>
              setJobForm({ ...jobForm, location: e.target.value })
            }
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

        {/* Jobs List */}
        <div className="mt-8 max-w-3xl mx-auto">
          <h1 className="text-3xl mt-11 font-extrabold text-gray-700 mb-6 text-center">
            Posted Job Openings
          </h1>
          {jobs.length > 0 ? (
            <ul className="space-y-4">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="p-4 bg-white/70 backdrop-blur-md rounded-2xl  flex justify-between items-center border border-purple-300 hover:scale-105 transition-transform duration-200"
                >
                  <div>
                    <h3 className="font-bold text-blue-800 text-lg">
                      {job.title}
                    </h3>
                    <p className="text-blue-600">{job.description}</p>
                    <p className="text-sm text-blue-500">
                      {job.location} • {job.type}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-white font-semibold shadow-md transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic text-center">
              No jobs posted yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
