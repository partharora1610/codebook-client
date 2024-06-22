"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function Home() {
  return (
    <div className="m-auto max-w-7xl grid grid-cols-3 gap-4 mt-12">
      <div className="col-span-2">
        <NotebookContainer />
      </div>
      <div className="bg-gray-300"></div>
    </div>
  )
}

const NotebookContainer = () => {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <Notebook key={i} index={i} />
      ))}
    </div>
  )
}

const Notebook = ({ index }: { index: number }) => {
  return (
    <div className="border-b-2 pb-8 border-gray-100 px-2 py-3 rounded-sm">
      <div className="flex gap-3 items-center mb-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>username</p>
      </div>

      <Link key={index} href={`/notebook/${index}`}>
        <div>
          <h1 className="text-xl mb-1 font-semibold">
            Understanding useEffect and useState in React
          </h1>
          <p className="text-gray-500 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            amet.
          </p>
        </div>
      </Link>

      <div>
        <div className="flex gap-2">
          <div className="bg-gray-200 px-2 py-1 rounded-sm">JavaScript</div>
          <div className="bg-gray-200 px-2 py-1 rounded-sm">
            Web development
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-7">
        <div className="flex gap-6">
          <p className="">date</p>
          <p>claps</p>
          <p>likes</p>
        </div>

        <div className="flex gap-6">
          <p>bookmark</p>
          <p>duplicate</p>
        </div>
      </div>
    </div>
  )
}
