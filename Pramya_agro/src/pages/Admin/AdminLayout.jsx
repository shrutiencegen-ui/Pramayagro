import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Package, 
  PlusCircle, 
  LogOut, 
  ExternalLink,
  Menu,
  X 
} from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Tumcha token key
    navigate("/login");
  };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
    { to: "/admin/users", label: "Users", icon: <Users size={20} /> },
    { to: "/admin/orders", label: "Orders", icon: <ShoppingBag size={20} /> },
    { to: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { to: "/admin/add-product", label: "Add Product", icon: <PlusCircle size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#020404] text-gray-200 font-sans">
      
      {/* Sidebar Overlay for Mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0c0c] border-r border-white/5 
        transform transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>
        <div className="flex flex-col h-full p-6">
          
          {/* Logo Section */}
          {/* Logo Section */}
<div className="flex justify-center items-center mb-10 px-2">
  <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
</div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
              Main Menu
            </p>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/5 space-y-2">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-4 w-full px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
            >
              <ExternalLink size={20} />
              Visit Website
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-2xl transition-all group"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              Logout Account
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-72">
        
        {/* Top Header (Mobile Only) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0a0c0c] border-b border-white/5">
          <h2 className="font-bold text-emerald-400">Pramya Agro</h2>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Dynamic Content */}
        <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}