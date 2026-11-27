// src/routes/index.tsx
// Начална страница — адрес "/"
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
/* eslint-disable react-refresh/only-export-components */
export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
            <p className="text-6xl">☕ 🥐 🧁</p>
            <h1 className="font-display text-5xl font-bold text-foreground">
                Sweet Corner
            </h1>
            <p className="max-w-md text-muted-foreground">
                Discover local cafés, bakeries and sweet shops. Find your next favourite treat.
            </p>
            <div className="flex gap-3">
                <Button asChild className="rounded-xl bg-gradient-primary">
                    <Link to="/register">Create account</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                    <Link to="/login">Sign in</Link>
                </Button>
            </div>
        </div>
    );
}

