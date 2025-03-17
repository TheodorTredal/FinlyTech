export const initialNodesTestData = [
    { id: "1", type: "custom", position: { x: 100, y: 100 }, data: { label: "Taiwan Semiconductor" } },
    { id: "2", type: "custom", position: { x: 300, y: 200 }, data: { label: "Apple" } },
    { id: "3", type: "custom", position: { x: 100, y: 300 }, data: { label: "Samsung" } },
    { id: "4", type: "custom", position: { x: 500, y: 150 }, data: { label: "Intel" } },
    { id: "5", type: "custom", position: { x: 700, y: 250 }, data: { label: "AMD" } },
    { id: "6", type: "custom", position: { x: 900, y: 350 }, data: { label: "Nvidia" } },
    { id: "7", type: "custom", position: { x: 300, y: 50 }, data: { label: "Qualcomm" } },
    { id: "8", type: "custom", position: { x: 600, y: 50 }, data: { label: "Sony" } },
  ];
  
export const initialEdgesTestData = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
    { id: "e5-6", source: "5", target: "6" },
    { id: "e2-7", source: "2", target: "7" },
    { id: "e7-8", source: "7", target: "8" },
  ];
  