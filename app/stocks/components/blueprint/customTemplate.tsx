// import React, { useState } from "react"
// import { EditTemplateButton } from "./editTemplateButton"
// import { DraggableWrapper } from "./draggableWrapper"
// import { CompanyKeyInfo } from "../keyInfo/companyKeyInfo"
// import MyChart from "../graph/companyGraph"
// import { BluePrintSidebar } from "./sidebarAddComponent"
// import "./blueprint.css"

// interface BluePrintTemplateProps {
//   edit: boolean;
// }

// interface ComponentInstance {
//   id: string;
//   type: string;
//   position: {x: number, y: number}
//   props?: any;
// }



// export const BluePrintTemplateTest = ({edit}: BluePrintTemplateProps ) => {

//   const [components, setComponents] = useState<ComponentInstance[]>([])

//   const [componentPosition, setComponentPosition] = useState({ x: 0, y: 50 })
//   const [component2Position, setComponent2Position] = useState({x: 400, y: 50})

//   const gridSize = 20;


//   const updateComponentPosition = (componentId: string, newPosition: { x: number, y: number}) => {
//     setComponents(prev => 
//       prev.map(compent => 
//         compent.id === componentId
//         ? { ...compent, position: newPosition }
//         : compent
//       )
//     )
//   }


//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const componentType = e.dataTransfer.getData("component-type");

//     if (componentType) {
//       const rect = e.currentTarget.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;



//       const finalX = edit ? Math.round(x / gridSize) * gridSize : x;
//       const finalY = edit ? Math.round(y / gridSize) * gridSize : y;


//       const newComponent: ComponentInstance = {
//         id: `comp-${Date.now()}`,
//         type: componentType,
//         position: { x: finalX, y: finalY }
//       };
//       setComponents(prev => [...prev, newComponent]);
//     }
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "copy";
//   }


//   const renderComponent = (ComponentInstance: ComponentInstance) => {

//     let ComponentToRender;

//     switch (ComponentInstance.type) {
//       case "chart":
//         ComponentToRender = MyChart;
//         break;
//       case "keyInfo":
//         ComponentToRender = CompanyKeyInfo;
//         break;
//       default:
//         return null;
//     }
    
//     return (
//       <DraggableWrapper
//       key={ComponentInstance.id}
//       initialPosition={ComponentInstance.position}
//       className={edit ? "animated-border" : ""}
//       onPositionChange={(newPosition) => updateComponentPosition(ComponentInstance.id, newPosition)}
//       draggable={edit}
//       snapToGrid={edit}
//       gridSize={gridSize}
//       >
//       <ComponentToRender {... (ComponentInstance.props || {})} />
//     </DraggableWrapper>
//     )
//   }
  


//   return (
//     <div className="min-h-screen w-full overflow-hidden fixed">

//       {/* Sidebar */}
//       {edit && (
//         <div className="fixed top-4 left-4 z-10">
//           <BluePrintSidebar />
//         </div>
//       )}


//       <div
//       className="absolute inset-0"
//       onDrop={handleDrop}
//       onDragOver={handleDragOver}
//       >

//         <div className="absolute inset-0 opacity-20 pointer-events-none"
//         style={
//           edit
//           ? {
//             backgroundImage: `
//               linear-gradient(to right, #e5e7eb 1px, transparent 1px),
//               linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
//             `,
//             backgroundSize: `${gridSize}px ${gridSize}px`
//           } : {}
//         }
        
//         />

//         <DraggableWrapper
//           initialPosition={componentPosition}
//           className={edit ? "animated-border" : ""}
//           onPositionChange={setComponentPosition}
//           draggable={edit}
//           snapToGrid={edit}
//           gridSize={gridSize}
//         >
//           <CompanyKeyInfo></CompanyKeyInfo>
//         </DraggableWrapper>

//       {components.map(renderComponent)}
//       </div>
//     </div>
//   )

//   // return (
//   //   <div className="min-h-screen w-full overflow-hidden fixed">
//   //     <div
//   //       className="absolute inset-0 opacity-20 pointer-events-none"
//   //       style={
//   //         edit
//   //           ? {
//   //               backgroundImage: `
//   //                 linear-gradient(to right, #e5e7eb 1px, transparent 1px),
//   //                 linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
//   //               `,
//   //               backgroundSize: `${gridSize}px ${gridSize}px`
//   //             }
//   //           : {}
//   //       }
//   //     />

//   //     <DraggableWrapper
//   //       initialPosition={componentPosition}
//   //       className={edit ? "animated-border" : ""}
//   //       onPositionChange={setComponentPosition}
//   //       draggable={edit}
//   //       snapToGrid={edit}
//   //       gridSize={gridSize}
//   //     >
//   //       <CompanyKeyInfo />
//   //     </DraggableWrapper>

//   //     <DraggableWrapper
//   //       initialPosition={component2Position}
//   //       className={edit ? "animated-border" : "bg-red-400"}
//   //       onPositionChange={setComponent2Position}
//   //       draggable={edit}
//   //       snapToGrid={edit}
//   //       gridSize={gridSize}
//   //     >
//   //       <MyChart></MyChart>
//   //     </DraggableWrapper>
//   //   </div>
//   // )
// }


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
    console.log("💧 Drop event triggered"); // Debug log
    
    const componentType = e.dataTransfer.getData("component-type");
    console.log("📦 Component type:", componentType); // Debug log
    
    if (componentType) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      console.log("📍 Drop position:", { x, y }); // Debug log
      
      const finalX = edit ? Math.round(x / gridSize) * gridSize : x;
      const finalY = edit ? Math.round(y / gridSize) * gridSize : y;
      
      const newComponent: ComponentInstance = {
        id: `comp-${Date.now()}`,
        type: componentType,
        position: { x: finalX, y: finalY }
      };
      
      console.log("✅ Adding component:", newComponent); // Debug log
      setComponents(prev => [...prev, newComponent]);
    } else {
      console.log("❌ No component type found in dataTransfer"); // Debug log
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    // Uncomment for verbose debugging:
    // console.log("🔄 Drag over"); 
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    console.log("🎯 Drag enter"); // Debug log
  }

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
        console.log("❌ Unknown component type:", componentInstance.type); // Debug log
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
      {/* Sidebar */}
      {edit && (
        <div className="fixed top-4 left-4 z-10">
          <BluePrintSidebar />
        </div>
      )}
      
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