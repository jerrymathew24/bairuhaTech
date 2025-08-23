"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubmissionsTable from "./SubmissionsTable";
import ApplicationsTable from "./ApplicationsTable";
import JobForm from "./JobForm";
import JobsList from "./JobsList";
import { Menu, X } from "lucide-react";

export default function Page() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
  });

  const [activeSection, setActiveSection] = useState<
    "submissions" | "applications" | "jobs"
  >("submissions");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/admin-login");
      return;
    }

    const fetchData = async () => {
      try {
        const [subs, jobsData, apps] = await Promise.all([
          fetch("http://localhost:3000/contact/submissions", {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => res.json()),

          fetch("http://localhost:3000/jobs", {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => res.json()),

          fetch("http://localhost:3000/applications", {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => res.json()),
        ]);

        setSubmissions(Array.isArray(subs) ? subs : []);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setApplications(Array.isArray(apps) ? apps : []);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    fetchData();
  }, [router, token]);

  // ---- CRUD Actions ----
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

  const deleteSubmission = async (subId: number) => {
    if (!token || !confirm("Delete this submission?")) return;
    try {
      const res = await fetch(
        `http://localhost:3000/contact/submissions/${subId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok)
        setSubmissions(submissions.filter((sub) => sub.id !== subId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete submission");
    }
  };

  const downloadResume = async (filename: string) => {
    if (!token) return alert("Admin not authenticated");
    try {
      const res = await fetch(
        `http://localhost:3000/uploads/${filename}`,
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
    <div className="flex min-h-screen pt-16 bg-white">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white backdrop-blur-md border-r border-gray-300 p-6 transform transition-transform duration-300 z-40 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Admin Menu</h2>
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => {
                setActiveSection("submissions");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeSection === "submissions"
                  ? "bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-800 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Contact Submissions
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveSection("applications");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeSection === "applications"
                  ? "bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-800 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Job Applications
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveSection("jobs");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeSection === "jobs"
                  ? "bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-800 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Jobs Management
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {activeSection === "submissions" && (
          <SubmissionsTable
            submissions={submissions}
            onDelete={deleteSubmission}
          />
        )}
        {activeSection === "applications" && (
          <ApplicationsTable
            applications={applications}
            onDelete={deleteApplication}
            onDownload={downloadResume}
          />
        )}
        {activeSection === "jobs" && (
          <div className="space-y-8">
            <JobForm
              jobForm={jobForm}
              setJobForm={setJobForm}
              onSubmit={handleJobSubmit}
            />
            <JobsList jobs={jobs} onDelete={deleteJob} />
          </div>
        )}
      </main>
    </div>
  );
}
