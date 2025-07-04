SnapTrade eller Finly

Get good with Finly
  - For the intelligent investor

1. Få opp et fint skall på nettsiden
  - X Sidebar
  - Header
    - X Settings
      - X Endre til darkmode
      - displaye: 
        - personinfo
        - Brukeranvn O.l
    - Profilbilde

3. Enkel graf som viser prishistorikken til en aksje
  - Velge mellom dag, måned, i år, 1 år, 3 år, 5 år, 10 år
  - Skal helst være mulig å spesifisere nøyaktig dato.
  - Skal være mulig å hovere over grafen og finne ut hvilke nyheter om bedriften skjedde den dagen
    - Dette vil si noe om hvorfor aksjen gikk ned eller opp.

4. Portefølje: Ha en samlet graf som viser linje for vekst i alle selskapene dine målt i prosent.
  - Eller vise hver enkel aksje som brukeren har spesifisert, skal være mulig å være customizable


5. En watchlist over aksjer man følger med på.
   - En enkel boks, som skal vise sist kjente aksje kurs.
   - Skal være mulig å legge til aksjer man har lyst til å følge med på

6. Få en utbytte komponent, så man kan se hvor mye utbytte man har fått eller bedriften har gitt, Bruk komponenten  
  - ha noe som sier om bedriften har utbytte, true false.
  - Hvor ofte betaler de utbytte
  - Hvor lenge har de betalt ut utbytte
  - Har de betalt ut utbytte selv i dårlige tider.

7. Notify knapp
   - Bruk når man har favorite på en aksje
   - man kan få push varsler på kommende nyheter om en aksje.
   Bruk: https://ui.shadcn.com/docs/components/sonner, den er dritfet.

8. Hvor mye du har investert de siste månedene og årene. Se "Bar chart interactive" 
https://ui.shadcn.com/charts


9. Supply chain
  - Se hva den søkte bedriften er avhegnig av og hvilke bedrifter som er avhengig av den.
  - Et kart som viser hvor bedrifter har fabrikker, viktige hotspots.
    - Verdenskart som viser lokasjonene til bedrifter som bedriften er avhenging av.
      - Må gjøre litt research for å se om jeg finner et API som gir meg dataen jeg trenger.

      - Ha en dropdown med en liste over alle supplierene til bedriften, det skal være mulig å filtrere vekk ting man ikke vil se
      - Finn en måte å mappe stedsnavn til faktiske geografiske lokasjoner (stedsnavn står i denne lenken: https://www.apple.com/nz/supplier-responsibility/pdf/Apple-Supplier-List.pdf)
      - Leaflet.js


    - Hvilke trading ruter som bedriften vanligvis benytter seg av.
    - Potensielle bottlenecks
    - værfilter på/av
    - Sourcemap api?




10. Backtesting
  - Våre egne algoritmer.
  - Brukere skal enkelt få backtestet sine egne algoritmer.

11. Kalender
  - Viser Viktige dager for bedriftene man har på watchlisten
  - Kan også vise store dager som renteendringer world economic forum, 
    Altså store hendelser som skal skje frem i tid.
  - Ha et kart som viser hvilke aksjemarkeder som er åpne.

12. Et vær kart. været kan påvirke shipping. Naturkatastorfer kan påvirke bedrifter.
  - Hadde vært kult værapp som viser globale stormer, lokale stormer, og om det er noen påventende værkatastrofer i nær fremtid.
  - Ha en enable knapp som bruker kan skru av og på, hvis de vil se om været påvirker noen av de satte filtrene
  - Hadde vært kult med et kart som viste hele globen.

13. Live kart over shipping og fly.

14. selskapsstruktur
    - Denne er viktig for å finne ut som selskapet har en optimal struktur.


15. Gjør webapp om til en desktop app
   - Man kan gjøre dette ved bruk av elektron


16. Få opp varslinger når en aksje går under / over en viss verdi som brukeren har satt.





 - Dahsboard, hva har man lyst til å se? Det er her man har lyst til å få en grov oversikt over bevegelse i markedet.

   - Sine egne aksjer
   - Hvordan markedet gjør det
   - dagens vinnere
   - dagens tapere
   - Fear index
   - Forskjellige type indekser som forteller noe om markedet.
   - de største bevegelsene.


Historiske data målt over tid
  - Ev/Ebidta de siste 5 årene
  - P/E de siste 5 årene

På Sikt så har jeg lyst til å implementere flere strategi metoder. sånn som 50 day avg også videre. Bruk Quantnet for algoritmer.


17. Redline sandbox
  - Lage en komponent som lar brukeren legge inn hvilke data som er viktig for den. Sånn at brukeren enkelt kan se de røde linjene mellom tallene i en bedrift.


18. Nyheter
  - For spesifikk aksje
  - Komponenten skal være delt i to vertikalt. På den ene siden så skal de nyeste nyhetene komme opp. På den andre siden så skal aksjens graf vises. På grafen så skal det være markert hvilke nyheter som er forbundet med et fall eller en økning i prisen. Dette vil si noe om hva som beveger aksjen.

5 features som er hovedessensen i applikasjonen

Hovedmålet til applikasjonen er å finne de aksjene med størst vekstpotensiale på enklest og kjappest mulig måte. Det finnes flere strategier for finne disse selskapene. Det er forventet at et finansielt produkt skal klare å levere på bredde og dybde, så 5 enkelt features er ikke nok. men her dette fem hoved features med sub-features vi skal være best på.

1. Spesifik Aksjeanalyse
  - Enkel graf over aksjene
  - Historiske data
  - KPI
  - Supply chain
  - Innsider data, Hvem eier hva og hva heter de, hvilke andre bedrifter eier innsidere som kan skape synergier mellom selskaper?
  - Selskapstruktur
  - Analytiker side, hva sier konsensus om bedriften?

2. Algoritmer
  - Forskjellige algoritmer som kan indikere om en aksje skal opp eller ned
  - Backtesting med bruk av KI?
  - Bedriftens fair value

3. Watchlist
  - Ha en oversikt over alle aksjene som er interesant for brukeren

4. Sektor data
  - Winners / losers
  - marketcap
  - nyheter

5. Nettsiden skal være customizable. Brukeren skal få velge hva den vil se på dashboardet.
  - IKEA Modellen
  - Skal være en customize knapp, når man trykker på denne knappen så skal det komme opp en grid der man kan sette inn de komponentene som er viktig for brukeren å se. Komponentene skal være resizable, dvs at skalaen på komponentene kan blåses opp og ned. ;)
  - Lag 3 komponenter og begynn deretter med sandbox.
  - Trenger nok en sidemeny som gjør at man kan dra inn de komponentene man vil se.
  - skal være mulig å lagre templaten til brukerne. add new template typ.
  - man kan velge templaten man har lyst til å se.


  1. Må lagre posisjonen til hver komponent i en state
    - når komponenten beholder sin posisjon etter at man har skrudd av og på. gå videre til 2.

  1.2 Dataen inne i komponenten blir resettet
    datastrukturen blir nok en liste med dictionaries med alle komponentene >:-D

  2. ha en sidemeny der man kan dra inn komponenter inn på siden, <- HER

  3. lag en boundary for komponentene sånn at komponentene ikke går utenfor skjermen

  4. lag et gridlock system sånn at komponentene kan plassers fint på skjermen

  5. gjør komponentene resizable







