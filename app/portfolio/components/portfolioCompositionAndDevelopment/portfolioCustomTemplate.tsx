// BluePrintTemplateTest.tsx
import React, { useEffect, useState } from "react"
import { DraggableWrapper } from "@/app/stocks/components/blueprint/draggableWrapper"

// Komponenter
import { CompanyKeyInfo } from "@/app/stocks/components/keyInfo/companyKeyInfo"
import { PortfolioPieChart } from "../pieCharts.tsx/PortfolioPieChart"
import PortfolioGraph from "../PortfolioGraph/portfolioGraph"



interface BluePrintTemplateProps {
  edit: boolean;
  currentPortfolio: string
}

interface ComponentInstance {
  id: string;
  type: string;
  position: { x: number, y: number }
  props?: any;
}

export const BluePrintTemplateTestPortfolio = ({ edit, currentPortfolio }: BluePrintTemplateProps) => {
  const [components, setComponents] = useState<ComponentInstance[]>([])
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
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
        position: { x: finalX, y: finalY },
        props: componentType === "pieChart" ? { portfolioTitle: currentPortfolio} : {}
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


  const handleComponentClick = (componentid: string) => {
    if (edit) {

      setSelectedComponentId(componentid);

    }
  }


  useEffect(() => {
    if (selectedComponentId) {
      console.log("SELECTEDCOMPONENT ID: ", selectedComponentId);
    }
  }, [selectedComponentId])

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace" && selectedComponentId && edit) {
        setComponents(prev => prev.filter(c => c.id !== selectedComponentId));
        setSelectedComponentId(null);
        console.log("Backspace ble klikket!");
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [selectedComponentId, edit]);


  const renderComponent = (componentInstance: ComponentInstance) => {
    let ComponentToRender;
    
    switch (componentInstance.type) {
        case "pieChart":
            ComponentToRender = PortfolioPieChart;
            break;

        case "keyInfo":
            ComponentToRender = CompanyKeyInfo;
            break;

          case "portfolioChart":
            ComponentToRender = PortfolioGraph;
            break;
      default:
        return null;
    }

    return (
  <DraggableWrapper
    key={componentInstance.id}
    initialPosition={componentInstance.position}
    style={{ width: 300, height: 300 }} // <--- viktig
    className={edit ? "animated-border" : ""}
    onPositionChange={(newPosition) => updateComponentPosition(componentInstance.id, newPosition)}
    draggable={edit}
    snapToGrid={edit}
    gridSize={gridSize}
  >
    <div style={{ width: '100%', height: '100%' }}>
      <ComponentToRender {...(componentInstance.props || {})} />
    </div>
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
                  backgroundSize: `${gridSize}px ${gridSize}px`,
                  width: 'calc(100vw - 2.7vw)',
                  height: 'calc(100vw - 52.7vw'
                } 
              : {
                width: 'calc(100vw - 2.7vw)',
                height: 'calc(100vw - 52.7vw'
              }
          }
        />

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