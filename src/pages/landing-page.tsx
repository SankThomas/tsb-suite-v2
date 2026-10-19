import { LayoutGrid, ArrowRight, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../lib/theme-provider";
import { Sun, Moon } from "lucide-react";
import { apps } from "../data/apps";

interface LandingPageProps {
  onEnter: () => void;
  onSignIn: () => void;
}

export const LandingPage = ({ onEnter, onSignIn }: LandingPageProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <div className="sidebar-logo">
            <LayoutGrid className="size-4" />
          </div>
          App Suite
        </div>

        <div className="landing-nav-links">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#apps"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Apps
          </a>
        </div>

        <div className="landing-nav-actions">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={onSignIn}>
            Sign in
          </Button>
          <Button size="sm" onClick={onEnter}>
            Enter Suite
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-badge">
          <Star className="size-3.5" />
          {apps.length} {apps.length !== 1 ? "apps" : "app"} and growing
        </div>

        <h1 className="landing-hero-title">
          All my apps in one unified workspace
        </h1>
        <p className="landing-hero-subtitle">
          A seamlessly integrated suite of applications that share state and
          communicate with each other. Switch between apps effortlessly.
        </p>

        <div className="landing-hero-actions">
          <Button size="lg" onClick={onEnter}>
            Launch Suite
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={onSignIn}>
            Sign in
          </Button>
        </div>
      </section>

      <section id="features" className="landing-stats">
        <div className="landing-stat">
          <div className="landing-stat-value">{apps.length}</div>
          <div className="landing-stat-label">Integrated Apps</div>
        </div>
        <div className="landing-stat">
          <div className="landing-stat-value">1</div>
          <div className="landing-stat-label">Unified Login</div>
        </div>
        <div className="landing-stat">
          <div className="landing-stat-value">
            {new Set(apps.flatMap((a) => a.technologies)).size}
          </div>
          <div className="landing-stat-label">Technologies</div>
        </div>
      </section>

      <section
        id="apps"
        className="content-area"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div className="dashboard-header">
          <h2 className="dashboard-title">Available Apps</h2>
          <p className="dashboard-subtitle">
            Each app runs independently but is accessible from one place.
          </p>
        </div>
        <div className="app-grid">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <div key={app.name} className="app-card" onClick={onEnter}>
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
                  {app.technologies.map((tech) => (
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
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="landing-footer">
        <span>App Suite — A unified workspace for all your apps.</span>
        <span>Built with React, Vite & Convex</span>
      </footer>
    </div>
  );
};
