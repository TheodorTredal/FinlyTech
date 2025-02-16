"use client";

import { useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";

export default function StocksPage() {
  const [message, setMessage] = useState("Velg en handling fra menyen");

  const handleClick = (action: string) => {
    setMessage(`Du valgte: ${action}`);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Menubar className="rounded-xl shadow-md p-2">
        <MenubarMenu>
          <MenubarTrigger>Dashboard</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleClick("Ny fil")}>Ny</MenubarItem>
            <MenubarItem onClick={() => handleClick("Åpne fil")}>Åpne...</MenubarItem>
            <MenubarItem onClick={() => handleClick("Lagre fil")}>Lagre</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* Oppdatert melding under menyen */}
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
