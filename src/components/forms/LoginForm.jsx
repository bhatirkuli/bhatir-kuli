"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FiAlertCircle } from "react-icons/fi";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email.trim().toLowerCase(),
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">
        <h1 className="text-2xl font-bold text-base-content">Sign In</h1>
        <p className="text-sm text-base-content/60">
          Access your account to manage orders and browse the catalog.
        </p>

        {error && (
          <div role="alert" className="alert alert-error mt-2 text-sm">
            <FiAlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4" noValidate>
          <label className="form-control">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="you@company.com"
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Password</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
          </label>

          <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-base-content/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="link link-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}