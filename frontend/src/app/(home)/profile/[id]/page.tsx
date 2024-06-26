"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "next/navigation"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Notebook from "@/components/shared/cards/Notebook"
import { Button } from "@/components/ui/button"

const Page = () => {
  const { id } = useParams()

  return (
    <div className="m-auto max-w-7xl grid grid-cols-3 gap-6 mt-12">
      <div className="col-span-2 pr-8">
        <TabComponent />
      </div>
      <div className="border-l-2 border-gray-100 pl-6">
        <UserInfoComponent />
      </div>
    </div>
  )
}

const TabComponent = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold">@username</h3>
      <div className="mt-6 ">
        <Tabs defaultValue="sheet" className="w-full">
          <TabsList className="bg-white">
            <TabsTrigger className="" value="sheet">
              Sheets
            </TabsTrigger>
            <TabsTrigger className="" value="about">
              About
            </TabsTrigger>
          </TabsList>
          <div className="border-b-2 border-gray-50 mt-3"></div>
          <TabsContent value="sheet" className="mt-12">
            <UserSheetComponent />
          </TabsContent>
          <TabsContent value="about" className="mt-12">
            <UserAboutComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const UserSheetComponent = () => {
  return (
    <div className="flex flex-col gap-12">
      {Array.from({ length: 4 }).map((_, index) => (
        <Notebook
          key={index}
          index={index}
          title="Lorem ipsum dolor sit amet."
          id=""
        />
      ))}
    </div>
  )
}

const UserAboutComponent = () => {
  return <div>User About Section</div>
}

const UserInfoComponent = () => {
  return (
    <div className="px-4 py-4">
      <div>
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">partharora1610</h3>
        <p className="text-gray-500">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <p className="text-gray-500">Followers</p>
              <p>100</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-500">Following</p>
              <p>100</p>
            </div>
          </div>
        </p>
      </div>

      <div className="mt-6">
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos totam
          sed repellat asperiores modi dolore reiciendis! Excepturi cumque
          reiciendis similique!
        </p>
      </div>

      <div className="mt-8">
        <div className="flex gap-4">
          <Button className="bg-primary-700 rounded-full hover:bg-primary-800 hover:shadow-sm transition-all">
            Follow
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page

/**
 * What else is left in the project
 * 1. Improve the UI for the client from the cli
 * 2. Create user profile
 * 3. Dark and light theme
 * 4. User profile page
 * 5. Setup complete auth
 * 6. Store for resources
 */
