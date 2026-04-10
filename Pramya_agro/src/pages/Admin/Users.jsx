import { useEffect, useState } from "react";
import API from "../../services/api";
import { ChevronLeft, ChevronRight, Mail, ShieldCheck, User as UserIcon, Trash2 } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    API.get(`/admin/users?page=${page}&limit=10`)
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.pages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

const handleDelete = async (user) => {
  if (!confirm(`Are you sure you want to delete user "${user.name}"?`)) return;

  try {
    const res = await API.delete(`/admin/users/${user.id}`);
    alert(res.data.msg); // Show success message with user name
    fetchUsers(); // Refresh table
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.msg || "Failed to delete user");
  }
};

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Users List</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and monitor all registered accounts.</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-2xl border border-emerald-500/20 text-sm font-semibold">
          Total Pages: {totalPages}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10">
                <th className="p-5 text-gray-400 font-medium text-sm uppercase tracking-wider">User</th>
                <th className="p-5 text-gray-400 font-medium text-sm uppercase tracking-wider">Email</th>
                <th className="p-5 text-gray-400 font-medium text-sm uppercase tracking-wider">Role</th>
                <th className="p-5 text-gray-400 font-medium text-sm uppercase tracking-wider text-right">Status</th>
                <th className="p-5 text-gray-400 font-medium text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-500">Loading users...</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                          <UserIcon size={18} />
                        </div>
                        <span className="font-semibold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail size={14} />
                        {u.email}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className={u.role === 'admin' ? "text-amber-400" : "text-blue-400"} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${u.role === 'admin' ? "text-amber-400" : "text-blue-400"}`}>
                          {u.role}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button
                    onClick={() => handleDelete(u)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Pagination */}
      <div className="flex items-center justify-between mt-8 bg-black/20 p-4 rounded-2xl border border-white/5">
        <p className="text-sm text-gray-500">
          Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 border border-emerald-400/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-black font-bold shadow-lg shadow-emerald-500/20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}