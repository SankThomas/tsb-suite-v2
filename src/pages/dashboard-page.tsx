import { useMemo, useState } from "react";
import { Search, ArrowRight, ExternalLink, Package } from "lucide-react";
import { Input } from "../components/ui/input";
import { apps, type AppDefinition } from "../data/apps";

interface DashboardPageProps {
  onSelectApp: (app: AppDefinition) => void;
}

export function DashboardPage({ onSelectApp }: DashboardPageProps) {
  const [search, setSearch] = useState("");

  const filteredApps = useMemo(() => {
    if (!search.trim()) return apps;
    const q = search.toLowerCase();
    return apps.filter(
      (a: any) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.technologies.some((t: any) => t.toLowerCase().includes(q)),
    );
  }, [search]);

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Browse and launch any app in your suite.
        </p>
      </div>

      <div className="dashboard-search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apps..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filteredApps.length === 0 ? (
        <div className="empty-state">
          <Package className="h-8 w-8 text-muted-foreground" />
          <div className="empty-state-title">No apps found</div>
          <div className="empty-state-description">
            Try adjusting your search terms.
          </div>
        </div>
      ) : (
        <div className="app-grid">
          {filteredApps.map((app: any) => {
            const Icon = app.icon;
            return (
              <div
                key={app.name}
                className="app-card"
                onClick={() => onSelectApp(app)}
              >
                {app.featured && (
                  <div className="app-card-featured-badge">Featured</div>
                )}
                <div className="app-card-header">
                  <div className="app-card-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="app-card-name">{app.name}</div>
                  <div className="app-card-description">{app.description}</div>
                </div>
                <div className="app-card-tech">
                  {app.technologies.map((tech: any) => (
                    <span key={tech} className="app-card-tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="app-card-footer">
                  <div className="app-card-links">
                    <a
                      href={app.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Github
                    </a>
                    <a
                      href={app.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </a>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
