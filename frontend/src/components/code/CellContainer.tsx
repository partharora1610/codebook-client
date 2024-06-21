import React from "react"
import CellItem from "./CellItem"

const data = [
  {
    content:
      "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
    type: "text",
    id: "imlrr",
  },
  {
    content: "",
    type: "code",
    id: "kcqz4",
  },
  {
    content:
      "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
    type: "text",
    id: "kcqz4",
  },
  {
    content:
      "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
    type: "text",
    id: "kcqz4",
  },
  {
    content:
      "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
    type: "text",
    id: "kcqz4",
  },
  {
    content:
      "# Project X\n## Overview\nProject X is a powerful, easy-to-use tool designed to simplify data analysis tasks. It provides a variety of features including data cleaning, transformation, visualization, and machine learning model building.",
    type: "text",
    id: "kcqz4",
  },
]

const CellContainer = () => {
  return (
    <div>
      <div className="flex flex-col gap-14">
        {data.map((cell) => {
          return <CellItem key={cell.id} cell={cell} />
        })}
      </div>
    </div>
  )
}

export default CellContainer
