import React, { useEffect, useState } from "react"
import CellItem from "./CellItem"
import { useParams } from "next/navigation"
import axios from "axios"

// const data = [
//   {
//     content:
//       "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
//     type: "text",
//     id: "imlrr",
//   },
//   {
//     content: "",
//     type: "code",
//     id: "kcqz4",
//   },
//   {
//     content:
//       "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
//     type: "text",
//     id: "kcqz4",
//   },
//   {
//     content:
//       "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
//     type: "text",
//     id: "kcqz4",
//   },
//   {
//     content:
//       "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
//     type: "text",
//     id: "kcqz4",
//   },
//   {
//     content:
//       "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
//     type: "text",
//     id: "kcqz4",
//   },
// ]

const CellContainer = () => {
  const { id } = useParams()
  const [notebook, setNotebook] = useState<any>(null)

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:5000/notebook/${id}`)
        setNotebook(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    getData()
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-14">
        {notebook &&
          JSON.parse(notebook.content).map((cell: any) => {
            return <CellItem key={cell.id} cell={cell} />
          })}
      </div>
    </div>
  )
}

export default CellContainer
