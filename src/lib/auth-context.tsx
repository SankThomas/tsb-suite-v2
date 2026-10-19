import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SuiteUser {
  _id: string;
  email: string;
  name: string;
  createdAt: number;
}

interface AuthContextValue {
  user: SuiteUser | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    name: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "app-suite-user";
const LOCAL_USERS_KEY = "app-suite-local-users";

// Local fallback auth for when Convex is not yet deployed
interface LocalUser extends SuiteUser {
  passwordHash: string;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getLocalUsers(): LocalUser[] {
  const stored = localStorage.getItem(LOCAL_USERS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveLocalUsers(users: LocalUser[]) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SuiteUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const emailLower = email.toLowerCase();

    // Local fallback
    const passwordHash = await hashPassword(password);
    const users = getLocalUsers();
    const found = users.find((u) => u.email === emailLower);
    if (!found || found.passwordHash !== passwordHash) {
      return { success: false, error: "Invalid email or password" };
    }
    const { passwordHash: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return { success: true };
  }, []);

  const signUp = useCallback(
    async (email: string, name: string, password: string) => {
      const emailLower = email.toLowerCase();

      // Local fallback
      const users = getLocalUsers();
      if (users.some((u) => u.email === emailLower)) {
        return {
          success: false,
          error: "An account with this email already exists",
        };
      }
      const passwordHash = await hashPassword(password);
      const newUser: LocalUser = {
        _id: crypto.randomUUID(),
        email: emailLower,
        name,
        passwordHash,
        createdAt: Date.now(),
      };
      saveLocalUsers([...users, newUser]);
      const { passwordHash: _, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
      return { success: true };
    },
    [signIn],
  );

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
