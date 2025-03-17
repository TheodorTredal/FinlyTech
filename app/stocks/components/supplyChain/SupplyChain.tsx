import { useState } from "react";
import React from "react";
import ReactFlow, { Background, Handle, Position, Panel, BackgroundVariant } from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";


const supplyList: list<string> = ['TEXAS INSTRUMENTS INC', 'ADVANCED MICRO DEVICES INC', 'ANALOG DEVICES INC', 'MICRON TECHNOLOGY INC', 'INTEL CORP', 'NXP Semiconductors N.V.', 'MICROCHIP TECHNOLOGY INC', 'STMicroelectronics N.V.', 'NIDEC CORP', 'ON SEMICONDUCTOR CORP', 'WESTERN DIGITAL CORP', 'JABIL INC', 'LATTICE SEMICONDUCTOR CORP', 'RH', 'POWER INTEGRATIONS INC', 'SYNAPTICS Inc', 'Knowles Corp', 'STMicroelectronics N.V.', 'NIDEC CORP']


// Dynamisk opprettelse av noder fra supplyList
const generateNodes = (companyList: string[]) => {
    return companyList.map((company, index) => ({
      id: (index + 1).toString(), // Unikt id for hver node
      type: "custom",
      position: { x: 100 + index * 150, y: 100 + index * 100 }, // Plassering (juster etter behov)
      data: { label: company }
    }));
  };

export const nodes = [
    { id: "1", type: "custom", position: { x: 100, y: 100 }, data: { label: "Taiwan Semiconductor" } },
    { id: "2", type: "custom", position: { x: 300, y: 200 }, data: { label: "Apple" } },
    { id: "3", type: "custom", position: { x: 100, y: 300 }, data: { label: "Samsung" } },
    { id: "4", type: "custom", position: { x: 500, y: 150 }, data: { label: "Intel" } },
    { id: "5", type: "custom", position: { x: 700, y: 250 }, data: { label: "AMD" } },
    { id: "6", type: "custom", position: { x: 900, y: 350 }, data: { label: "Nvidia" } },
    { id: "7", type: "custom", position: { x: 300, y: 50 }, data: { label: "Qualcomm" } },
    { id: "8", type: "custom", position: { x: 600, y: 50 }, data: { label: "Sony" } },
  ];

export const edges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
    { id: "e5-6", source: "5", target: "6" },
    { id: "e2-7", source: "2", target: "7" },
    { id: "e7-8", source: "7", target: "8" },
  ];
  



const CustomNode = ({ data }) => {
  return (
    <div className="text-white p-4 rounded-lg shadow-md bg-neutral-800 border-white border ">
      {data.label}
      <Handle type="source" position={Position.Right} className="w-3 h-3  border-white shadow-md bg-neutral-800 rounded-full" />
      <Handle type="target" position={Position.Left} className="w-3 h-3  border-white shadow-md bg-neutral-800 rounded-full" />
    </div>
  );
};



export const SupplyChain = () => {

    const [currentVariant, setCurrentVariant] = useState<BackgroundVariant>(BackgroundVariant.Lines);

    
    return (
      <div className="w-full" style={{ height: '80vh' }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={{ custom: CustomNode }} fitView>
          <Background  color="#18181b"  variant={currentVariant} gap={30} />
          <Panel>
            <div>variant:</div>
            <Button className="bg-zinc-800 text-white hover:bg-sky-700 px-4 py-2 rounded-md shadow-md" onClick={() => setCurrentVariant(BackgroundVariant.Dots)}> dots</Button>
            <Button className="bg-zinc-800 text-white hover:bg-sky-700 px-4 py-2 rounded-md shadow-md" onClick={() => setCurrentVariant(BackgroundVariant.Lines)}> lines</Button>
            <Button className="bg-zinc-800 text-white hover:bg-sky-700 px-4 py-2 rounded-md shadow-md" onClick={() => setCurrentVariant(BackgroundVariant.Cross)}> cross</Button>
          </Panel>  
        </ReactFlow> 
      </div>
    );
  };
