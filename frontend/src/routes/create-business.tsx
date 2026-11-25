import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
/* eslint-disable react-refresh/only-export-components */
export const Route = createFileRoute("/create-business")({
    head: () => ({
        meta: [
            { title: "Create your venue — Sweet Corner" },
            { name: "description", content: "Add your café, bakery or pastry shop to Sweet Corner." },
            { property: "og:title", content: "Create your venue — Sweet Corner" },
            { property: "og:description", content: "Add your café, bakery or pastry shop to Sweet Corner." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
        ],
    }),
    component: CreateBusinessPage,
});

function CreateBusinessPage() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!name.trim()) return setError("Please enter the venue name.");
        if (!address.trim()) return setError("Please enter the address.");
        if (!city.trim()) return setError("Please enter the city.");
        setError("");

        setError("Saving venues is not connected yet. Nothing was sent.");
    }

    return (
        <AuthLayout title="Create your venue" subtitle="Tell customers where to find you.">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Venue name</Label>
                    <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Sweet Corner Bakery" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="12 Vitosha Blvd" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Sofia" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Input id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="Bakery" />
                    </div>
                </div>

                {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="h-11 w-full rounded-xl bg-gradient-primary">
                    Save venue
                </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
                Not a venue owner?{" "}
                <Link to="/" className="font-semibold text-primary hover:underline">Back to home</Link>
            </p>
        </AuthLayout>
    );
}