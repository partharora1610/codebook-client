"use client"

import CellContainer from "@/components/code/CellContainer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HandMetal, MessageCircle, BookCopy, Bookmark } from "lucide-react"

import { useParams } from "next/navigation"
import React from "react"

const NoteBookPage = () => {
  const { id } = useParams()

  return (
    <div>
      <div className="m-auto max-w-6xl  mt-12">
        <HeaderComponent />
      </div>
    </div>
  )
}

const HeaderComponent = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl mb-1 font-semibold">
          How to setup a monorepo project using NextJS, NestJS, Turborepo and
          pnpm
        </h1>
      </div>

      <div>
        <div className="flex gap-3 items-center mb-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex gap-2 items-center">
              <p>username</p>
              <Button variant="link" size="sm">
                Follow
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-gray-500">expected time</p>
              <p className="text-gray-500">date</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ActionBarComponent />
      </div>

      <div className="mt-12">
        <CellContainer />
      </div>
    </div>
  )
}

const ActionBarComponent = () => {
  return (
    <div className="border-y-2 border-gray-100 py-3 mt-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <div className="cursor-pointer flex gap-2 text-gray-400 items-center">
            <HandMetal />
            <p className="text-sm">7.6K</p>
          </div>

          <div className="cursor-pointer flex gap-2 text-gray-400 items-center">
            <MessageCircle />
            <p className="text-sm">250</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="cursor-pointer flex gap-2 text-gray-400 items-center">
            <BookCopy />
          </div>

          <div className="cursor-pointer flex gap-2 text-gray-400 items-center">
            <Bookmark />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteBookPage
