import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

/**
 * NextAuth configuration (v4, stable).
 *
 * - JWT session strategy: role/id are embedded directly in the signed
 *   session token, so authorization checks (middleware, API routes) never
 *   need an extra DB round-trip just to know who's asking.
 * - Credentials provider only, for now: email + password against our own
 *   User collection. OAuth providers can be added later without touching
 *   this shape.
 */
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        const email = credentials.email.toLowerCase().trim();
        const user = await User.findOne({ email }).select("+password");

        // Intentionally generic on every failure path (no user, wrong
        // password, disabled account) so the client can't distinguish
        // "no such account" from "wrong password" — avoids leaking which
        // emails are registered.
        if (!user || !user.isActive) {
          return null;
        }

        const isValidPassword = await user.comparePassword(credentials.password);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Runs whenever a JWT is created/updated. `user` is only present on
    // initial sign-in — persist what we need onto the token itself.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Exposes the token's id/role onto the session object the client and
    // server components actually read via useSession()/getServerSession().
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};