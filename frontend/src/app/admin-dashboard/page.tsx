"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
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
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl text-center font-bold text-blue-800 mb-6">
        Contact Submissions
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gradient-to-r from-cyan-400/60 via-sky-500/60 to-indigo-800/60 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Enquiry</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Country</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Agree?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{sub.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {sub.firstName} {sub.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{sub.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{sub.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {sub.enquiries}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {sub.companyName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{sub.country}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  {sub.agreeToCommunications ? (
                    <span className="text-green-600">✔ Yes</span>
                  ) : (
                    <span className="text-red-600">✖ No</span>
                  )}
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
