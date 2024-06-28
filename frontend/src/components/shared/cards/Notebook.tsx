"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDateToMonthYear } from "@/lib/utils"
import { Bookmark } from "lucide-react"
import Link from "next/link"

const Notebook = ({
  index,
  title,
  id,
  createdAt,
  username,
  estimatedTime,
}: {
  index: number
  title: string
  id: string
  estimatedTime: number
  username: string
  createdAt: string
}) => {
  return (
    <div className="border-b-2 pb-12 border-gray-100 px-2 py-3 rounded-sm">
      <div className="flex gap-2 items-center mb-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm">{username}</p>
      </div>

      <Link key={index} href={`/notebook/${id}`}>
        <div>
          <h1 className="text-xl mb-1 font-semibold">{title}</h1>
          <p className="text-gray-500 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            amet.
          </p>
        </div>
      </Link>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-3 items-center">
          <p className="font-medium text-sm uppercase text-gray-600">
            {formatDateToMonthYear(createdAt)}
          </p>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          <div className="text-sm">{estimatedTime} min read</div>
        </div>

        <div>
          <Bookmark size={22} />
        </div>
      </div>
    </div>
  )
}

export default Notebook
