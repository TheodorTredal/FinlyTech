
/**
 *  Trenger:
 *  - graf
 *      - Total avkastning
 *          - Absolutt kr
 *          - Prosent
 *          - Realisert vs urealisert gevinst
 *      - Time series 
 *      - Måle opp mot en index / børs
 *
 *  - Sector og industry pie chart
 *  - Hvor mye % av porteføljen min består av aksje x
 *  - Data om porteføljen som brukeren har lyst til å få innsikt på
 * - Risiko & volatilitet
 *   - Hvor risikabel er porteføljen min?
 *   - Maks drawdown
 *   - Sharpe ratio
 * 
 *  Geografisk eksponering
 *  - Hvilke nasjoner / børser porteføljen min har.
 *  - Valuta eksponering
 *  - Konsentrasjons indikator
 *  - Ha en klikke funksjon, fra typ verdenskart til kake diagram til en enkel tabell
 * 
 * DETTE GJØR DET MULIG Å planlegge å lage strategier om porteføljer!
 * For Utbytte: (populært for langsiktige investorer)
 *  - Hva tjener porteføljen meg løpende?
 *  - Utbytte:
 *      - Forventet årlig utbytte
 *      - Utbytte hver måned
 *      - Neste utbytte datoer
 *      - Reinvestert vs kontant
 * 
 * Kvalitet & fundamentale metrics
 *  - Hva eier jeg egentlig?
 *  Aggregert på portefølje nivå
 *  Hva er porteføljen min sin?:
 *   - P/E?
 *   - P/B?
 *   - ROE?
 *   - Earnings growth?
 *   - Debt/equity?
 *   -> Veldig kult om man kan si at "Porteføljen min handles til P/E (Marked: 18.5)"
 *
 *  Mål og strategi
 *  - Er jeg på rett vei?
 *  mål tracker:
 *      - f.eks 1 000 000 kroner innen 2035
 *      - forventet verdi basert på historisk avkastning
 *      - Risiko vs mål
 *      - Allokeringsmål -> Faktisk vs ønsket (f.eks 70/30, aksjer, renter) 
 * 
 * 
 * Alerts & innsikt
 * Hva bør jeg vite nå?
 *  - Lage alert på:
 *      - Overeksponert sektor
 *      - Aksje ned < 10%?
 *      - Aksje opp > 20%?
 *      - Utbytte imorgen
 *      - Rebalanserings forslag??? Ikke til å begynne med i alle fall.
 * 
 * 
 * Heatmap av beholdninger (grønn/rød)
 * 
 * 
 *  Begynn med MVP
 * 0. Komponent som lar deg velge riktig portefølje
 * 1. Total verdi + Avkastning
 * 2. Time series graf
 * 3. Sektor / industri kake diagram
 * 4. Top holdings
 * 5. Utbytte oversikt
 * 
 * 
 * 
 * Kalender
 *   - Når bedrifter i dine sektorer / industrier slipper kvartalsrapporter
 *   - Når dine likte / dine assets skal slippe kvartalsrapporter
 *   -
 *
 * 
 * DIV Passer til STOCKS delene av applikasjonen
 *  - Firma segmenter, hvor stor er hver divisjon?
 *    -  Etter inntjening
 * 
 *  - Sektor, hvor stor markedsandel har bedriften(e)?
 */


import { useEffect, useState } from "react"
import PortfolioGraph from "../PortfolioGraph/portfolioGraph"
import { PortfolioInterface } from "../../interfaces/stockPortfolioInterface"
import { getUserPortfolio } from "../API/portfolioAPI"
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { PortfolioPieChart } from "../pieCharts.tsx/PortfolioPieChart"
import { usePortfolio } from "@/app/context/portfolioContext"


// Dropdown menu for porteføljen til brukeren
export const SelectPortfolio = () => {


    const { currentPortfolio, setCurrentPortfolio } = usePortfolio();

    const [portfolioList, setPortfolioList] = useState<PortfolioInterface[]>([]);
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);


    useEffect(() => {
      const fetchPortfolios = async () => {
        const response = await getUserPortfolio();
        setPortfolioList(response);
        console.log(response);
      }

      fetchPortfolios();
    }, [])

    const handleOpenMenu = () => {
        setIsDropdownMenuOpen(!isDropdownMenuOpen);
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" onClick={handleOpenMenu}>
                    Velg portefølje
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {portfolioList.map((portfolio) => (
                    <DropdownMenuItem 
                        key={portfolio.id} 
                        onClick={() => setCurrentPortfolio(portfolio.title)}>
                        {portfolio.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>

        </DropdownMenu>
    )
}


export const MainPortfolioDevelopment = ({currentSelectedPortfolio}: {currentSelectedPortfolio: string}) => {

    return (
        <div className="w-full h-full">
            {/**Må hente liste over alle porteføljene titlene på bruker via API */}
            <PortfolioGraph portfolio_title={currentSelectedPortfolio}></PortfolioGraph>
            <PortfolioPieChart></PortfolioPieChart>
        </div>
    )
}