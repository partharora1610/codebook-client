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
                {/* Show this in case there are no results */}
                {/* <div className="mt-32">
                  <div className="text-center">No Results</div>
                </div> */}

                <div className="flex flex-col gap-2">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <GlobalSearchCard
                      key={index}
                      index={index}
                      title="Lorem ipsum dolor sit amet."
                      id="234567"
                    />
                  ))}
                </div>
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const GlobalSearchCard = ({
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
        <div>
          <h1 className="text-lg mb-1 font-medium text-gray-950">{title}</h1>
          <p className="text-gray-500 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            amet.
          </p>
        </div>
      </Link>
    </div>
  )
}

export default GlobalSearchDisplay
