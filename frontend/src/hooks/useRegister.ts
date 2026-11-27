

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import {
    fetchMyProfile,
    loginUser,
    redirectPathForRole,
    registerUser,
    saveToken,
    type RegisterRequest,
} from "@/lib/auth";

export function useRegister() {
    const navigate = useNavigate();

    return useMutation({

        mutationFn: async (data: RegisterRequest) => {

            await registerUser(data);

            const login = await loginUser(data.email, data.password);
            saveToken(login.token);

            const profile = await fetchMyProfile(login.token);
            return profile;
        },

        onSuccess: (profile) => {
            void navigate({ to: redirectPathForRole(profile.role) });
        },
    });
}

export function registerErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            if (status === 409) return "An account with this email already exists.";
            if (status === 400) return "Please check your details and try again.";
            return "The server returned an error. Please try again later.";
        }

        return "Cannot reach the server. Is it running?";
    }
    return "Something went wrong. Please try again.";
}
