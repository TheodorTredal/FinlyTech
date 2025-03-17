SnapTrade eller Finly

1. Få opp et fint skall på nettsiden
  - X Sidebar
  - Header
    - X Settings
      - X Endre til darkmode
      - displaye: 
        - personinfo
        - Brukeranvn O.l
    - Profilbilde

2. Enkel boks som displayer informasjon om en aksje
   - X Bruk statisk data i begynnelsen
   - Endre til API data når nettsiden begynner å se bra ut :)
     - Konverter stock nettsiden til å vise aksjedata fra yahoo finance.
     - I begynnelsen kan det være lurt å lagre dataen i database for å slippe unødvendige kall til yahoo.

3. Enkel graf som viser prishistorikken til en aksje
  - Her kan vi vise den samlede prestasjonen til alle aksjene i watchlist.
  - Velge mellom dag, måned, i år, 1 år, 3 år, 5 år, 10 år
  - Skal helst være mulig å spesifisere nøyaktig dato.
  - Skal være mulig å hovere over grafen og finne ut hvilke nyheter om bedriften skjedde den dagen
    - Dette vil si noe om hvorfor aksjen gikk ned eller opp.

4. Ha en samlet graf som viser linje for vekst i alle selskapene dine målt i prosent. 

4. En søke bar
   - Trenger ikke mer enn å se pen ut for øyeblikket.
   - Når man søker opp skal man få opp en nettside med aksje informasjon.

5. En watchlist over aksjer man følger med på.
   - En enkel boks, som skal vise sist kjente aksje kurs.
   - Skal være mulig å legge til aksjer man har lyst til å følge med på

6. Få en utbytte komponent, så man kan se hvor mye utbytte man har fått eller bedriften har gitt, Bruk komponenten  
  - ha noe som sier om bedriften har utbytte, true false.
  - Hvor ofte betaler de utbytte
  - Hvor lenge har de betalt ut utbytte
  - Har de betalt ut utbytte selv i dårlige tider.

7. Notify knapp
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





 - Dahsboard, hva har man lyst til å se? Det er her man har lyst til å få en grov oversikt over bevegelse i markedet.

   - Sine egne aksjer
   - Hvordan markedet gjør det
   - dagens vinnere
   - dagens tapere
   - Fear index
   - Forskjellige type indekser som forteller noe om markedet.
   - de største bevegelsene.



På Sikt så har jeg lyst til å implementere flere strategi metoder. sånn som 50 day avg også videre. Bruk Quantnet for algoritmer.