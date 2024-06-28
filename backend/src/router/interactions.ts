import { Request, Response, Router } from "express"
import prisma from "../db"

const router = Router()

router.post("/:id", async (req: Request, res: Response) => {
  const resourceId = req.params.id
  const userId = req.userId
  const { count } = req.body

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const thumbsUpCount = await prisma.thumbsUp.count({
      where: {
        resourceId,
        userId,
      },
    })

    if (thumbsUpCount >= 30) {
      return res.status(400).json({
        message:
          "You have reached the maximum number of thumbs up for this resource.",
      })
    }

    const interaction = await prisma.thumbsUp.upsert({
      where: {
        userId_resourceId: {
          userId,
          resourceId,
        },
      },
      update: {
        count,
      },
      create: {
        count,
        userId,
        resourceId,
      },
    })

    res.status(200).json({ message: "Thumbs up added successfully." })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." })
  }
})

export default router
