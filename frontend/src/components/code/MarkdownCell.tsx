import MDEditor from "@uiw/react-md-editor"

interface MarkdownCellProps {
  cell: any
}

const MarkdownCell: React.FC<MarkdownCellProps> = ({ cell }) => {
  return (
    <div className="">
      <MDEditor.Markdown
        source={cell.content}
        // style={{
        //   backgroundColor: "#f3f4f6",
        //   color: "#000",
        // }}
        className="p-4 text-left"
      />
    </div>
  )
}

export default MarkdownCell
