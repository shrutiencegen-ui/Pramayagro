import { useDashboardStats } from "../../hooks/userDashboardStats";
import { Users, ShoppingBag, IndianRupee, TrendingUp } from "lucide-react"; // Icons install kara: npm install lucide-react

export default function AdminDashboard() {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
        ⚠️ Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Welcome back, <span className="text-emerald-400">Admin</span>
        </h1>
        <p className="text-gray-400 mt-2">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Total Users" 
          value={stats.total_users.toLocaleString()} 
          icon={<Users className="text-blue-400" size={24} />}
          trend="+12% from last month" // Temporary hardcoded trend
          color="blue"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.total_orders} 
          icon={<ShoppingBag className="text-emerald-400" size={24} />}
          trend="+5% today"
          color="emerald"
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.total_revenue.toLocaleString()}`} 
          icon={<IndianRupee className="text-amber-400" size={24} />}
          trend="+18.2% YoY"
          color="amber"
        />
      </div>

    
    </div>
  );
}

function StatCard({ title, value, icon, trend, color }) {
  return (
    <div className="group relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 p-7 rounded-3xl border border-white/10 hover:border-emerald-500/30">
      {/* Background Glow Effect */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 bg-${color}-400 rounded-full group-hover:opacity-20 transition-opacity`} />
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-4xl font-bold mt-3 text-white tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          <TrendingUp size={12} />
          {trend}
        </div>
      </div>
    </div>
  );
}