
import axios from "axios";
import type { AccountType } from "@/lib/registration";

const API_URL = import.meta.env["VITE_API_URL"] ?? "http://localhost:8080";

export const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: AccountType;
}

export interface LoginResponse {
    token: string;
    expiresIn: number;
}

export interface RegisterResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: AccountType;
    createdAt: string;
}

export interface UserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: AccountType;
}


// POST /api/auth/register
// if success, server returns 201 Created with body RegisterResponse.
export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>("/api/auth/register", data);
    return response.data;
}

// POST /api/auth/login — returns JWT token
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/api/auth/login", { email, password });
    return response.data;
}

// GET /api/users/me — returns the profile of the logged-in user.
// The token is sent in the header "Authorization: Bearer <token>".
// The role is read from here, not from the token — the server checks the permissions.
export async function fetchMyProfile(token: string): Promise<UserResponse> {
    const response = await api.get<UserResponse>("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

// ----------saves token ----------

const TOKEN_KEY = "sweetcorner.token";

export function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

// ---------- redirects user according to the role ----------

export function redirectPathForRole(role: AccountType): string {
    return role === "BUSINESS_OWNER" ? "/create-business" : "/";
}
