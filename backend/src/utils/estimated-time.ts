const wordsPerMinuteMd = 250
const linesPerMinuteJs = 1.5

function countWords(text: string): number {
  return (text.match(/\w+/g) || []).length
}

function countLinesOfCode(text: string): number {
  return text.split("\n").length
}

export function estimateReadingTime(notebook: any[]): number {
  let totalMdWords = 0
  let totalJsLines = 0

  notebook.forEach((cell) => {
    if (cell.type === "text") {
      totalMdWords += countWords(cell.content)
    } else if (cell.type === "code") {
      totalJsLines += countLinesOfCode(cell.content)
    }
  })

  const timeMdMinutes = totalMdWords / wordsPerMinuteMd
  const timeJsMinutes = totalJsLines / linesPerMinuteJs

  return timeMdMinutes + timeJsMinutes
}
