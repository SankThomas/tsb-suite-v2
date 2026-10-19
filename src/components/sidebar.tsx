import { LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { apps, type AppDefinition } from "../data/apps";

interface SidebarProps {
  activeView: "dashboard" | string;
  onSelectDashboard: () => void;
  onSelectApp: (app: AppDefinition) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({
  activeView,
  onSelectDashboard,
  onSelectApp,
  collapsed,
  onToggleCollapse,
}: SidebarProps) => {
  return (
    <aside className={cn("sidebar", collapsed && "sidebar-collapsed")}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <LayoutGrid className="h-4 w-4" />
        </div>
        {!collapsed && <span className="sidebar-title">App Suite</span>}
      </div>

      <nav className="sidebar-nav">
        {!collapsed && <div className="sidebar-nav-label">Overview</div>}
        <button
          className={cn(
            "sidebar-nav-item",
            activeView === "dashboard" && "sidebar-nav-item-active",
          )}
          onClick={onSelectDashboard}
        >
          <LayoutGrid className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </button>

        {!collapsed && <div className="sidebar-nav-label">Apps</div>}
        {apps.map((app) => {
          const Icon = app.icon;
          const isActive = activeView === app.name;
          return (
            <button
              key={app.name}
              className={cn(
                "sidebar-nav-item",
                isActive && "sidebar-nav-item-active",
              )}
              onClick={() => onSelectApp(app)}
              title={collapsed ? app.name : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{app.name}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-nav-item" onClick={onToggleCollapse}>
          {collapsed ? (
            <ChevronRight className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
