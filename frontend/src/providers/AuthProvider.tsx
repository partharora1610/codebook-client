"use client"

import authStore from "../store/auth-store"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import storageManager from "@/lib/local-storage"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setAuthenticated, setUser, loading, setLoading } =
    authStore()
  const router = useRouter()
  const pathname = usePathname()

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/me", {
        headers: {
          Authorization: `Bearer ${storageManager.getItem("token")}`,
        },
      })

      if (response.status === 200) {
        setAuthenticated(true)
        setUser(response.data.user)
        setLoading(false)
      } else {
        setAuthenticated(false)
        router.push(
          `/auth?callbackUrl=${encodeURIComponent(
            pathname + window.location.search
          )}`
        )
      }
    } catch (error) {
      setAuthenticated(false)

      router.push(
        `/auth?callbackUrl=${encodeURIComponent(
          pathname + window.location.search
        )}`
      )
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      fetchUser()
    }
  }, [isAuthenticated, router, setAuthenticated, setUser])

  if (loading) {
    return <>Loadings.....</>
  }

  return <div>{children}</div>
}

export default AuthProvider
