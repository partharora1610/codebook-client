"use client"

import { useParams } from "next/navigation"
import React from "react"

const Page = () => {
  const { id } = useParams()

  return <div>{id}</div>
}

export default Page
