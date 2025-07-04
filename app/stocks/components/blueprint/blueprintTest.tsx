import { EditTemplate } from "./editTemplate"
import { DraggableWrapper } from "./blueprint"
import { CompanyKeyInfo } from "../keyInfo2/keyInfo2"
import { useState } from "react"

export const BluePrintTemplateTest = () => {
    const [edit, setEdit] = useState<boolean>(false)
    const [componentPosition, setComponentPosition] = useState({ x: 500, y: 50 })
  
    return (
      <div>
        <EditTemplate edit={edit} setEdit={setEdit}></EditTemplate>
        <DraggableWrapper
          initialPosition={componentPosition}
          className={edit ? "border-2" : ""}
          onPositionChange={setComponentPosition}
          draggable={edit} // Add this prop to control dragging
        >
          <CompanyKeyInfo />
        </DraggableWrapper>
      </div>
    )
  }