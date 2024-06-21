import { NextFunction, Request, Response } from "express"
import jwtInstance from "../utils/jwt"
import prisma from "../db"

export const Authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      throw new Error("Unauthorized")
    }

    const payload = jwtInstance.verify(token)

    if (!payload || !payload.userId) {
      throw new Error("Unauthorized")
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    })

    if (!user) {
      throw new Error("Unauthorized")
    }

    req.userId = user.id

    next()
  } catch (error) {
    res.status(401).send("Unauthorized")
  }
}
