// src/routes/register.tsx
/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { RoleButton } from "@/components/auth/RoleButton";

// 1. Дефинираме маршрута за адреса /register

export const Route = createFileRoute("/register")({
    head: () => ({
        meta: [
            { title: "Регистрация — Сладко кътче" },
            { name: "description", content: "Създай профил като клиент или като бизнес." },
        ],
    }),
    component: RegisterPage,
});


// 2. TypeScript тип: ролята може да бъде САМО "client" или "business"
type Role = "client" | "business";

function RegisterPage() {
    // 3. Състояния (State) — паметта на компонента за всяко поле:
    const [role, setRole] = useState<Role>("client");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    // 4. Проверка на данните при натискане на бутона
    function handleSubmit(event: FormEvent) {
        event.preventDefault(); // спираме презареждането на страницата

        if (name.trim() === "") {
            return setError("Моля, въведи име.");
        }
        if (!email.includes("@")) {
            return setError("Моля, въведи валиден имейл.");
        }
        if (password.length < 6) {
            return setError("Паролата трябва да е поне 6 символа.");
        }
        if (password !== confirm) {
            return setError("Паролите не съвпадат.");
        }

        // Ако всичко е наред:
        setError("");
        alert(`Успешна проверка! Регистрация като ${role === "client" ? "клиент" : "бизнес"}: ${name}`);
    }

    return (
        <AuthLayout title="Създай профил" subtitle="Присъедини се като клиент или като бизнес.">

            {/* Превключвател за роля (Клиент / Бизнес) */}
            <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
                <RoleButton active={role === "client"} onClick={() => setRole("client")}>
                    🙋 Клиент
                </RoleButton>
                <RoleButton active={role === "business"} onClick={() => setRole("business")}>
                    🏪 Бизнес
                </RoleButton>
            </div>

            {/* Самата HTML форма */}
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Поле за име (променя текста според избраната роля!) */}
                <div className="space-y-2">
                    <Label htmlFor="name">
                        {role === "client" ? "Твоето име" : "Име на заведението"}
                    </Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={role === "client" ? "Мария Иванова" : "Пекарна „Утро“"}
                    />
                </div>

                {/* Поле за имейл */}
                <div className="space-y-2">
                    <Label htmlFor="email">Имейл</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ime@primer.bg"
                    />
                </div>

                {/* Поле за парола */}
                <div className="space-y-2">
                    <Label htmlFor="password">Парола</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Поле за повторение на паролата */}
                <div className="space-y-2">
                    <Label htmlFor="confirm">Повтори паролата</Label>
                    <Input
                        id="confirm"
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </div>

                {/* Съобщение за грешка в червен цвят */}
                {error && <p className="text-sm text-destructive">{error}</p>}

                {/* Бутон за изпращане */}
                <Button type="submit" className="h-11 w-full rounded-xl bg-gradient-primary">
                    Регистрация
                </Button>
            </form>

            {/* Връзка към Вход */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
                Вече имаш профил?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                    Влез
                </Link>
            </p>
        </AuthLayout>
    );
}


