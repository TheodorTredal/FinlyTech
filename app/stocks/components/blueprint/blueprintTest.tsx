import { useState } from "react"
import { EditTemplate } from "./editTemplate"
import { DraggableWrapper } from "./blueprint"
import { CompanyKeyInfo } from "../keyInfo2/keyInfo2"
import MyChart from "../graph/rechartTest"
import { BluePrintSidebar } from "./sidebarAddComponent"

export const BluePrintTemplateTest = () => {
    const [edit, setEdit] = useState<boolean>(false)
    const [componentPosition, setComponentPosition] = useState({ x: 500, y: 50 })
    const [component2Position, setComponent2Position] = useState({x: 100, y: 100})


    return (
      <div>
        <BluePrintSidebar></BluePrintSidebar>
        <EditTemplate edit={edit} setEdit={setEdit}></EditTemplate>
        <DraggableWrapper
          initialPosition={componentPosition}
          className={edit ? "border-2" : ""}
          onPositionChange={setComponentPosition}
          draggable={edit} // Add this prop to control dragging
        >
          <CompanyKeyInfo />
        </DraggableWrapper>


        <DraggableWrapper
          initialPosition={component2Position}
          className={edit ? "border-2" : ""}
          onPositionChange={setComponent2Position}
          draggable={edit} // Add this prop to control dragging
        >
          <MyChart></MyChart>
        </DraggableWrapper>


      </div>
    )
  }