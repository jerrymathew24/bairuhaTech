"use client";

export default function SubmissionsCards({
  submissions,
  onDelete,
}: {
  submissions: any[];
  onDelete: (id: number) => void;
}) {
  return (
    <section className="flex-1">
      <h1 className="text-3xl mt-11 font-extrabold text-gray-600 mb-6 text-center">
        Contact Submissions
      </h1>

      {submissions.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl shadow-lg border border-cyan-200 bg-white/80 backdrop-blur-md flex flex-col justify-between"
            >
              {/* Header */}
              <div className="mb-4">
                <p className="text-xl font-bold text-gray-800">
                  {sub.firstName} {sub.lastName}
                </p>
              </div>

              {/* Content */}
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Email:</span> {sub.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {sub.phone}
                </p>
                <p className="break-words">
                  <span className="font-medium">Enquiry:</span> {sub.enquiries}
                </p>
                <p>
                  <span className="font-medium">Company:</span> {sub.companyName}
                </p>
                <p>
                  <span className="font-medium">Country:</span> {sub.country}
                </p>
                <p>
                  <span className="font-medium">✅ Agree?</span>{" "}
                  {sub.agreeToCommunications ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => onDelete(sub.id)}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white font-semibold shadow-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 italic">
          No contact submissions received yet.
        </p>
      )}
    </section>
  );
}
