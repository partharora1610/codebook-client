import { Request, Response, Router } from "express"
import prisma from "../db"
import jwtInstance from "../utils/jwt"

const router = Router()

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    console.log(username, password)

    // use zod for that.
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

    // Check if the password is correct => compare hashing the password with the stored password
    if (user.password !== password) {
      return res.status(401).send("Invalid password")
    }

    // Generate JWT token
    const token = jwtInstance.sign({ username }, "1d")

    // Send token to the client
    res.status(200).send({ token })
  } catch (error) {
    res.status(500).send("Error logging in")
  }
})

export default router
