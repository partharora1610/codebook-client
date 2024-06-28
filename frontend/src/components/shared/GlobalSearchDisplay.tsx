import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import GlobalSearch from "./GlobalSearch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// this will call the API
const globalSearch = async ({ query, type }: any) => {}

const GlobalSearchDisplay = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState([])

  const global = searchParams.get("global")
  const type = searchParams.get("type")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await globalSearch({ query: global, type: type })
        console.log(data)
        // setResult(data)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    }

    // fetching the data
    // if (global) {
    //   fetchData()
    // }

    if (global) {
      console.log("fetching data")
    }
  }, [global, type])

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <GlobalSearch />
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[700px]">
          <DialogHeader>
            <DialogTitle>Search for diffrent devsheets and users</DialogTitle>
            <DialogDescription>
              <div className="mt-4 mb-6">
                <GlobalSearch />
              </div>

              <ScrollArea className="h-[560px]">
                <div className="flex flex-col gap-2">
                  <GlobalSearchCardUser
                    username="partharora1610"
                    index="1"
                    id="123456"
                    name="Parth Arora"
                  />
                  {Array.from({ length: 5 }).map((_, index) => (
                    <GlobalSearchCardPost
                      key={index}
                      index={index}
                      title="Lorem ipsum dolor sit amet."
                      id="234567"
                    />
                  ))}
                  <GlobalSearchCardUser
                    username="partharora1610"
                    index="1"
                    id="123456"
                    name="Parth Arora"
                  />
                </div>
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const GlobalSearchCardPost = ({
  index,
  title,
  id,
}: {
  index: number
  title: string
  id: string
}) => {
  return (
    <div className="border-b-2  border-gray-100 px-2 py-3 rounded-sm">
      <Link
        key={index}
        href={`/notebook/${id}`}
        className="flex gap-4 items-center"
      >
        <div>
          <Book size={28} />
        </div>
        <div className="flex justify-between w-full items-center">
          <div>
            <h1 className="text-lg mb-1 font-medium text-gray-950">{title}</h1>
            <p className="text-gray-500 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
              amet.
            </p>
          </div>

          <div>
            <div className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md text-sm">
              notebook
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

const GlobalSearchCardUser = ({
  username,
  index,
  id,
  name,
}: {
  id: string
  username: string
  index: string
  name: string
}) => {
  return (
    <div className="border-b-2  border-gray-100 px-2 py-3 rounded-sm">
      <Link
        key={index}
        href={`/profile/123`}
        className="flex gap-4 items-center"
      >
        <div>
          <Avatar className="w-9 h-9">
            <AvatarFallback className="font-semibold bg-gray-300">
              {username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between w-full items-center">
          <div>
            <h1 className="text-lg mb-1 font-medium text-gray-950">
              {username}
            </h1>
            <p className="text-gray-500 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
              amet.
            </p>
          </div>
          <div>
            <div className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-md text-sm">
              user
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GlobalSearchDisplay
