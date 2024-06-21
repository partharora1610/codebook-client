import jwt from "jsonwebtoken"

interface JWTPayload {
  userId: string
}

class JWT {
  private secret: string
  private algorithm: jwt.Algorithm

  constructor(secret: string, algorithm: jwt.Algorithm = "HS256") {
    this.secret = secret
    this.algorithm = algorithm
  }

  sign(payload: JWTPayload, expiresIn?: string | number): string {
    const options: jwt.SignOptions = {
      algorithm: this.algorithm,
      ...(expiresIn && { expiresIn }),
    }

    return jwt.sign(payload, this.secret, options)
  }

  verify(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, this.secret, {
        algorithms: [this.algorithm],
      }) as JWTPayload
    } catch (error) {
      console.error("Token verification failed:", error)
      return null
    }
  }
}

const secret = process.env.JWT_SECRET || "default-secret"
const jwtInstance = new JWT(secret)

export default jwtInstance
