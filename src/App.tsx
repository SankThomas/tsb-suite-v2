import { useState } from "react";
import { AuthProvider } from "./lib/auth-context";
import { ThemeProvider } from "./lib/theme-provider";
import type { AppDefinition } from "./data/apps";
import { LandingPage } from "./pages/landing-page";
import { AuthDialog } from "./components/auth-dialog";
import { Toaster } from "sonner";
import { Sidebar } from "./components/sidebar";
import { Topbar } from "./components/topbar";
import { DashboardPage } from "./pages/dashboard-page";
import { AppDetailPage } from "./pages/app-detail-page";

type View = "landing" | "dashboard" | "app";

function SuiteApp() {
  const [view, setView] = useState<View>("landing");
  const [activeApp, setActiveApp] = useState<AppDefinition | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSelectDashboard = () => {
    setActiveApp(null);
    setView("dashboard");
  };

  const handleSelectApp = (app: AppDefinition) => {
    setActiveApp(app);
    setView("app");
  };

  const pageTitle =
    view === "dashboard"
      ? "Dashboard"
      : view === "app" && activeApp
        ? activeApp.name
        : "App Suite";

  if (view === "landing") {
    return (
      <>
        <LandingPage
          onEnter={() => setView("dashboard")}
          onSignIn={() => setAuthOpen(true)}
        />

        <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      </>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeApp ? activeApp.name : "dashboard"}
        onSelectDashboard={handleSelectDashboard}
        onSelectApp={handleSelectApp}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      <div className="app-main-area">
        <Topbar pageTitle={pageTitle} onSignInClick={() => setAuthOpen(true)} />
        <main className="content-area">
          {view === "dashboard" && (
            <DashboardPage onSelectApp={handleSelectApp} />
          )}
          {view === "app" && activeApp && (
            <AppDetailPage app={activeApp} onBack={handleSelectDashboard} />
          )}
        </main>
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SuiteApp />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
}
