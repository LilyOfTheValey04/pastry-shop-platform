// Страница за вход — адрес /login
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginErrorMessage, useLogin } from "@/hooks/useLogin";

/* eslint-disable react-refresh/only-export-components */
export const Route = createFileRoute("/login")({
    head: () => ({
        meta: [
            { title: "Sign in — Sweet Corner" },
            { name: "description", content: "Sign in to your Sweet Corner account." },
            { property: "og:title", content: "Sign in — Sweet Corner" },
            { property: "og:description", content: "Sign in to your Sweet Corner account." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
        ],
    }),
    component: LoginPage,
});

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const login = useLogin();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!email.includes("@")) return setError("Please enter a valid email.");
        if (!password) return setError("Please enter your password.");
        setError("");
        login.mutate({ email, password });
    }

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to return to your favourite places.">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                {error && <p className="text-sm text-destructive">{error}</p>}
                {login.isError && (
                    <p className="text-sm text-destructive">{loginErrorMessage(login.error)}</p>
                )}

                <Button type="submit" className="h-11 w-full rounded-xl bg-gradient-primary"
                        disabled={login.isPending}
                >
                    {login.isPending ? "Signing in…" : "Sign in"}
                </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                    Create account
                </Link>
            </p>
        </AuthLayout>
    );
}
