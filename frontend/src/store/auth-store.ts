import { create } from "zustand"
import {
  login as apiLogin,
  register as apiRegister,
} from "../service/auth.service"
import storageManager from "@/lib/local-storage"

interface User {
  id: string
  username: string
}

interface UserState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  clearUser: () => void
  register: (
    email: string,
    password: string,
    confirmPassword: string,
    username: string
  ) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const useAuthStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  isAuthenticated: true,
  setUser: (user) => {
    set({ user })
  },
  setLoading: (loading) => set({ loading }),

  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  clearUser: () => set({ user: null, isAuthenticated: false }),

  login: async (email, password) => {
    set({ loading: true })
    try {
      const { user, token } = await apiLogin(email, password)
      set({ user, isAuthenticated: true })
      storageManager.setItem("token", token)
    } catch (error) {
      console.error("Login failed:", error)
      set({ isAuthenticated: false })
    } finally {
      set({ loading: false })
    }
  },

  register: async (email, password, confirmPassword, username) => {
    set({ loading: true })
    try {
      const { user, token } = await apiRegister(
        email,
        password,
        confirmPassword,
        username
      )
      set({ user, isAuthenticated: true })
      storageManager.setItem("token", token)
    } catch (error) {
      console.error("Register failed:", error)
      set({ isAuthenticated: false })
    } finally {
      set({ loading: false })
    }
  },

  logout: async () => {
    set({ isAuthenticated: false })
    set({ user: null })
    storageManager.removeItem("token")
  },
}))

export default useAuthStore
