import React, { useEffect, useState } from "react";
import API from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { Briefcase, MapPin, Pencil, Trash2 } from "lucide-react";

export default function CareerAdmin() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    role: "",
    description: "",
    requirements: "",
    location: ""
  });

  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/careers");

      console.log("API RESPONSE:", res.data);

      // ✅ SAFE FIX
      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        setJobs([]);
      }
    } catch {
      toast.error("Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingJob) {
        await API.put(`/admin/careers/${editingJob.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Job updated");
      } else {
        await API.post("/admin/careers", form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Job added");
      }

      setForm({
        title: "",
        role: "",
        description: "",
        requirements: "",
        location: ""
      });

      setEditingJob(null);
      fetchJobs();

    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);

    // ✅ SAFE FORM SET
    setForm({
      title: job.title || "",
      role: job.role || "",
      description: job.description || "",
      requirements: job.requirements || "",
      location: job.location || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 const handleDelete = (job) => {
  if (
    window.confirm(
      `Are you sure you want to delete the job "${job.title}" (${job.role})?`
    )
  ) {
    API.delete(`/admin/careers/${job.id}`)
      .then(() => {
        toast.success("Job deleted successfully!");
        fetchJobs();
      })
      .catch(() => toast.error("Delete failed"));
  }
};
  return (
    <div className="max-w-6xl mx-auto p-6 pb-20 text-white">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
          <Briefcase size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Career Admin</h1>
          <p className="text-gray-400 text-sm">Manage job openings</p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-xl mb-10 space-y-6"
      >
        {editingJob && (
          <p className="text-yellow-400 text-sm font-medium">
            Editing: {editingJob.title}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
          <Input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
          <Input name="location" placeholder="Location" value={form.location} onChange={handleChange} icon={<MapPin size={14} />} />

          <div className="sm:col-span-2">
            <Textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} required />
          </div>

          <div className="sm:col-span-2">
            <Textarea name="requirements" placeholder="Requirements" value={form.requirements} onChange={handleChange} />
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-semibold text-black transition">
          {editingJob ? "Update Job" : "Add Job"}
        </button>
      </form>

      {/* JOB LIST */}
      {loading ? (
        <p className="text-gray-400">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col hover:border-emerald-500/30 transition"
              >
                <h2 className="text-lg font-semibold text-emerald-400">
                  {job.title}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {job.role} • {job.location}
                </p>

                <p className="text-gray-300 text-sm mt-3 line-clamp-4">
                  {job.description}
                </p>

                {job.requirements && (
                  <p className="text-gray-500 text-xs mt-2 line-clamp-3">
                    Req: {job.requirements}
                  </p>
                )}

                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    onClick={() => handleEdit(job)}
                    className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500/30"
                  >
                    <Pencil size={14} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job)}
                    className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500/30"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-3">
      {icon}
      <input
        {...props}
        className="w-full p-3 bg-transparent outline-none text-white placeholder-gray-500"
      />
    </div>
  );
}

/* TEXTAREA */
function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full p-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none"
    />
  );
}