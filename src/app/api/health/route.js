import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/apiResponse";

/**
 * GET /api/health
 *
 * Infrastructure check for Module 2 — confirms the app can reach MongoDB.
 * Not a product/business endpoint; kept intentionally minimal and safe to
 * leave in place permanently as an ops/uptime check.
 */
export async function GET() {
  try {
    await connectDB();

    return apiSuccess(
      {
        db: "connected",
        readyState: mongoose.connection.readyState, // 1 = connected
      },
      "Database connection is healthy"
    );
  } catch (error) {
    console.error("[api/health] DB connection failed:", error.message);
    return apiError("Database connection failed", 503);
  }
}