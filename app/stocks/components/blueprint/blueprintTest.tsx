import { EditTemplate } from "./editTemplate"
import { DraggableWrapper } from "./blueprint"
import { CompanyKeyInfo } from "../keyInfo2/keyInfo2"
import { useState } from "react"

export const BluePrintTemplateTest = () => {
  const [edit, setEdit] = useState<boolean>(false)
  // Keep position state at parent level
  const [componentPosition, setComponentPosition] = useState({ x: 500, y: 50 })
  
  return (
    <div>
      <EditTemplate edit={edit} setEdit={setEdit}></EditTemplate>
      
      {edit === true ? (
        <DraggableWrapper
          initialPosition={componentPosition}
          className="border-2"
          onPositionChange={setComponentPosition} // Pass callback to update position
        >
          <CompanyKeyInfo></CompanyKeyInfo>
        </DraggableWrapper>
      ) : (
        <div 
          style={{
            position: 'relative',
            transform: `translate(${componentPosition.x}px, ${componentPosition.y}px)`,
        }}
        >
          <CompanyKeyInfo></CompanyKeyInfo>
        </div>
      )}
    </div>
  )
}