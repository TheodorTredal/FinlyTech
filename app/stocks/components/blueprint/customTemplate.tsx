// BluePrintTemplateTest.tsx
import React, { useState } from "react"
import { DraggableWrapper } from "./draggableWrapper"
import { CompanyKeyInfo } from "../keyInfo/companyKeyInfo"
import MyChart from "../graph/companyGraph"
import { BluePrintSidebar } from "./sidebarAddComponent"
import "./blueprint.css"

interface BluePrintTemplateProps {
  edit: boolean;
}

interface ComponentInstance {
  id: string;
  type: string;
  position: { x: number, y: number }
  props?: any;
}

export const BluePrintTemplateTest = ({ edit }: BluePrintTemplateProps) => {
  const [components, setComponents] = useState<ComponentInstance[]>([])
  const [componentPosition, setComponentPosition] = useState({ x: 0, y: 50 })
  const [component2Position, setComponent2Position] = useState({ x: 400, y: 50 })
  const gridSize = 20;

  const updateComponentPosition = (componentId: string, newPosition: { x: number, y: number }) => {
    setComponents(prev =>
      prev.map(compent =>
        compent.id === componentId
          ? { ...compent, position: newPosition }
          : compent
      )
    )
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const componentType = e.dataTransfer.getData("component-type");
    
    if (componentType) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      
      const finalX = edit ? Math.round(x / gridSize) * gridSize : x;
      const finalY = edit ? Math.round(y / gridSize) * gridSize : y;
      
      const newComponent: ComponentInstance = {
        id: `comp-${Date.now()}`,
        type: componentType,
        position: { x: finalX, y: finalY }
      };
      
      setComponents(prev => [...prev, newComponent]);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  }


  // const handleDelete = (component) => {


  // }

  const renderComponent = (componentInstance: ComponentInstance) => {
    let ComponentToRender;
    
    switch (componentInstance.type) {
      case "chart":
        ComponentToRender = MyChart;
        break;
      case "keyInfo":
        ComponentToRender = CompanyKeyInfo;
        break;
      default:
        return null;
    }

    return (
      <DraggableWrapper
        key={componentInstance.id}
        initialPosition={componentInstance.position}
        className={edit ? "animated-border" : ""}
        onPositionChange={(newPosition) => updateComponentPosition(componentInstance.id, newPosition)}
        draggable={edit}
        snapToGrid={edit}
        gridSize={gridSize}
      >
        <ComponentToRender {...(componentInstance.props || {})} />
      </DraggableWrapper>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-hidden fixed">

      {/* Main drop zone with higher z-index */}
      <div
        className="absolute inset-0 z-0"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        style={{ 
          minHeight: '100vh',
          backgroundColor: 'transparent' // Ensure it's not blocking
        }}
      >
        {/* Grid background */}
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
        
        {/* Existing components */}
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
          className={edit ? "animated-border" : ""}
          onPositionChange={setComponent2Position}
          draggable={edit}
          snapToGrid={edit}
          gridSize={gridSize}
        >
          <MyChart />
        </DraggableWrapper>

        {/* Dynamic components */}
        {components.map(renderComponent)}
        
        {/* Debug info */}
        {edit && (
          <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
            Components: {components.length}
          </div>
        )}
      </div>
    </div>
  )
}