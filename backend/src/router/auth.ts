import { Request, Response, Router } from "express"
import prisma from "../db"
import jwtInstance from "../utils/jwt"

const router = Router()

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    console.log(username, password)

    if (!username || !password) {
      return res.status(400).send("Username and password are required")
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(404).send("User not found")
    }
    if (user.password !== password) {
      return res.status(401).send("Invalid password")
    }

    const token = jwtInstance.sign({ userId: user.id }, "1d")

    res.status(200).send({ token, user })
  } catch (error) {
    res.status(500).send("Error logging in")
  }
})

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword, email } = req.body
    console.log({ username, password, confirmPassword, email })

    if (!username || !password || !confirmPassword || !email) {
      return res.status(400).send("Username and password are required")
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (existingUser) {
      return res.status(409).send("Username already exists")
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    })

    const token = jwtInstance.sign({ userId: user.id }, "1d")

    res.status(201).send({ token, user })
  } catch (error) {
    res.status(500).send("Error registering user")
  }
})

router.post("/check-username", async (req: Request, res: Response) => {
  try {
    const { username } = req.body

    if (!username) {
      return res.status(400).send("Username is required")
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (existingUser) {
      return res.status(409).send("Username already exists")
    }

    res.status(200).send("Username is unique")
  } catch (error) {
    res.send(500).send("Error checking username")
  }
})

// Refresh route
router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).send("Unauthorized")
    }

    const payload = jwtInstance.verify(token)

    if (!payload || !payload.userId) {
      return res.status(401).send("Unauthorized")
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },

      select: {
        id: true,
        username: true,
      },
    })

    if (!user) {
      return res.status(401).send("Unauthorized")
    }

    res.status(200).send({ user })
  } catch (error) {
    res.status(401).send("Unauthorized")
  }
})

export default router
