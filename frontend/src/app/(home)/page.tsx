"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Notebook from "@/components/shared/cards/Notebook"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import storageManager from "@/lib/local-storage"

export default function Home() {
  return (
    <div className="m-auto max-w-7xl grid grid-cols-3 gap-4 mt-12">
      <div className="col-span-2 pr-8">
        <NotebookContainer />
      </div>
      <div className="pl-8 py-8 pr-4 border-l-2 border-gray-100 flex flex-col gap-10">
        <WhoFollowComponent />
        <RecentlySavedComponent />
      </div>
    </div>
  )
}

const WhoFollowComponent = () => {
  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-3">Who Follow</h3>
      <div className="flex flex-col gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar className="w-7 h-7">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="">Shadcn</p>
                <p className="text-sm text-gray-500">Lorem, ipsum dolor.</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-full">
                Follow
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const RecentlySavedComponent = () => {
  // Move the logic to a separate component
  const [bookmarks, setBookmarks] = useState<any[]>([])

  useEffect(() => {
    const fetchBookMarks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/bookmarks`,
          {
            headers: {
              Authorization: `Bearer ${storageManager.getItem("token")}`,
            },
          }
        )
        console.log({ response })

        console.log(response.data)
        setBookmarks(response.data)
      } catch (error) {
        console.error("Error fetching bookmarks:", error)
      }
    }

    fetchBookMarks()
  }, [])

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Recently Saved Sheets</h3>
      <div className="flex flex-col gap-6">
        {JSON.stringify(bookmarks)}

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="items-center hover:bg-gray-50 px-2 py-2 rounded-sm cursor-pointer transition-all"
          >
            <div className="flex gap-2 items-center mb-3">
              <Avatar className="w-5 h-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm">partharora</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">
                Understanding how to use axios is React Lorem ipsum dolor sit
                amet consectetur adipisicing elit.
              </h3>
            </div>

            <div className="flex gap-2 text-sm mt-3 text-gray-500">
              <p>Dec 24, 2023</p>
              <p>5 min read</p>
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const NotebookContainer = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:5000/notebook`)
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    getData()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      {/* {JSON.stringify(data)} */}

      {data &&
        data.map((notebook: any, index: number) => (
          <Notebook
            key={index}
            index={index}
            title={notebook.title}
            id={notebook.id}
          />
        ))}

      {Array.from({ length: 10 }).map((_, index) => (
        <Notebook
          key={index}
          index={index}
          title="Lorem ipsum dolor sit amet."
          id="234567"
        />
      ))}
    </div>
  )
}
