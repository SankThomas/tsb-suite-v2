import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  userActivity: defineTable({
    userId: v.id("users"),
    appName: v.string(),
    action: v.string(),
    timestamp: v.number(),
  }).index("by_user", ["userId"]),
});
