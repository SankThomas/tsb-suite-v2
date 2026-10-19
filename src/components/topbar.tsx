import { Sun, Moon, LogOut, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { useTheme } from "../lib/theme-provider";
import { useAuth } from "../lib/auth-context";
import { toast } from "sonner";

interface TopbarProps {
  pageTitle: string;
  onSignInClick: () => void;
}

export function Topbar({ pageTitle, onSignInClick }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    toast.success("Signed out", { description: "You have been signed out." });
  };

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-page-title">{pageTitle}</span>
      </div>

      <div className="topbar-right">
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

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="user-avatar-button">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="user-avatar-name">{user.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" size="sm" onClick={onSignInClick}>
            <User className="h-4 w-4" />
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
}
