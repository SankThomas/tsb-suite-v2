import { ArrowLeft, Maximize2 } from "lucide-react";
import { Button } from "../components/ui/button";
import type { AppDefinition } from "../data/apps";

interface AppDetailPageProps {
  app: AppDefinition;
  onBack: () => void;
}

export function AppDetailPage({ app, onBack }: AppDetailPageProps) {
  const Icon = app.icon;

  return (
    <div>
      <div className="app-detail-header">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="app-detail-icon">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="app-detail-title">{app.name}</h1>
          <p className="app-detail-description">{app.longDescription}</p>
        </div>
      </div>

      <div className="app-detail-section">
        <div className="app-detail-section-title">Technologies</div>
        <div className="app-card-tech">
          {app.technologies.map((tech: any) => (
            <span key={tech} className="app-card-tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="app-detail-section">
        <div className="flex items-center justify-between mb-3">
          <div className="app-detail-section-title" style={{ marginBottom: 0 }}>
            Live Preview
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <a href={app.github} target="_blank" rel="noopener noreferrer">
                Github icon Source
              </a>
            </Button>
            <Button variant="outline" size="sm">
              <a href={app.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4" />
                Open Full
              </a>
            </Button>
          </div>
        </div>
        <div className="app-iframe-wrapper">
          <iframe
            src={app.liveUrl}
            title={app.name}
            className="app-iframe"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
}
