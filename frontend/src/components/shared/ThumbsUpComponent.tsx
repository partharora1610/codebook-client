import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { HandMetal } from "lucide-react"

interface ThumbsUpComponent {
  postId: string
}

const ThumbsUpComponent: React.FC<ThumbsUpComponent> = ({ postId }) => {
  const [count, setCount] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isHolding) {
      incrementIntervalRef.current = setInterval(() => {
        setCount((prev) => prev + 1)
      }, 140)
    } else {
      if (incrementIntervalRef.current) {
        clearInterval(incrementIntervalRef.current)
      }
    }

    return () => {
      if (incrementIntervalRef.current) {
        clearInterval(incrementIntervalRef.current)
      }
    }
  }, [isHolding])

  const handleMouseDown = () => {
    clickTimeoutRef.current = setTimeout(() => {
      setIsHolding(true)
    }, 140)
  }

  const handleMouseUp = async () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    if (isHolding) {
      setIsHolding(false)
    } else {
      setCount((prev) => prev + 1)
    }

    try {
      console.log({ count })
      // await axios.post("/api/update-hearts", { postId,  count + 1 })
    } catch (error) {
      //   console.error("Error updating hearts:", error)
    }
  }

  return (
    <div>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <HandMetal />
      </button>
    </div>
  )
}

export default ThumbsUpComponent
