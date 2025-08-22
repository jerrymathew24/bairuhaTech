"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.jobId;
  const [job, setJob] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!jobId) return;
    const id = Array.isArray(jobId) ? jobId[0] : jobId;

    fetch(`http://localhost:3000/jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(err => console.error("Failed to load job details", err));
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return alert("Please upload your resume");
    if (!jobId) return alert("Job ID is missing");

    const id = Array.isArray(jobId) ? jobId[0] : jobId;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const res = await fetch("http://localhost:3000/applications", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert(`Applied for ${job.title} successfully!`);
        router.push("/");
      } else {
        const errText = await res.text();
        console.error("Failed to submit:", errText);
        alert("Failed to submit application");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    }
  };

  if (!job) return <p className="text-center mt-10">Loading job info...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Apply for {job.title}
      </h1>

      <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
        <p className="text-gray-600 mb-4">{job.description}</p>
        <p className="text-sm text-gray-500 mb-6">{job.location} • {job.type}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={e => setResume(e.target.files ? e.target.files[0] : null)}
            className="hidden"
            required
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            {resume ? resume.name : "Upload Resume"}
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
