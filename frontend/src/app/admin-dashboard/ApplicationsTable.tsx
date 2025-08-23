"use client";

export default function ApplicationsCards({
  applications,
  onDelete,
  onDownload,
}: {
  applications: any[];
  onDelete: (id: number) => void;
  onDownload: (filename: string) => void;
}) {
  return (
    <section>
      <h1 className="text-3xl mt-11 font-extrabold text-gray-600 mb-6 text-center">
        Job Applications
      </h1>

      {applications.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl shadow-lg border border-cyan-300 bg-white/80 backdrop-blur-md flex flex-col justify-between"
            >
              {/* Header */}
              <div className="mb-4">
                <p className="text-xl font-bold text-gray-800">{app.applicantName}</p>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Email:</span> {app.email}
                </p>
                <p>
                  <span className="font-medium">Job:</span> {app.job?.title}
                </p>
                <p>
                  <span className="font-medium">Applied At:</span>{" "}
                  {new Date(app.appliedAt).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => onDownload(app.resumePath)}
                  className="bg-green-400 px-4 py-2 rounded-lg hover:bg-gray-600 text-white font-semibold shadow-md transition"
                >
                  Download
                </button>
                <button
                  onClick={() => onDelete(app.id)}
                  className="bg-red-400 px-4 py-2 rounded-lg hover:bg-gray-600 text-white font-semibold shadow-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 italic">
          No applications received yet.
        </p>
      )}
    </section>
  );
}
