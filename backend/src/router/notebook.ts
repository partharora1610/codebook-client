import express, { Request, Response, NextFunction } from "express"
import fs from "fs"
import prisma from "../db"
import upload from "../utils/multer"
import { Authenticated } from "../middleware/authenticated"
import { estimateReadingTime } from "../utils/estimated-time"
const router = express.Router()

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notebook = await prisma.resource.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    })

    if (!notebook) {
      return res.status(404).send("Notebook not found")
    }

    res.status(200).send(notebook)
  } catch (error) {
    res.status(500).send("Error processing the request")
  }
})

// GET /notebook
router.get("/", async (req: Request, res: Response) => {
  try {
    const notebooks = await prisma.resource.findMany({
      where: {
        accessType: "PUBLIC",
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    })

    res.status(200).send(notebooks)
  } catch (error) {
    res.status(500).send("Error processing the request")
  }
})

router.post(
  "/",
  Authenticated,
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body

      if (!title || !req.file) {
        return res.status(400).send("Title, content, and file are required")
      }

      const filePath = req.file.path

      let fileData: any
      const fileBuffer = await fs.promises.readFile(filePath)

      if (req.file.mimetype === "application/javascript") {
        fileData = fileBuffer.toString()
      } else {
        throw new Error("Invalid file type")
      }

      const estimatedTime = Math.ceil(estimateReadingTime(JSON.parse(fileData)))

      const notebook = await prisma.resource.create({
        data: {
          title,
          content: fileData,
          estimatedTime,
          accessType: "PUBLIC",
          user: {
            connect: {
              id: req.userId,
            },
          },
        },
      })

      // Deleting the file from the server after processing
      await fs.promises.unlink(filePath)

      if (!notebook) {
        return res.status(500).send("Error creating notebook")
      }

      res.status(201).send("Notebook created")
    } catch (error) {
      console.error(error)
      res.status(500).send("Error processing the request")
    }
  }
)

export default router
