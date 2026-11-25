// src/routes/register.tsx
/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { accountTypeSchema, registrationSchema, type AccountType } from "@/lib/registration";
import { useRegister, registerErrorMessage } from "@/hooks/useRegister";

export const Route = createFileRoute("/register")({
    head: () => ({
        meta: [
            { title: "Create an account — Sweet Corner" },
            { name: "description", content: "Join Sweet Corner as a customer or a venue owner." },
            { property: "og:title", content: "Create an account — Sweet Corner" },
            { property: "og:description", content: "Join Sweet Corner as a customer or a venue owner." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
        ],
    }),
    component: RegisterPage,
});

function RegisterPage() {

    const [accountType, setAccountType] = useState<AccountType>("CLIENT");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const mutation = useRegister();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const result = registrationSchema.safeParse({ firstName, lastName, email, password, accountType });
        if (!result.success) {
            setError(result.error.issues[0]?.message ?? "Please check your details.");
            return;
        }
        setError("");

        mutation.mutate(result.data);
    }

    return (
        <AuthLayout title="Create an account" subtitle="Join as a customer or a venue owner.">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-medium">Account type</legend>
                    <RadioGroup name="accountType" value={accountType} className="grid-cols-2 rounded-xl bg-muted p-1"
                                onValueChange={(value) => {
                                    const result = accountTypeSchema.safeParse(value);
                                    if (result.success) setAccountType(result.data);
                                }}>
                        <Label htmlFor="client" className={"flex min-h-12 cursor-pointer items-center gap-2 rounded-lg p-3 text-sm " +
                            (accountType === "CLIENT" ? "bg-card text-primary shadow-sm" : "text-muted-foreground")}>
                            <RadioGroupItem id="client" value="CLIENT" /> Customer
                        </Label>
                        <Label htmlFor="owner" className={"flex min-h-12 cursor-pointer items-center gap-2 rounded-lg p-3 text-sm " +
                            (accountType === "BUSINESS_OWNER" ? "bg-card text-primary shadow-sm" : "text-muted-foreground")}>
                            <RadioGroupItem id="owner" value="BUSINESS_OWNER" /> Venue owner
                        </Label>
                    </RadioGroup>
                </fieldset>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" name="firstName" autoComplete="given-name" required value={firstName}
                               onChange={(e) => setFirstName(e.target.value)} placeholder="Lily" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" name="lastName" autoComplete="family-name" required value={lastName}
                               onChange={(e) => setLastName(e.target.value)} placeholder="Ivanova" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                           placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} value={password}
                           onChange={(e) => setPassword(e.target.value)} />
                </div>

                {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                {mutation.isError && <p role="alert" className="text-sm text-destructive">{registerErrorMessage(mutation.error)}</p>}

                <Button type="submit" disabled={mutation.isPending} className="h-11 w-full rounded-xl bg-gradient-primary">
                    {mutation.isPending ? "Creating your account…" : "Create account"}
                </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </p>
        </AuthLayout>
    );
}

