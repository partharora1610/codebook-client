import multer from "multer"
import fs from "fs"
import path from "path"

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
export default upload
