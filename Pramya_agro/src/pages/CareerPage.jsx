import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import API from "../services/api"; // axios instance with baseURL & token

Modal.setAppElement("#root");

export default function CareerPage() {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/careers"); // fetch all jobs
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    // Use FormData if integrating EmailJS or your backend
    const formData = new FormData();
    formData.append("user_name", data.name);
    formData.append("user_email", data.email);
    formData.append("job_title", selectedJob.title);
    formData.append("resume", data.resume[0]);

    // Example: send to backend
    API.post("/apply", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then(() => {
        toast.success("Application sent successfully!");
        closeModal();
      })
      .catch(() => toast.error("Failed to send application"));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
        Careers at Our Company
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col hover:shadow-emerald-500/30 transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{job.title}</h2>
            <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
              <strong>Role:</strong> {job.role}
            </p>
            {job.location && (
              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                <strong>Location:</strong> {job.location}
              </p>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 mb-4">{job.description}</p>
            <button
              onClick={() => openModal(job)}
              className="mt-auto bg-emerald-500 dark:bg-emerald-600 text-white py-2 px-4 rounded-xl font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Apply for Job"
        className="max-w-lg mx-auto mt-20 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg relative text-gray-900 dark:text-white transition-colors"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        {selectedJob && (
          <>
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h2>
            <form id="applyForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="border p-2 rounded-md w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="border p-2 rounded-md w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
              />
              <input
                type="file"
                {...register("resume", { required: true })}
                className="border p-2 rounded-md w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-500 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
}