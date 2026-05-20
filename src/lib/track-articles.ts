import type { Gtr2Track } from "@/lib/gtr2-tracks";

type TimelineItem = {
  year: string;
  text: string;
};

type CircuitArticle = {
  title: string;
  intro: string;
  history: string[];
  gtr2Context: string;
  drivingProfile: string[];
  timeline: TimelineItem[];
};

const articles: Record<string, CircuitArticle> = {
  anderstorp: {
    title: "Flyvepladsbanen der gav Sverige Grand Prix-status",
    intro:
      "Anderstorp er en flyvepladspræget bane: bred, flad og bygget omkring lange stræk, hvor store GT-biler vinder tid på lav drag, stabilitet og effektiv acceleration.",
    history: [
      "Scandinavian Raceway blev etableret i slutningen af 1960erne på et tidligere flyvepladsområde i Småland. Ambitionen var international fra starten, og banen fik både sportsvogne, Formel 2 og Formel 1 på kalenderen.",
      "Banens mest berømte periode kom i 1970erne, hvor Sveriges Grand Prix blev kørt på Anderstorp. Det gav banen en international status, som få nordiske anlæg har haft. I GT-sammenhæng er Anderstorp især interessant, fordi den lange, åbne karakter belønner stabilitet og effektivitet mere end ren aggressivitet."
    ],
    gtr2Context:
      "I GTR2 adskiller Anderstorp sig fra de mere tekniske centraleuropæiske baner med åbne bremsezoner, få tydelige referencepunkter og en rytme, hvor overkørsel ofte koster mere end forsigtighed.",
    drivingProfile: [
      "Bilen skal være rolig i lange belastede sving. For meget overstyring koster både dæk og exitfart.",
      "Lav drag er attraktivt, men det korte South-layout gør traction og rotation vigtigere end topfart.",
      "Bremsepunkter kan virke nemme, men den flade horisont gør dem svære at gentage præcist i trafik."
    ],
    timeline: [
      { year: "1968", text: "Scandinavian Raceway åbner ved Anderstorp." },
      { year: "1973", text: "Sverige får Formel 1 Grand Prix på banen." },
      { year: "1978", text: "Brabhams fan car vinder sit eneste Grand Prix her." }
    ]
  },
  barcelona: {
    title: "Testbanen der afslører alle svagheder",
    intro:
      "Barcelona-Catalunya er en teknisk målestok. Den kombinerer lange hurtige sving, tunge bremsezoner og langsomme exits, så en GT-bil skal være balanceret over hele omgangen.",
    history: [
      "Banen åbnede i 1991 nord for Barcelona og blev hurtigt en fast del af international motorsport. Den var moderne, sikker og logistisk stærk, og derfor blev den et naturligt testcentrum for Formel 1, sportsvogne og store nationale serier.",
      "I de tidlige 2000ere var layoutet stadig uden den senere langsomme F1-chikane i sidste sektor. Det giver GTR2-versionen en mere flydende afslutning på omgangen, hvor aero-balance og mod gennem de lange højresving betyder meget."
    ],
    gtr2Context:
      "Barcelona 2003 i GTR2 er en ærlig måling af setup. En bil der understyrer her, vil slide forhjulene op; en bil der er for løs, bliver svær at holde stabil gennem de lange belastninger.",
    drivingProfile: [
      "Prioritér en præcis front i de lange sving, men lad ikke bagenden blive nervøs ved høj fart.",
      "National-layoutet komprimerer rytmen og lægger mere vægt på bremsebalance og acceleration.",
      "Dækslid kommer gradvist, så et pænt stint slår ofte én heroisk kvalifikationsomgang."
    ],
    timeline: [
      { year: "1991", text: "Circuit de Barcelona-Catalunya åbner ved Montmeló." },
      { year: "1992", text: "Banen indgår i OL-året som et stort catalansk motorsportsanlæg." },
      { year: "1990erne", text: "Banen bliver et fast sted for europæisk vintertest." }
    ]
  },
  brno: {
    title: "Masaryk-arven i moderne permanent form",
    intro:
      "Brno er en rytmebane med højdeforskel, lange camber-sving og en sjælden fornemmelse af flow. Den moderne bane er permanent, men arven fra den gamle Masaryk landevejsring ligger stadig over stedet.",
    history: [
      "Motorsport ved Brno begyndte længe før den nuværende bane. Den oprindelige Masaryk-ring brugte offentlige veje og var en lang, hurtig og farlig rute gennem landskabet. Den moderne Automotodrom Brno åbnede i 1987 og samlede traditionen i et sikrere permanent anlæg.",
      "For GT-biler er Brno teknisk relevant, fordi layoutet kombinerer brede sving, elevation, lange accelerationer og sektioner, hvor en tung bil skal holdes i balance. Hård kørsel øger dækslid; stabil minimumsfart betaler sig over et stint."
    ],
    gtr2Context:
      "Brno 2003 og 2004 deler den samme grundkarakter i GTR2. Forskellen ligger mest i event- og æra-følelsen, mens selve udfordringen er at holde bilen stabil over en lang omgang.",
    drivingProfile: [
      "Mekanisk greb er afgørende, især når bilen arbejder op ad bakke ud af langsomme og mellemhurtige sving.",
      "For aggressiv differential- eller bagvingeopsætning kan gøre bilen tung på næsen gennem de lange buer.",
      "Overhalinger kræver forberedelse: exitfart og slipstream slår ofte et sent dyk."
    ],
    timeline: [
      { year: "1930", text: "Masaryk Grand Prix-traditionen begynder på landevejene omkring Brno." },
      { year: "1987", text: "Den moderne permanente Automotodrom Brno åbner." },
      { year: "2000erne", text: "Banen er fast stop for international GT- og motorcykelracing." }
    ]
  },
  donington: {
    title: "Britisk flow, bakker og hårde hårnåle",
    intro:
      "Donington Park er en bane med to personligheder. Først kommer den flydende, modige del med Redgate, Hollywood og Craner Curves; derefter, på GP-layoutet, kommer Melbourne Loop med hårde bremsezoner.",
    history: [
      "Donington var et stort britisk motorsportssted før anden verdenskrig, men banen forsvandt ud af racing i årtier. Tom Wheatcroft genoplivede anlægget, og i 1970erne vendte motorsporten tilbage til parken.",
      "Banens moderne ry er bygget på naturligt terræn og store højdeforskelle. For GT-racing giver det en anden type udfordring end nyere flade anlæg: bilen skal være stabil, når belastning og camber ændrer sig hurtigt.",
    ],
    gtr2Context:
      "I GTR2 er Donington National en momentum-test, mens GP-layoutet tilføjer tunge bremsezoner, hvor GT1-biler kan angribe, men også let kan låse forhjul.",
    drivingProfile: [
      "Craner Curves kræver stabil aero og tillid til bilen, især med trafik foran.",
      "Melbourne Hairpin og Goddards er oplagte overhalingssteder, men dårlige exits ødelægger næste sektor.",
      "National-layoutet belønner flow; GP-layoutet belønner den kører, der kan kombinere flow med bremsemod."
    ],
    timeline: [
      { year: "1931", text: "Racing begynder på Donington Park." },
      { year: "1977", text: "Banen genåbner efter Tom Wheatcrofts restaurering." },
      { year: "1993", text: "Ayrton Sennas første omgang i European GP bliver en del af banens internationale ry." }
    ]
  },
  dubai: {
    title: "Den nye internationale GT-horisont",
    intro:
      "Dubai Autodrome kom ind med GTR2-æraens nye internationale kalender. Banen er moderne, bred og fleksibel, med flere layouts der spænder fra kompakt klubracing til fuld Grand Prix-distance.",
    history: [
      "Dubai Autodrome åbnede i 2004 som et af de første store FIA-grade motorsportsanlæg i Mellemøsten. Den blev bygget til internationale events, test og lokale mesterskaber på et tidspunkt, hvor regionen begyndte at fylde mere i global motorsport.",
      "For GT-biler fungerer Dubai, fordi den kombinerer moderne stop-start-sektioner med lange accelerationer. Layoutvalget ændrer løbet markant: GP-versionen er mere komplet og hurtig, mens Club, National og International giver mere koncentreret trafik og hyppigere dueller."
    ],
    gtr2Context:
      "Dubai i GTR2 er en kontrast til de ældre europæiske baner. Den handler mere om moderne bremsepunkter, kerbs, dæktemperatur og stabil traction end om klassisk vejbanerytme.",
    drivingProfile: [
      "Bremsekøling og traction fylder meget, især på de kortere layouts hvor pauserne mellem stop er korte.",
      "GP-layoutet kræver et kompromis mellem straightline-effektivitet og stabilitet i de tekniske partier.",
      "I multiclass-racing bliver de kortere layouts hurtigt trafiktunge, så forudsigelige linjer er nødvendige."
    ],
    timeline: [
      { year: "2004", text: "Dubai Autodrome åbner som moderne FIA-anlæg." },
      { year: "2000erne", text: "Banen bliver et internationalt GT- og endurance-stop." },
      { year: "Senere", text: "24H Dubai gør anlægget kendt i international langdistanceracing." }
    ]
  },
  enna: {
    title: "Siciliansk søbane med chikaner og særpræg",
    intro:
      "Enna-Pergusa er en af de mest særprægede baner i GTR2. Den ligger rundt om Pergusa-søen på Sicilien og er i praksis en højhastighedsring, der er gjort teknisk gennem chikaner.",
    history: [
      "Autodromo di Pergusa bruger vejen rundt om Lago di Pergusa. Det giver banen en næsten oval grundform, men sikkerhedsudviklingen førte til chikaner, som ændrede den fra ren topfartsbane til en hård test af bremser og kerb-kontrol.",
      "Banen har haft international sportsvogns- og formelhistorie, men placeringen i et naturreservat har også gjort drift og udvikling mere følsom end på mange permanente anlæg. Dens relevans ligger i kontrasten mellem høj fart, chikaner og den usædvanlige geografiske ramme."
    ],
    gtr2Context:
      "I GTR2 er Enna-Pergusa en bremse- og kerb-bane. GT-bilerne når høj fart, men næsten alle afgørende øjeblikke kommer, når bilen skal stoppes og rettes gennem chikanerne.",
    drivingProfile: [
      "Lav downforce virker fristende, men chikanerne kræver en bil der kan skifte retning uden at hoppe over kerbs.",
      "Bremserne bliver belastet hårdt, fordi topfarten gentagne gange skal nedbringes på kort afstand.",
      "Trafik er risikabelt: små fejl i chikanerne forplanter sig direkte til exits og næste straight."
    ],
    timeline: [
      { year: "1950erne", text: "Racing omkring Pergusa-søen etableres." },
      { year: "1970erne", text: "Banen optræder i international sportsvogns- og formelracing." },
      { year: "1990erne", text: "Chikaner præger layoutet og skaber den GTR2-relevante karakter." }
    ]
  },
  estoril: {
    title: "Portugisisk Grand Prix-historie med teknisk GT-rytme",
    intro:
      "Estoril er en klassisk europæisk permanent bane med praktisk variation: langsomme sving, en lang hovedlangside og sektioner, hvor en GT-bil skal være stabil uden at blive tung på næsen.",
    history: [
      "Autódromo do Estoril åbnede i 1972 nær Cascais og blev Portugals Grand Prix-hjem fra 1984. Banen var i mange år et fast europæisk anlæg og blev brugt til både Formel 1, sportsvogne og test.",
      "I GTR2-årene var Estoril kendt for et layout, der stiller store krav til traction og forhjul. Den lange Parabolica Interior og de langsomme accelerationer afslører hurtigt en bil, der enten understyrer eller slider bagdækkene."
    ],
    gtr2Context:
      "Estoril 2003 giver en mere teknisk type GT-race end Monza eller Spa. Den hurtigste bil er ofte den, der kan gentage stabile exits og passe dækkene over et helt stint.",
    drivingProfile: [
      "Traktion ud af langsomme sving bestemmer topfarten ned ad hovedlangsiden.",
      "Frontgreb gennem de lange højresving er afgørende for at undgå overophedede fordæk.",
      "Bremsezonerne er gode overhalingsmuligheder, men exits betyder mere end sene dyk."
    ],
    timeline: [
      { year: "1972", text: "Autódromo do Estoril åbner." },
      { year: "1984", text: "Portugal vender tilbage på Formel 1-kalenderen med Estoril." },
      { year: "1985", text: "Ayrton Senna tager sin første Formel 1-sejr på banen." }
    ]
  },
  hockenheim: {
    title: "Fra skovstraights til moderne stadionkamp",
    intro:
      "Hockenheim i GTR2 er den moderne 2002-version: kortere, mere publikumsnær og langt mere teknisk end den gamle skovbane. Motodrom er stadig den sektion, der giver anlægget sit særpræg.",
    history: [
      "Den gamle Hockenheimring var bygget på lange straights gennem skoven. I 2002 blev banen ombygget markant, og den gamle højhastighedsrute blev erstattet af et kortere layout med Mercedes Arena, hårnål og Motodrom.",
      "For GT-racing skabte ombygningen en bane, hvor bremsemod og traction betyder mere end ren topfart. Stadionsektionen bevarer intensiteten, mens hårnålen er et naturligt sted for både planlagte overhalinger og optimistiske forsøg."
    ],
    gtr2Context:
      "Hockenheim 2004, National og Short giver tre grader af samme karakter. Jo kortere layoutet er, desto mere handler det om Motodrom-rytme, traction og at holde hovedet koldt i tæt trafik.",
    drivingProfile: [
      "GP-layoutet kræver en bil, der både kan bremse hårdt til hårnålen og være præcis gennem stadionsektionen.",
      "National og Short reducerer topfartsbehovet og lægger mere vægt på lavfartsbalance.",
      "Baghjulene arbejder hårdt ud af langsomme sving, så differentialet skal sættes konservativt til lange stints."
    ],
    timeline: [
      { year: "1932", text: "De første versioner af Hockenheimring opstår." },
      { year: "2002", text: "Den moderne kortere bane åbner efter stor ombygning." },
      { year: "2004", text: "Hockenheim i GTR2-æraen er den nye Grand Prix-konfiguration." }
    ]
  },
  imola: {
    title: "Mod uret gennem park, kerbs og historie",
    intro:
      "Imola er en af de få store europæiske baner, der køres mod uret. Den kombinerer parkbane-karakter, elevation og en række svingnavne, som fylder meget i moderne motorsportshistorie.",
    history: [
      "Autodromo Internazionale Enzo e Dino Ferrari voksede frem som en hurtig italiensk bane med offentlig vej-fornemmelse. Efter 1994 blev layoutet ændret markant af sikkerhedsgrunde, og GTR2-versionen bruger udgaven med chikaner, kerbs og en mere teknisk rytme.",
      "Banen har en intens karakter, fordi den ikke giver mange lange pauser. GT-biler skal angribe kerbs, men for hård brug ødelægger balancen. Det gør Imola til en bane, hvor setup og kørestil hurtigt afslører hinanden."
    ],
    gtr2Context:
      "Imola i GTR2 handler om disciplin gennem Tamburello-, Villeneuve- og Variante Alta-komplekserne. De afgørende tiendedele ligger typisk i kerb-kontrol og exits, ikke i maksimal indgangsfart.",
    drivingProfile: [
      "Sæt bilen op til at tage kerbs uden at miste bagenden.",
      "Fordi banen køres mod uret, fordeles dæk- og nakkebelastning anderledes end på de fleste kalenderbaner.",
      "Overhalinger skal planlægges; fejl ud af Rivazza eller chikanerne koster hele næste straight."
    ],
    timeline: [
      { year: "1950erne", text: "Imola udvikler sig som italiensk motorsportsanlæg." },
      { year: "1980", text: "Banen afholder Italiens Grand Prix, før San Marino GP-æraen." },
      { year: "1995", text: "Den ændrede sikkerhedskonfiguration bliver grundlaget for GTR2-eraens Imola." }
    ]
  },
  magnyCours: {
    title: "Fransk teknisk præcision med lånte svingnavne",
    intro:
      "Magny-Cours er en teknisk bane, hvor rytmen er beregnet og sekventiel. Den kræver præcise bremsepunkter, god rotation og evnen til at få bilen ud af langsomme sving uden at slide bagdækkene.",
    history: [
      "Circuit de Nevers Magny-Cours blev Frankrigs Formel 1-hjem fra 1991 til 2008. Banen ligger midt i Frankrig og blev udviklet som et moderne nationalt motorsportscentrum.",
      "Den er kendt for svingnavne inspireret af andre baner, blandt andet Estoril og Adelaide. Det afspejler banens karakter: flere tydeligt forskellige tekniske sektioner samlet i et kompakt GP-layout."
    ],
    gtr2Context:
      "Magny-Cours 2003 og 2004 bruger den nyere GP-konfiguration i GTR2-æraen, mens National-layoutet forkorter banen og gør rytmen mere kompakt og sprintpræget.",
    drivingProfile: [
      "Adelaide-hårnålen er et nøglepunkt for overhalinger, men dårlig exit ødelægger resten af sektoren.",
      "De tekniske kombinationer kræver en bil, der roterer uden at blive ustabil på trail braking.",
      "National-layoutet belønner kort gearing og hurtig reaktion frem for høj topfart."
    ],
    timeline: [
      { year: "1960erne", text: "Magny-Cours udvikles som fransk racerbane." },
      { year: "1991", text: "Banen bliver vært for Frankrigs Formel 1 Grand Prix." },
      { year: "2003", text: "Den GTR2-relevante nyere GP-konfiguration er i brug." }
    ]
  },
  monza: {
    title: "Temple of Speed, men ikke kun fuld gas",
    intro:
      "Monza er motorsportens store topfartsikon. Men i GT-racing er den ikke simpel: de langsomme chikaner, de store kerbs og Lesmo-sektionen afgør, hvem der kan omsætte lav vinge til en hel omgang.",
    history: [
      "Autodromo Nazionale Monza åbnede i 1922 og er et af verdens ældste permanente motorsportsanlæg. Banens ry er uløseligt forbundet med fart, slipstream og italiensk racingkultur.",
      "Den moderne GTR2-periode bruger Grand Prix-layoutet med chikaner, som reducerer den ekstreme gamle topfart, men stadig gør Monza til en af kalenderens hurtigste baner. Junior-layoutet er en helt anden oplevelse: kortere, tættere og langt mere teknisk."
    ],
    gtr2Context:
      "Monza 2003 og 2004 i GTR2 handler om at bremse sent uden at dræbe exits. Slipstream betyder meget, så defensiv kørsel og timing kan være lige så meget værd som ren fart.",
    drivingProfile: [
      "Lav vinge er næsten altid nødvendigt, men bilen må ikke blive ustabil under hård bremsning.",
      "Kerbs i Variante del Rettifilo og Roggia kan give tid, men også ødelægge en stint hvis bilen bouncer.",
      "Junior-layoutet kræver et andet setup med kortere gearing og mere rotation."
    ],
    timeline: [
      { year: "1922", text: "Monza åbner som en af verdens første permanente baner." },
      { year: "1971", text: "Italiens GP afgøres med en af historiens tætteste top fem-afslutninger." },
      { year: "2000", text: "Den moderne første chikaneperiode begynder for GTR2-eraens layout." }
    ]
  },
  oschersleben: {
    title: "Tysk stop-start-arena for tætte GT-felter",
    intro:
      "Oschersleben er ikke lang, men den er krævende. Den kombinerer korte straights, tekniske sving og en rytme, hvor overhalinger ofte begynder flere sving før de faktisk sker.",
    history: [
      "Motorsport Arena Oschersleben åbnede i 1997 og blev et af de første store tyske permanente anlæg efter genforeningen. Den blev hurtigt brugt til touring cars, GT-racing og nationale mesterskaber.",
      "Banens styrke er tæt racing. Den er kompakt nok til at samle feltet, men teknisk nok til at straffe upræcis kørsel. For GT-biler betyder det, at ren power ikke er nok; bilen skal kunne rotere og accelerere uden at slide dækkene op."
    ],
    gtr2Context:
      "Oschersleben 2003 og 2004 i GTR2 fungerer som en trafik- og kvalifikationsbane. Placering på banen betyder meget, fordi turbulent luft og korte langsider gør det svært at omsætte fartoverskud til rene overhalinger.",
    drivingProfile: [
      "Lavfartsrotation betyder mere end maksimal topfart.",
      "Overhalinger kræver pres og fejlprovokation, ikke kun sene bremser.",
      "I multiclass-løb skal hurtigere biler vælge sikre exits frem for desperate inderspor."
    ],
    timeline: [
      { year: "1997", text: "Motorsport Arena Oschersleben åbner." },
      { year: "2000erne", text: "Banen bliver fast stop for tyske og internationale touring/GT-serier." },
      { year: "GTR2-årene", text: "Layoutet giver tæt, teknisk europæisk GT-racing." }
    ]
  },
  spa: {
    title: "GT-racingens store europæiske prøve",
    intro:
      "Spa-Francorchamps fylder meget i GTR2-æraens FIA GT-billede. Den er lang, hurtig, kuperet og teknisk nok til, at setup ikke kan reduceres til lav vinge og topfart.",
    history: [
      "Spa begyndte som en vejtrekant mellem belgiske byer og udviklede sig gradvist til et permanent, men stadig naturligt kuperet anlæg. Den moderne bane bevarer steder som Eau Rouge, Raidillon, Kemmel, Pouhon og Blanchimont som faste pejlemærker.",
      "For GT-racing står Spa stærkest gennem 24-timersløbet. I 2000erne var banen tæt forbundet med FIA GT-feltets store GT1- og GT2-biler, og derfor hører Spa 2003 og 2004 naturligt hjemme i DGTL."
    ],
    gtr2Context:
      "Spa i GTR2 tester topfart, aero-stabilitet, bremser, kerbs og risikostyring. En hurtig omgang kræver respekt for elevation og vejr, ikke bare maksimal commitment.",
    drivingProfile: [
      "Eau Rouge/Raidillon kræver en stabil bil og små input; for meget korrektion koster hele Kemmel-straight.",
      "Bus Stop og La Source er oplagte overhalingssteder, men exits afgør om forsøget bliver værdifuldt.",
      "I multiclass-racing skal GT1-biler planlægge passeringer før Pouhon og Blanchimont, ikke midt i svinget."
    ],
    timeline: [
      { year: "1920erne", text: "Spa etableres som vejbaseret motorsportsrute i Ardennerne." },
      { year: "1979", text: "Den kortere moderne bane tages i brug." },
      { year: "2000erne", text: "Spa 24 Hours er et af FIA GT-årenes store løb." }
    ]
  },
  valencia: {
    title: "Stadionbanen hvor publikum kan følge rytmen",
    intro:
      "Circuit Ricardo Tormo er kompakt, teknisk og publikumsvenlig. Layoutet samler store dele af banen foran tribunerne, hvilket giver et andet racebillede end lange vejbaner som Spa eller Brno.",
    history: [
      "Banen åbnede i 1999 ved Cheste og er opkaldt efter Ricardo Tormo, den spanske motorcykelverdensmester. Den er især kendt fra motorcykelsport, men layoutets stop-start-rytme og lange belastninger fungerer også til GT-biler.",
      "Valencia køres mod uret, hvilket adskiller den fra de fleste baner i kataloget. Det ændrer belastningen på bil og kører og gør den langstrakte, flydende rytme til en anderledes teknisk udfordring."
    ],
    gtr2Context:
      "Valencia 2004, Long og National giver forskellige grader af samme stadionkarakter. Den fulde version kræver tålmodighed gennem lange buer; National gør trafikken tættere og tempoet mere afbrudt.",
    drivingProfile: [
      "Forhjulstemperatur er et nøgletema, fordi mange sving holder belastningen længe.",
      "Kortere layouts lægger mere vægt på exitfart og trafikstyring end på absolut topfart.",
      "Bilen skal rotere rent uden at blive snap-oversteery i de lange sekvenser."
    ],
    timeline: [
      { year: "1999", text: "Circuit Ricardo Tormo åbner ved Cheste." },
      { year: "2000erne", text: "Banen bliver kendt som et stærkt spansk internationalt anlæg." },
      { year: "GTR2-era", text: "Valencia indgår som teknisk mod-uret-kontrast til de hurtige GT-baner." }
    ]
  },
  zhuhai: {
    title: "Kinas første permanente internationale racerbane",
    intro:
      "Zhuhai markerer Kinas tidlige internationale motorsportsambitioner. Layoutet er rent og forståeligt: lange straights, hårde bremsezoner og tekniske exits.",
    history: [
      "Zhuhai International Circuit åbnede i 1996 og blev Kinas første permanente internationale racerbane. Før Shanghai International Circuit blev det store globale navn, var Zhuhai centrum for mange kinesiske sportsvogns- og internationale planer.",
      "Banen passer godt til GT-racing, fordi layoutet skaber tydelige duelpunkter. Den er ikke lige så dramatisk som Spa eller Donington, men den er ærlig: bremser, traction og linjedisciplin afgør tempoet."
    ],
    gtr2Context:
      "I GTR2 er Zhuhai en af de baner, hvor multiclass-racing kan fungere meget rent, fordi de lange straights giver hurtige biler mulighed for at planlægge passeringer.",
    drivingProfile: [
      "Bremsebalance fylder meget, fordi mange tidsgevinster kommer ind i hårde stop.",
      "Traction ud af langsomme sving bestemmer om bilen kan forsvare eller angribe på straights.",
      "Lav fejlrate slår ofte maksimal aggression, fordi layoutet giver flere gentagne bremseprøver."
    ],
    timeline: [
      { year: "1996", text: "Zhuhai International Circuit åbner." },
      { year: "1990erne", text: "Banen bliver Kinas første permanente internationale motorsportsanlæg." },
      { year: "2000erne", text: "Zhuhai optræder i internationale GT- og sportsvognssammenhænge." }
    ]
  }
};

