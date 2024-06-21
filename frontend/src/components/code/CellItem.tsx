import CodeCell from "./CodeCell"
import MarkdownCell from "./MarkdownCell"

const CellItem = ({ cell }: any) => {
  let child: JSX.Element

  if (cell.type == "code") {
    child = <CodeCell cell={cell} />
  } else {
    child = <MarkdownCell cell={cell} />
  }

  return <div>{child}</div>
}

export default CellItem
