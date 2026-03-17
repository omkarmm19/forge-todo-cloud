import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth-context"
import { getToken } from "@/lib/auth-storage"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = getToken()
    if (!user && !token) {
      navigate("/", { replace: true })
    }
  }, [user, navigate])

  if (!user && !getToken()) {
    return <div className="mx-auto max-w-md p-6 text-center text-muted-foreground">Checking authentication...</div>
  }

  return <>{children}</>
}
