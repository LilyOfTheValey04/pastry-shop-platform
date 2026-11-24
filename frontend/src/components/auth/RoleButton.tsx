import type { ReactNode } from "react";

interface RoleButtonProps {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
}

export function RoleButton({ active, onClick, children }: RoleButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                "rounded-lg py-2 text-sm font-semibold transition " +
                (active
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground")
            }
        >
            {children}
        </button>
    );
}
