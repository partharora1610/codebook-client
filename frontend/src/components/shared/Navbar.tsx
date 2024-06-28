"use client"

import React from "react"
import { MoonIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/store/auth-store"
import GlobalSearchDisplay from "./GlobalSearchDisplay"

const Navbar = () => {
  const { user } = useAuthStore()
  return (
    <div className="bg-white px-4 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <h1 className="text-lg font-semibold">codeBook</h1>
          <GlobalSearchDisplay />
        </div>
        {JSON.stringify(user)}
        <div className="flex items-center gap-8">
          <div className="cursor-pointer">
            <MoonIcon size={28} />
          </div>
          <ProfileDropDown />
        </div>
      </div>
    </div>
  )
}

const ProfileDropDown = () => {
  const { user, logout } = useAuthStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem
          onClick={logout}
          className="font-medium text-red-700 focus:bg-red-100 focus:text-red-700"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navbar