function articleKey(trackId: string) {
  if (trackId.startsWith("anderstorp")) return "anderstorp";
  if (trackId.startsWith("barcelona")) return "barcelona";
  if (trackId.startsWith("brno")) return "brno";
  if (trackId.startsWith("donington")) return "donington";
  if (trackId.startsWith("dubai")) return "dubai";
  if (trackId.startsWith("enna")) return "enna";
  if (trackId.startsWith("estoril")) return "estoril";
  if (trackId.startsWith("hockenheim")) return "hockenheim";
  if (trackId.startsWith("imola")) return "imola";
  if (trackId.startsWith("magny")) return "magnyCours";
  if (trackId.startsWith("monza")) return "monza";
  if (trackId.startsWith("oschersleben")) return "oschersleben";
  if (trackId.startsWith("spa")) return "spa";
  if (trackId.startsWith("valencia")) return "valencia";
  return "zhuhai";
}

export function getTrackArticle(track: Gtr2Track) {
  const article = articles[articleKey(track.id)];
  const corners = track.data.corners ? `${track.data.corners} sving` : "Ikke bekræftet endnu";

  return {
    ...article,
    facts: [
      { label: "Layout", value: track.data.layout },
      { label: "Æra", value: track.data.era },
      { label: "Længde", value: `${track.lengthKm.toFixed(3)} km` },
      { label: "Sving", value: corners },
      { label: "Retning", value: track.data.direction },
      { label: "Placering", value: track.data.location }
    ],
    layoutNote: `${track.name} er DGTLs GTR2-layout for ${track.data.location}. Den registrerede længde er ${track.lengthKm.toFixed(
      3
    )} km, og layoutet er katalogiseret som ${track.data.layout} fra ${track.data.era}.`,
    setupNote: track.data.setupFocus,
    anecdote: track.data.anecdote,
    sources: track.data.sources
  };
}
