import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign-in problem | Scottney & Co.",
  robots: { index: false, follow: false },
};

export default function AuthErrorPage() {
  return (
    <main>
      <div className="auth-wrap">
        <div className="auth-card">
          <h1>Something went wrong</h1>
          <p className="auth-sub">
            We couldn&apos;t complete that sign-in. The link may have expired or already been used.
          </p>
          <Link className="button" href="/login">
            Back to sign in <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
