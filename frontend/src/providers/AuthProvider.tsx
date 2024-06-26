"use client"

import storageManager from "@/lib/local-storage"
import useUserStore from "@/store/user-store"
import axios from "axios"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser, user } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = storageManager.getItem("token")

      if (!token) {
        clearUser()
        router.push("/auth?mode=login")
        return
      }

      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL! + "/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          setUser(response.data.user)
          router.push("/")
        } else {
          clearUser()
          router.push("/auth?mode=login")
        }
      } catch (error) {
        clearUser()
        router.push("/auth?mode=login")
      }
    }

    // if (!user) {
    //   fetchUser()
    // } else {
    //   router.push("/")
    // }
  }, [router, setUser, clearUser, user])

  return <div>{children}</div>
}

export default AuthProvider
