"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from "./CodeEditor"
import PreviewWindow from "./PreviewWindow"

interface CodeCellProp {
  cell: any
}

const CodeCell: React.FC<CodeCellProp> = ({ cell }) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head></head>
  <body>
    <div id="root"></div>
    <script>
    
    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      console.error(err);
    }

    window.addEventListener('error', (event) => {
      event.preventDefault();
      handleError(event.error);
    })

    window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);         
    </script>
  </body>
  </html>
`

  return (
    <div className="w-full h-[30vh] border-4 border-gray-500">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="text-black">
          <div className="w-full h-full">
            <CodeEditor initValue={""} onChange={() => {}} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="text-black">
          <div className="w-full h-full">
            <PreviewWindow code={""} html={html} error={""} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default CodeCell
