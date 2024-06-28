const notebookContent: any[] = [
  {
    type: "md",
    content: "This is a sample markdown cell. It has some text to read.",
  },
  {
    type: "js",
    content:
      "console.log('Hello, world!');\nfunction add(a, b) {\n  return a + b;\n}",
  },
]

const wordsPerMinuteMd = 250
const linesPerMinuteJs = 1.5

function countWords(text: string): number {
  return (text.match(/\w+/g) || []).length
}

function countLinesOfCode(text: string): number {
  return text.split("\n").length
}

function estimateReadingTime(notebook: any[]): number {
  let totalMdWords = 0
  let totalJsLines = 0

  notebook.forEach((cell) => {
    if (cell.type === "md") {
      totalMdWords += countWords(cell.content)
    } else if (cell.type === "js") {
      totalJsLines += countLinesOfCode(cell.content)
    }
  })

  const timeMdMinutes = totalMdWords / wordsPerMinuteMd
  const timeJsMinutes = totalJsLines / linesPerMinuteJs

  return timeMdMinutes + timeJsMinutes
}

const estimatedTime = estimateReadingTime(notebookContent)
