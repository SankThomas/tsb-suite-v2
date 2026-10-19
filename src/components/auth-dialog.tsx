import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../lib/auth-context";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();

  const resetForm = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (mode === "signup") {
      const result = await signUp(email, name, password);
      if (result.success) {
        toast.success("Welcome to App Suite!", {
          description: "Your account has been created.",
        });
        onOpenChange(false);
        resetForm();
      } else {
        toast.error("Sign up failed", { description: result.error });
      }
    } else {
      const result = await signIn(email, password);
      if (result.success) {
        toast.success("Welcome back!", {
          description: "You are now signed in.",
        });
        onOpenChange(false);
        resetForm();
      } else {
        toast.error("Sign in failed", { description: result.error });
      }
    }

    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="auth-dialog-content">
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Sign in to App Suite" : "Create your account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Enter your credentials to access all your apps."
              : "Sign up to get started with the app suite."}
          </DialogDescription>
        </DialogHeader>

        <form className="auth-dialog-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="auth-dialog-form-field">
              <Label htmlFor="auth-name">Name</Label>
              <Input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={submitting}
              />
            </div>
          )}

          <div className="auth-dialog-form-field">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={submitting}
            />
          </div>

          <div className="auth-dialog-form-field">
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              disabled={submitting}
            />
          </div>

          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <div className="auth-dialog-switch-mode">
          {mode === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            className="auth-dialog-switch-mode-button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
