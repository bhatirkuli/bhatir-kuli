import { Suspense } from "react";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="skeleton h-96 w-full rounded-box" />}>
      <LoginForm />
    </Suspense>
  );
}