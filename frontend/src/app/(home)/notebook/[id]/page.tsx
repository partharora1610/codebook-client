"use client"

import { useParams } from "next/navigation"
import React from "react"

const NoteBookPage = () => {
  const { id } = useParams()
  return (
    <div>
      <div className="m-auto max-w-7xl bg-gray-200 mt-12">
        <div className="">{id}</div>
      </div>
    </div>
  )
}

export default NoteBookPage
