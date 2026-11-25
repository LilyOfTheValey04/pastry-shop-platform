// src/components/auth/AuthLayout.tsx
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";


type AuthLayoutProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">

            <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-soft p-12 lg:flex">
                <Link to="/" className="font-display text-2xl font-bold text-primary">
                    Sweet Corner
                </Link>
                <div className="space-y-4">
                    <p className="text-6xl">☕ 🥐 🧁</p>
                    <h2 className="text-4xl font-bold leading-tight">
                        Your favourite places,
                        <br /> just a click away.
                    </h2>
                    <p className="max-w-sm text-muted-foreground">
                        Discover local cafés, bakeries and sweet shops. Find your next favourite treat.
                    </p>
                </div>
                <p className="text-sm text-muted-foreground">© 2026 Sweet Corner</p>
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            </aside>

            <main className="flex items-center justify-center p-6">
                <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-soft">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="mb-6 mt-2 text-muted-foreground">{subtitle}</p>
                    {children}
                </div>
            </main>
        </div>
    );
}
