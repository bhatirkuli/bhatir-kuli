"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FiAlertCircle } from "react-icons/fi";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
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

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to create account.");
        setLoading(false);
        return;
      }

      // Auto sign-in right after successful registration for a smooth UX.
      const signInResult = await signIn("credentials", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
        redirect: false,
      });

      setLoading(false);

      if (signInResult?.error) {
        // Account was created but auto-login failed — send them to login.
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">
        <h1 className="text-2xl font-bold text-base-content">Create an Account</h1>
        <p className="text-sm text-base-content/60">
          Register to browse the catalog, save carts, and track orders.
        </p>

        {error && (
          <div role="alert" className="alert alert-error mt-2 text-sm">
            <FiAlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4" noValidate>
          <label className="form-control">
            <span className="label-text mb-1">Full Name</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Jane Rahman"
            />
          </label>

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
              minLength={6}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="At least 6 characters"
            />
          </label>

          <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-base-content/60">
          Already have an account?{" "}
          <Link href="/login" className="link link-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}