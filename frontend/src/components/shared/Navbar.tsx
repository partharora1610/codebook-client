import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  return (
    <div className="bg-white px-4 py-2 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <h1 className="text-lg font-semibold">codeBook</h1>
          <div>gloablSearchbar</div>
        </div>
        <div>
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
