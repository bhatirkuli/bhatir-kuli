import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;
// Cache is attached to `global` so it survives Next.js dev-mode hot reloads,
// which otherwise re-execute this module and would create a new connection
// on every file save.
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

/**
 * Connects to MongoDB via Mongoose, reusing an existing connection/promise
 * if one is already established or in progress.
 *
 * @returns {Promise<typeof mongoose>} the connected mongoose instance
 * @throws {Error} if MONGODB_URI is not configured, or if the connection fails
 */
export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to your .env.local file (see .env.example)."
    );
  }

  if (!cached.promise) {
    const opts = {
      // Fail fast instead of buffering queries indefinitely if the DB is down.
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("[db] MongoDB connected");
        return mongooseInstance;
      })
      .catch((error) => {
        // Reset the cached promise so the next call can retry the connection
        // instead of permanently reusing a failed attempt.
        cached.promise = null;
        console.error("[db] MongoDB connection error:", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Log unexpected connection-level errors that occur after the initial
// connection succeeds (e.g. the DB server restarting or a network blip).
mongoose.connection.on("error", (error) => {
  console.error("[db] Mongoose connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("[db] Mongoose disconnected");
});

export default connectDB;