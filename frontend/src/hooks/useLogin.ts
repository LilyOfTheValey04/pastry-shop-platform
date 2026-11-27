import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { fetchMyProfile, loginUser, redirectPathForRole, saveToken } from "@/lib/auth";

export interface LoginForm { email: string; password: string; }

export function useLogin() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: LoginForm) => {

            const login = await loginUser(data.email.trim().toLowerCase(), data.password);
            saveToken(login.token);
            return fetchMyProfile(login.token);
        },
        onSuccess: (profile) => { void navigate({ to: redirectPathForRole(profile.role) }); },
    });
}

export function loginErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            if (status === 401 || status === 403) return "Wrong email or password.";
            if (status === 400) return "Please check your details and try again.";
            return "The server returned an error. Please try again later.";
        }
        return "Cannot reach the server. Is it running?";
    }
    return "Something went wrong. Please try again.";
}
