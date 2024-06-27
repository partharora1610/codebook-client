import { Request, Response, Router } from "express"
import prisma from "../db"

const router = Router()

// creating a comment on the resource -> Notebook
router.post("/:id", async (req: Request, res: Response) => {
  const resourceId = req.params.id
  const userId = req.userId
  const { content } = req.body

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        resource: {
          connect: {
            id: resourceId,
          },
        },
        content,
      },
    })

    res.status(200).json({
      message: "Comment created successfully   successfully.",
      data: comment,
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." })
  }
})

export default router
