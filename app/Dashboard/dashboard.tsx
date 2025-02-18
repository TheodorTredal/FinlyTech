"use client";
import { ShowBasicStockInformation } from "../Components/ShowBasicStockInformation";
import LineChart from "../Components/Charts/SimpleLineChart";
import PieChart from "../Components/Charts/SimplePieChart";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";

// test data
import { stock_prices } from "../testdata/BasicPrices";
import { NvidiaTestData } from "../testdata/nvidiatestdata";
import { osebx_stock_prices } from "../testdata/BasicPrisesOSEBX";
import { PortfolioTestData } from "../testdata/yourPortfolio";
import { ExposureTestData } from "../testdata/Exposure";

// app/_app.tsx
import "../globals.css";
import { useState } from "react";

export default function Dashboard() {

    const [menuOpen, setMenuOpen] = useState<boolean>(false); // State for å holde oversikt over om menyen er åpen
    const [activeComponent, setActiveComponent] = useState<"dashboard" | "news">("dashboard");
    const [isNewsHovered, setIsNewsHovered] = useState<boolean>(false); // For å håndtere hover-tilstand på News

    const handleMenuClick = (component: "dashboard" | "news") => {
        setActiveComponent(component);
    }

    const handleNewsClick = () => {
        // Kombinerer både handle menyåpning og valget av News
        setMenuOpen(!menuOpen);
        handleMenuClick("news");
    }

    return (
        <div>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger onClick={() => handleMenuClick("dashboard")}>Dashboard</MenubarTrigger>

                    {/* Håndter hover på News */}
                    <MenubarTrigger
                        onClick={() => handleNewsClick()}
                        onMouseEnter={() => setIsNewsHovered(true)}  // Når musen er over News
                        onMouseLeave={() => setIsNewsHovered(false)}  // Når musen forlater News
                    >
                        News
                    </MenubarTrigger>

                    {/* Vis menyinnhold når musen er over "News" */}
                    {isNewsHovered && (
                        <MenubarContent>
                            <MenubarItem>Market News</MenubarItem>
                            <MenubarItem>S&P 500</MenubarItem>
                        </MenubarContent>
                    )}
                </MenubarMenu>
            </Menubar>

            {/* Vis Dashboard eller News komponenter basert på aktivt valg */}
            {activeComponent === "dashboard" && (
                <div className="justify-start w-full p-2"> {/* Bruk space-y-4 for mindre avstand */}
                    <div className="flex space-x-2 px-2 pb-2 justify-start w-full"> {/* Redusert padding fra p-6 til p-3 */}
                        <LineChart data={NvidiaTestData} name={"Din portefølje"} />
                        <ShowBasicStockInformation stocksPrices={stock_prices} />
                    </div>

                    <div className="flex space-x-2 px-2 justify-start w-full"> {/* Redusert padding her også */}
                        <PieChart data={PortfolioTestData} name={"Your Portfolio"} />
                        <PieChart data={ExposureTestData} name={"Market Exposure"} />
                        <ShowBasicStockInformation stocksPrices={osebx_stock_prices} />
                    </div>
                </div>
            )}

            {activeComponent === "news" && (
                <div>Her kommer nyheter!</div>
            )}
        </div>
    );
}
