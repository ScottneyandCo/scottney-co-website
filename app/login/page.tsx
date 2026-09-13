"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const message =
        signInError.message.toLowerCase().includes("confirm")
          ? "Please confirm your email address before signing in."
          : "Invalid email or password.";
      setError(message);
      setLoading(false);
      return;
    }

    router.push("/admin/portfolio");
    router.refresh();
  }

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Scottney and Company home">
          <Image src="/scottney-logo.png" alt="Scottney & Co. Digital Marketing" width={180} height={180} priority />
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link className="button button-small" href="/">Back to site <ArrowUpRight size={17} /></Link>
      </header>

      <div className="auth-wrap">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Owner sign in</h1>
          <p className="auth-sub">Sign in to manage your portfolio and upload new work.</p>

          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
            <ArrowUpRight size={18} />
          </button>
        </form>
      </div>
    </main>
  );
}
