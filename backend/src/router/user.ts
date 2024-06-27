import { Request, Response, Router } from "express"
import prisma from "../db"

const router = Router()
router.post("/follow", async (req: Request, res: Response) => {
  let { followingId } = req.body
  const { userId: followerId } = req.params

  const db_user = await prisma.user.findUnique({
    where: {
      id: followingId,
    },
  })

  if (!db_user) {
    return res.status(404).json({ message: "User not found." })
  }

  followingId = db_user.id

  if (followerId === followingId) {
    return res.status(400).json({ message: "A user cannot follow themselves." })
  }

  try {
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })

    if (existingFollow) {
      return res
        .status(400)
        .json({ message: "You are already following this user." })
    }

    // Improve this....
    const follow = await prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    })

    res.status(200).json({ message: "Successfully followed the user.", follow })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." })
  }
})

export default router
