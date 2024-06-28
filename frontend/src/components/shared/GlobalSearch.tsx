"use client"

import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { formNewUrl, removeKeysFromQuery } from "@/lib/utils"

const GlobalSearch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const query = searchParams.get("search")

  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formNewUrl({
          params: searchParams.toString(),
          key: "global",
          value: search,
        })

        router.push(newURL, { scroll: false })
      } else {
        if (query) {
          const newURL = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["type", "global"],
          })
          router.push(newURL, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search, pathname, searchParams, query])

  return (
    <>
      <Input
        placeholder="Search"
        className="bg-gray-100 w-full rounded-full px-6 border-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        onChange={(e) => {
          setSearch(e.target.value)

          if (!isOpen) setIsOpen(true)
          if (e.target.value === "" && isOpen) setIsOpen(false)
        }}
        value={search}
      />
    </>
  )
}

export default GlobalSearch
