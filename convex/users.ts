import {
  action,
  mutation,
  query,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const signUp = action({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ success: boolean; error?: string }> => {
    const existing = await ctx.runQuery(internal.users.getByEmail, {
      email: args.email.toLowerCase(),
    });
    if (existing) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    const passwordHash = await hashPassword(args.password);
    await ctx.runMutation(internal.users.create, {
      email: args.email.toLowerCase(),
      name: args.name,
      passwordHash,
    });

    return { success: true };
  },
});

export const signIn = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{
    success: boolean;
    error?: string;
    user?: Omit<Doc<"users">, "passwordHash">;
  }> => {
    const passwordHash = await hashPassword(args.password);
    const user = await ctx.runQuery(internal.users.getByEmail, {
      email: args.email.toLowerCase(),
    });

    if (!user || user.passwordHash !== passwordHash) {
      return { success: false, error: "Invalid email or password" };
    }

    const { passwordHash: _, ...safeUser } = user;
    return { success: true, user: safeUser };
  },
});

export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.userId);
    if (!doc) return null;
    const { passwordHash: _, ...safeUser } = doc;
    return safeUser;
  },
});

export const getByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const create = internalMutation({
  args: {
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      passwordHash: args.passwordHash,
      createdAt: now,
    });
  },
});

export const logActivity = mutation({
  args: {
    appName: v.string(),
    action: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email ?? ""))
      .first();
    if (!user) return;

    await ctx.db.insert("userActivity", {
      userId: user._id,
      appName: args.appName,
      action: args.action,
      timestamp: Date.now(),
    });
  },
});
