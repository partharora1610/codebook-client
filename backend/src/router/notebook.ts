import express, { Request, Response, NextFunction } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"
import prisma from "../db"
const router = express.Router()

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const notebook = await prisma.resource.findUnique({
      where: {
        id: id,
      },
    })

    if (!notebook) {
      return res.status(404).send("Notebook not found")
    }

    res.status(200).json(notebook)
  } catch (error) {
    res.status(500).send("Error processing the request")
  }
})

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notebooks = await prisma.resource.findMany()

    res.status(200).json(notebooks)
  } catch (error) {
    res.status(500).send("Error processing the request")
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "../uploads")
    fs.mkdirSync(uploadsDir, { recursive: true })
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

router.post(
  "/",
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
      }

      const notebook = await prisma.resource.create({
        data: {
          title,
          content: fileData,
        },
      })

      await fs.promises.unlink(filePath)

      res.status(201).send("Notebook created")
    } catch (error) {
      res.status(500).send("Error processing the request")
    }
  }
)

// Error handling middleware
router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  res.status(500).send("Error processing the request")
})

export default router
