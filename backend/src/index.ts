import { Request, Response } from "express"

const express = require("express")
const bodyParser = require("body-parser")
import cors from "cors"
import authRouter from "./router/auth"
import notebookRouter from "./router/notebook"
import interactionRouter from "./router/interactions"
import userRouter from "./router/user"

const app = express()
const port = 5000

const corsOptions = {
  origin: "*",
  credentials: true,
}

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/health", (req: Request, res: Response) => {
  console.log("Health check")
  res.status(200).send("Server is running")
})

app.use("/auth", authRouter)
app.use("/notebook", notebookRouter)
app.use("/interactions", interactionRouter)
app.use("/user", userRouter)

// Starting server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
