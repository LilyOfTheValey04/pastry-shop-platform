import { z } from "zod";

export const accountTypeSchema = z.enum(["CLIENT", "BUSINESS_OWNER"]);
export type AccountType = z.infer<typeof accountTypeSchema>;

export const registrationSchema = z.object({
    email: z.string().trim().toLowerCase().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    accountType: accountTypeSchema,
});