// scripts/seedAdmin.mjs
//
// One-time bootstrap script to create the first admin account.
// Public registration (/api/auth/register) can only ever create "customer"
// accounts by design — this script is the only way to create an admin
// until a future Admin User Management module ships.
//
// Usage:
//   node --env-file=.env.local scripts/seedAdmin.mjs
//
// Requires ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in .env.local.

import mongoose from "mongoose";
import User from "../src/models/User.js";

const { MONGODB_URI, ADMIN_SEED_NAME, ADMIN_SEED_EMAIL, ADMIN_SEED_PASSWORD } = process.env;

async function run() {
  if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI. Check your .env.local file.");
    process.exit(1);
  }
  if (!ADMIN_SEED_EMAIL || !ADMIN_SEED_PASSWORD) {
    console.error("Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD in .env.local.");
    process.exit(1);
  }
  if (ADMIN_SEED_PASSWORD.length < 6) {
    console.error("ADMIN_SEED_PASSWORD must be at least 6 characters.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const email = ADMIN_SEED_EMAIL.toLowerCase().trim();
  const existing = await User.findOne({ email });

  if (existing) {
    console.log(
      `A user with email "${email}" already exists (role: ${existing.role}). No changes made.`
    );
    await mongoose.disconnect();
    return;
  }

  const admin = await User.create({
    name: ADMIN_SEED_NAME || "Administrator",
    email,
    password: ADMIN_SEED_PASSWORD,
    role: "admin",
  });

  console.log(`✅ Admin account created: ${admin.email}`);
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error("Seed script failed:", error.message);
  process.exit(1);
});