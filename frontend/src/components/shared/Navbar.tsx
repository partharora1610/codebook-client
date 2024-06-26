import React from "react"
import { MoonIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import GlobalSearch from "./GlobalSearch"

const Navbar = () => {
  return (
    <div className="bg-white px-4 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <h1 className="text-lg font-semibold">codeBook</h1>
          <GlobalSearch />
        </div>
        <div className="flex items-center gap-8">
          <div className="cursor-pointer">
            <MoonIcon size={28} />
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default Navbar
