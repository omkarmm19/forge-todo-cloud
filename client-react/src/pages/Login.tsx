import LoginForm from "@/components/forms/login-form"
import { GlassCard } from "@/components/surfaces/glass-card"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { clearAuth, getToken } from "@/lib/auth-storage"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { API_BASE } from "@/lib/api"

export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const validateToken = async () => {
            const token = getToken();
            if (token) {
                try {
                    const response = await axios.get(
                        `${API_BASE}/api/v1/user/me`, // Using /me for validation
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            signal: controller.signal,
                        }
                    );

                    if (response.data.success) {
                        navigate("/dashboard", { replace: true });
                    } else {
                        clearAuth();
                    }
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error("Token validation failed:", error);
                        clearAuth();
                    }
                }
            }
        };

        validateToken();
        return () => controller.abort();
    }, [navigate]);

    return (
        <main className="mx-auto max-w-xl px-4 py-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard className="p-6 md:p-8">
                    <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
                    <p className="text-sm text-muted-foreground mb-6">Sign in to your account</p>
                    <LoginForm />
                </GlassCard>
            </motion.div>
        </main>
    )
}
