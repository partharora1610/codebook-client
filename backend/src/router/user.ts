import { Request, Response, Router } from "express"
import prisma from "../db"
import { Authenticated } from "../middleware/authenticated"

const router = Router()

router.use(Authenticated)

router.post("/follow", async (req: Request, res: Response) => {
  let { followingId } = req.body
  const userId = req.userId as string

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const db_user = await prisma.user.findUnique({
    where: {
      id: followingId,
    },
  })

  if (!db_user) {
    return res.status(404).json({ message: "User not found." })
  }

  followingId = db_user.id

  if (userId === followingId) {
    return res.status(400).json({ message: "A user cannot follow themselves." })
  }

  try {
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
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
        followerId: userId,
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

router.get("/bookmarks", async (req: Request, res: Response) => {
  const userId = req.userId as string

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { bookmarks: true },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json(user.bookmarks)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: "An error occurred while retrieving bookmarks" })
  }
})

export default router