Neste tingene som blir gjort:
  - Bli ferdig med dashboardet for aksjer få det til å se pent ut.
    - Add to portfolio knapp
  - Begynn på porteføljen
    - Begynn med react komponentene
      - Innkjøpspris
      - Antall aksjer
      - enkel database
      - Watchlist stjernen er ikke det samme som add to portfolio




Sidemeny som viser det mest kritiske for en bruker, den skal være tilgjengelig over hele nettsiden, bruker skal få se det som er viktigst for den, om det er nyheter, tapere, vinnere, mest omsatt (volum) eller sine egne aksjer  / watchlist.



Portefølje graf
1. Vi må ha meta data om porteføljen
   - Når den ble opprettet

2. Targets. Om enkelt aksjer i porteføljen har nådd sitt target, fremtidige prognoser, er den fortsatt en hold / sell når målet er nådd?
  - Dette kan gjøres når screenere / filtere har kommet opp på plass ;)
  - Filtere kommer til å bli drit enkelt å lage, jeezus.


3. Filtere
   - Ha en liste over flere aksjer, dette kan evt. gjøres i sektor siden av nettsiden.
   - Ha oppe alle filterene som brukeren kan ønske
   - Brukeren skriver inn sine kriterier til hva de har lyst til å filtrere på, listen blir mindre basert på hva brukerene filtrer på...
   P/E
   EV/Ebidta
   EV/Ebit
   osv osv... er bare drømmene som setter grensene egentlig.



Må få inn hvor mye vekting hver enkel aksje har grafisk, tenker da på en "pie-chart - Donut with Text for eksempel"






DCF ANALYSE



1. Hvor mye er EPS og hvor mye forventer man at det skal øke de neste årene, la oss si de neste 3-5 årene?
2. Finne ut nåverdien
  - Nåverdi = Fremtidig inntjening / (1-r)^n

3. Legge til terminalverdi
  - Terminalverdi = inntjeningsår6 / r-g
      




-------
1. Kommentar boks
  - Hver aksje skal ha en kommentar boks, brukerens tanker om aksjen, er det en bra aksje? er det en dårlig aksje?


