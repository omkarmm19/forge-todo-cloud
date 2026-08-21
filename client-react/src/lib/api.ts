import axios, { type AxiosError, type AxiosInstance } from "axios"
import { getToken, clearAuth } from "./auth-storage"

// Set your API base URL; if absent, we'll operate in mock mode for Todos.
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

let client: AxiosInstance | null = null

export function getApiClient() {
  if (client) return client
  client = axios.create({
    baseURL: API_BASE,
    withCredentials: true, // allow httpOnly cookie-based auth
  })

  client.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as any
      const url = original?.url || ""

      // Do not clear auth or retry on signin/signup endpoints
      const isAuthEndpoint = url.includes("/signin") || url.includes("/signup")

      if (error.response?.status === 401 && !isAuthEndpoint) {
        // Token is invalid or expired
        clearAuth()
      }
      return Promise.reject(error)
    },
  )

  return client
}

export function hasRemoteApi() {
  return !!API_BASE
}
