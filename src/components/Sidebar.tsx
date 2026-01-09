import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Sprout, Scissors, BarChart3, Settings } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Sprout, label: "Planting", path: "/planting" },
  { icon: Scissors, label: "Weeding", path: "/weeding" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
          <Sprout className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xl font-semibold text-foreground">AgriBot</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive ? "sidebar-nav-item-active" : ""}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">Uspan>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Profile</p>
            <p className="text-xs text-muted-foreground">USER</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
