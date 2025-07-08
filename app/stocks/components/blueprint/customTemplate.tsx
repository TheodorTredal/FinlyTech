import { useState } from "react"
import { EditTemplateButton } from "./editTemplateButton"
import { DraggableWrapper } from "./draggableWrapper"
import { CompanyKeyInfo } from "../keyInfo/companyKeyInfo"
import MyChart from "../graph/companyGraph"
import { BluePrintSidebar } from "./sidebarAddComponent"
import "./blueprint.css"

export const BluePrintTemplateTest = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const [componentPosition, setComponentPosition] = useState({ x: 0, y: 50 })
  const [component2Position, setComponent2Position] = useState({x: 400, y: 50})

  const gridSize = 20;

  return (
    <div className="min-h-screen w-full overflow-hidden fixed">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={
          edit
            ? {
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: `${gridSize}px ${gridSize}px`
              }
            : {}
        }
      />

      <BluePrintSidebar></BluePrintSidebar>
      <EditTemplateButton edit={edit} setEdit={setEdit}></EditTemplateButton>

      <DraggableWrapper
        initialPosition={componentPosition}
        className={edit ? "animated-border" : ""}
        onPositionChange={setComponentPosition}
        draggable={edit}
        snapToGrid={edit}
        gridSize={gridSize}
      >
        <CompanyKeyInfo />
      </DraggableWrapper>

      <DraggableWrapper
        initialPosition={component2Position}
        className={edit ? "animated-border" : "bg-red-400"}
        onPositionChange={setComponent2Position}
        draggable={edit}
        snapToGrid={edit}
        gridSize={gridSize}
      >
        <MyChart></MyChart>
      </DraggableWrapper>
    </div>
  )
}