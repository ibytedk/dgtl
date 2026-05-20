import type { Gtr2Track } from "@/lib/gtr2-tracks";

type DossierSource = {
  label: string;
  url: string;
};

type DossierSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type FiaGtReport = {
  season: string;
  date: string;
  event: string;
  round: string;
  format: string;
  gtWinner: string;
  nGtWinner: string;
  report: string[];
};

type TrackDossier = {
  title: string;
  summary: string;
  sections: DossierSection[];
  fiaGtReports: FiaGtReport[];
  famousStories: DossierSection[];
  variantNotes: Record<string, string[]>;
  researchGaps: string[];
  sources: DossierSource[];
};

const fiaGtSources = {
  rsc2003: {
    label: "Racing Sports Cars - FIA GT 2003",
    url: "https://www.racingsportscars.com/championship/2003/FIA%20GT.html"
  },
  rsc2004: {
    label: "Racing Sports Cars - FIA GT 2004",
    url: "https://www.racingsportscars.com/championship/2004/FIA%20GT.html"
  },
  speedsport2003: {
    label: "Speedsport Magazine - FIA GT 2003 results",
    url: "https://www.speedsport-magazine.com/motorsport/grand-touring/gt1-world-championship-fia-gt/2003-results.html"
  },
  speedsport2004: {
    label: "Speedsport Magazine - FIA GT 2004 results",
    url: "https://www.speedsport-magazine.com/motorsport/grand-touring/gt1-world-championship-fia-gt/2004-results.html"
  },
  spa2003: {
    label: "Racing Sports Cars - Spa 24 Hours 2003",
    url: "https://www.racingsportscars.com/race/Spa-2003-07-27.html"
  },
  spa2004: {
    label: "Racing Sports Cars - Spa 24 Hours 2004",
    url: "https://www.racingsportscars.com/race/Spa-2004-08-01.html"
  },
  oschersleben2004: {
    label: "Racing Sports Cars - Oschersleben FIA GT 2004",
    url: "https://www.racingsportscars.com/race/Oschersleben-2004-09-19.html"
  },
  zhuhai2004: {
    label: "Racing Sports Cars - Zhuhai FIA GT 2004",
    url: "https://www.racingsportscars.com/race/Zhuhai-2004-11-14.html"
  },
  monza2004: {
    label: "Racing Sports Cars - Monza FIA GT 2004",
    url: "https://www.racingsportscars.com/race/Monza-2004-03-28.html"
  }
} satisfies Record<string, DossierSource>;

const dossiers: Record<string, TrackDossier> = {
  anderstorp: {
    title: "Anderstorp som nordisk internationalbane",
    summary:
      "Anderstorp er mere end en svensk flyvepladsbane. Det er et sjældent nordisk anlæg med Grand Prix-historie, FIA GT-besøg og et layout, der passer godt til tunge GT-biler.",
    sections: [
      {
        title: "Historisk udvikling",
        paragraphs: [
          "Scandinavian Raceway blev skabt i en periode, hvor Sverige forsøgte at etablere sig som fast international motorsportsnation. Banens flade placering, brede asfalt og lange stræk afslører flyvepladsrødderne. Det gav et anlæg, som teknisk set adskilte sig fra kuperede parkbaner som Donington og Spa.",
          "I 1970erne fik Anderstorp sin internationale topstatus gennem Sveriges Grand Prix. Det betyder noget for DGTL, fordi banen ikke bare er et lokalt nordisk kuriosum. Den har været målt mod sportens øverste niveau og har haft den infrastruktur og bredde, der skulle til for at tage imod store internationale felter.",
          "For GT-racing er Anderstorp interessant, fordi banen ikke skjuler bilens effektivitet. En bil med lav drag og rolig aerodynamik får betaling på de lange stræk, men en tung GT1-bil kan ikke overleve en omgang alene på motor. De lange højresving og åbne bremsezoner kræver stabilitet, og det gør banen velegnet til at afsløre overophedede fordæk og for aggressive differentialindstillinger."
        ]
      },
      {
        title: "Sportsvogne og GT-biler på Anderstorp",
        paragraphs: [
          "Anderstorp passer til GT-biler, fordi layoutet giver tid til at færdiggøre overhalinger uden at presse bilen ind i snævre bybane-situationer. Det betyder ikke, at overhalinger er lette. Den flade bane gør bremsemærker mindre tydelige, og slipstream-dueller bliver ofte afgjort af, hvem der tør bremse sent uden at miste exit.",
          "I multiclass-løb er banen relativt forudsigelig. Hurtigere biler kan planlægge passeringer på de lange stræk, mens langsommere biler kan holde en ren linje gennem de brede sving. Risikoen kommer, når en hurtig bil forventer for meget plads i de flade indgange, hvor referencepunkterne er svagere end på klassiske bakke- og parkbaner."
        ],
        bullets: [
          "Stærk på topfart, stabilitet og bremsemod.",
          "Mindre god til biler der er afhængige af hård rotation og korte accelerationer.",
          "South-layoutet flytter vægten fra topfart til traction og gentagne retningsskift."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "7. september 2003",
        event: "FIA GT Championship Anderstorp",
        round: "Round 7",
        format: "500 km / FIA GT-sprintformat",
        gtWinner: "Lister Racing #14 - Jamie Campbell-Walter / Nathan Kinch",
        nGtWinner: "EMKA Racing #61 - Tim Sugden / Emmanuel Collard",
        report: [
          "Anderstorp kom på kalenderen lige efter Spa 24 Hours. Hvor Spa handlede om holdbarhed, nattetimer og trafik, blev Anderstorp en mere ligefrem prøve på fart, bremser og disciplin.",
          "Lister-sejren brød BMS/Ferrari-dominansen i GT-klassen. På en bane hvor høj fart og stabilitet betyder meget, fik Lister Storm vist, at Ferrari 550 Maranello ikke var alene om at kunne vinde på tempo."
        ]
      }
    ],
    famousStories: [
      {
        title: "Fan car-løbet i 1978",
        paragraphs: [
          "Anderstorps mest berømte enkeltstående historie er Brabham BT46B, den såkaldte fan car, ved Sveriges Grand Prix i 1978. Bilen vandt sit eneste Formel 1-løb på netop Anderstorp, hvorefter konceptet blev trukket tilbage fra mesterskabet.",
          "For en GT-læser er pointen teknisk. Anderstorp var flad, hurtig og præget af lange belastninger. Det var præcis en type bane, hvor aerodynamisk stabilitet og effektivitet kunne blive synligt afgørende."
        ]
      }
    ],
    variantNotes: {
      "anderstorp-south": [
        "South-layoutet skal ikke vurderes som en kortere udgave af samme opgave. Det fjerner en del af topfartsargumentet og gør bilen mere afhængig af rotation, gearing og traction.",
        "Til DGTL er South-layoutet bedst som sprint- eller træningsbane, fordi trafik hurtigt bliver en større faktor end i GP-layoutet."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: komplette omgangsforløb og stintdata fra FIA GT Anderstorp 2003. Næste skridt er officielle timingark fra 2003 eller arkiverede SRO/FIA GT race reports."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.speedsport2003]
  },
  barcelona: {
    title: "Catalunya som ærlig test af hele bilen",
    summary:
      "Barcelona-Catalunya er ikke kun en Grand Prix-bane. Den er et teknisk måleinstrument: lange sving, hårde stop, dækslid og setup-kompromiser bliver synlige hurtigere her end på næsten nogen anden bane i GTR2-kataloget.",
    sections: [
      {
        title: "Hvorfor Barcelona afslører bilen",
        paragraphs: [
          "Banen åbnede i 1991 og blev hurtigt et fast sted for testarbejde. Årsagen er ikke mystisk. Layoutet blander hurtige, langvarige belastninger med lavfartssektioner og en hovedlangside, hvor motor og drag stadig betyder noget. En bil der er god her, er sjældent direkte dårlig andre steder.",
          "Barcelona i GTR2 ligger før den senere langsomme F1-chikane i sidste sektor. Det gør afslutningen på omgangen mere flydende og stiller større krav til aero-balance og mod gennem de hurtige højresving. For en GT1- eller GT2-bil betyder det, at man ikke kan tune bilen udelukkende efter bremsezonerne.",
          "For modne simracere er Catalunya ofte undervurderet, fordi den kan virke velkendt. Men netop det gør den hård. Når alle kender linjen, bliver forskellen skabt af dæktemperatur, stabil trail braking og evnen til at holde bilen fri af understyring over mange omgange."
        ]
      },
      {
        title: "GT-setup og trafik",
        paragraphs: [
          "Barcelona straffer en front, der mister greb midt i svinget. De lange højrebelastninger bygger temperatur i fordækkene, og hvis bilen allerede understyrer fra start, bliver stintet langsomt ødelagt. Omvendt er en løs bagende farlig, fordi exits mod de lange accelerationer bliver urolige.",
          "I multiclass-racing er det ikke nok at være hurtig ind i svingene. Hurtigere biler skal placere sig, så de ikke hænger fast bag langsommere biler gennem de lange sekvenser. En dårlig passering før et langt sving kan koste mere end et konservativt valg og et rent exit."
        ],
        bullets: [
          "Frontgreb er afgørende, men bagenden skal være stabil ved høj fart.",
          "National-layoutet gør løbet tættere og øger betydningen af bremsebalance.",
          "Dækpleje er en del af arbejdet, ikke kun et setup-spørgsmål."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "6. april 2003",
        event: "FIA GT Championship Barcelona",
        round: "Round 1",
        format: "FIA GT-sæsonåbner",
        gtWinner: "BMS Scuderia Italia #23 - Thomas Biagi / Matteo Bobbi",
        nGtWinner: "JMB Racing #52 - Andrea Bertolini / Fabrizio De Simone",
        report: [
          "Barcelona åbnede 2003-sæsonen og satte retningen for BMS Scuderia Italias titelår. En sæsonåbner på Catalunya er særlig afslørende, fordi teams ikke kan gemme en ubalanceret bil bag topfart eller pitstrategi alene.",
          "GT-resultatet pegede direkte mod Ferrari 550 Maranello som den bil, alle skulle måle sig mod. N-GT-sejren til JMB understregede samtidig, at Ferrari 360 Modena kunne være stærk på tekniske baner, når den blev kørt med præcis dækstyring."
        ]
      }
    ],
    famousStories: [
      {
        title: "Fra OL-år til teststandard",
        paragraphs: [
          "Barcelona-banen blev en del af den catalanske sportslige modernisering omkring begyndelsen af 1990erne. Den vandt ikke sit ry gennem én enkelt sensation, men gennem gentagelse: test, Grand Prix, nationale serier og internationale supportklasser.",
          "Det er mindre romantisk end Spa eller Monza, men det forklarer banens ry. Catalunya blev stedet, hvor ingeniører og kørere fandt ud af, om en bil havde en bred arbejdsramme. For GTR2 er det præcis derfor, den fungerer så godt som testbane."
        ]
      }
    ],
    variantNotes: {
      "barcelona-national": [
        "National-layoutet fjerner noget af den store GP-rytme og gør banen mere stop-start-præget.",
        "Det er et godt DGTL-layout til tætte felter, fordi forskellene mellem klasserne bliver samlet på færre meter."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: fuldt officielt FIA GT Barcelona 2003-løbsreferat med stintforløb og pitstopsekvenser."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.speedsport2003]
  },
  brno: {
    title: "Masaryk-arven oversat til moderne GT-racing",
    summary:
      "Brno er en af de baner, hvor sportsvognsracing føles hjemme. Den moderne bane er sikker og bred, men rytmen, højdeforskellene og de lange buer har stadig noget af Masaryk-traditionen i sig.",
    sections: [
      {
        title: "Fra landevejsring til permanent anlæg",
        paragraphs: [
          "Brnos motorsportshistorie begyndte ikke med den moderne Automotodrom. Masaryk-løbene brugte offentlige veje og var en del af den centraleuropæiske tradition for lange, hurtige og farlige ruter gennem landskabet. Den moderne bane fra 1987 gjorde traditionen brugbar for nyere sikkerhedskrav uden at fjerne følelsen af terræn.",
          "Det særlige ved Brno er, at banen er bred uden at blive anonym. Højdeforskellene betyder, at bilen hele tiden arbejder i kompression, aflastning og camber. I en GT-bil mærkes det tydeligt, fordi vægt og dækslid bliver en del af omgangens rytme.",
          "GTR2-versionerne 2003 og 2004 kører med samme grundkarakter: en lang omgang, hvor man skal modstå fristelsen til at overkøre indgangene. Den hurtige kører på Brno er sjældent den mest aggressive. Det er den, der får bilen til at flyde uden at bruge dækkene for tidligt."
        ]
      },
      {
        title: "Hvor Brno afgør GT-løb",
        paragraphs: [
          "Brno belønner biler med mekanisk greb og en stabil platform gennem lange mellemhurtige sving. For meget bagvinge kan gøre bilen tryg, men den bliver tung på de lange accelerationer. For lidt stabilitet gør bilen svær at placere gennem de brede sving, hvor en lille fejl koster fart over mange meter.",
          "I multiclass-racing er Brno mere taktisk end den ser ud. Banen er bred, men de gode linjer er lange. En hurtig bil kan ikke bare dykke ind overalt uden at ødelægge sin egen exit. Derfor bliver overhalinger ofte bygget over to eller tre sving."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "25. maj 2003",
        event: "FIA GT Championship Brno",
        round: "Round 4",
        format: "500 km",
        gtWinner: "BMS Scuderia Italia #23 - Thomas Biagi / Matteo Bobbi",
        nGtWinner: "Freisinger Motorsport #50 - Marc Lieb / Stéphane Ortelli",
        report: [
          "Brno 2003 lå midt i BMS' stærke åbningsfase. På en bane der kræver både træk og stabilitet, var sejren endnu et tegn på, at Ferrari 550 Maranello ikke kun var stærk på hurtige baner.",
          "N-GT-sejren til Freisinger passer til banens karakter. Porsche 996 GT3-RS/RSR-platformens stabilitet og slidstyrke var værdifuld på en lang omgang, hvor fejl og dækslid gradvist blev dyrere."
        ]
      },
      {
        season: "2004",
        date: "30. maj 2004",
        event: "FIA GT Championship Brno",
        round: "Round 5",
        format: "500 km / 3-timersramme",
        gtWinner: "Vitaphone Racing Team #5 - Michael Bartels / Uwe Alzen",
        nGtWinner: "G.P.C. Giesse #62 - Christian Pescatori / Fabrizio De Simone",
        report: [
          "Brno 2004 var en af de dage, hvor Saleen S7-R slog Ferrari-feltet. Banen gav plads til både motorstyrke og stabilitet, og Vitaphone fik udnyttet begge dele.",
          "N-GT-resultatet er også interessant, fordi Ferrari 360 Modena stadig kunne bryde Porsche-mønsteret på tekniske baner med god balance og ren kørsel."
        ]
      }
    ],
    famousStories: [
      {
        title: "Masaryk-navnet som kvalitetsstempel",
        paragraphs: [
          "Brno er ikke berømt på grund af et enkelt globalt øjeblik. Banens tyngde kommer fra kontinuitet: Masaryk Grand Prix-traditionen, motorcykel-VM, touring cars og GT-racing.",
          "For et dansk GTR2-publikum er det afgørende, at Brno føles som en rigtig international bane uden at blive et anonymt moderne anlæg. Den har plads, men den har også konsekvens."
        ]
      }
    ],
    variantNotes: {},
    researchGaps: [
      "Ikke bekræftet endnu: komplette sektor- og pitstopdata fra FIA GT Brno 2003/2004."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.rsc2004, fiaGtSources.speedsport2003, fiaGtSources.speedsport2004]
  },
  donington: {
    title: "Britisk terræn, flow og bremsezoner",
    summary:
      "Donington er en af de baner, hvor en GT-bil skal kunne to ting på samme omgang: flyde gennem hurtige terrænsektioner og stoppe brutalt til Melbourne Loop.",
    sections: [
      {
        title: "To sider af Donington",
        paragraphs: [
          "Donington Park har førkrigshistorie, men den moderne betydning kom efter Tom Wheatcrofts genopbygning. Derfor føles banen både gammel og ny. Den har naturligt terræn og klassiske svingnavne, men også en moderne GP-udvidelse med tydelige overhalingszoner.",
          "National-layoutet er Doningtons kerne. Redgate, Hollywood, Craner Curves og Old Hairpin skaber en flydende start på omgangen, hvor bilen skal være stabil uden at blive død i fronten. GP-layoutet tilføjer Melbourne Loop, som ændrer løbets karakter markant.",
          "I GTR2 giver Donington derfor to forskellige opgaver. National belønner momentum og placering. GP kræver, at man kan kombinere momentum med hårde bremser og traction ud af langsomme hårnåle."
        ]
      },
      {
        title: "GT-bilens problem på Donington",
        paragraphs: [
          "En GT1-bil kan angribe Donington hårdt, men den skal være rolig i retningsskift. Craner Curves er ikke et sted, hvor man vil have pludselig overstyring eller en front, der bider asymmetrisk på kerbs. Til gengæld giver Melbourne Hairpin en klar chance for at bruge bremsemod og motor.",
          "I multiclass-racing er Donington vanskelig, fordi hastighedsforskellene opstår midt i banens mest flydende sektioner. En hurtigere bil skal ofte vente, fordi en passering i det forkerte øjeblik ødelægger begge bilers linje gennem en hel sekvens."
        ],
        bullets: [
          "National: rytme, frontplacering og stabilitet.",
          "GP: bremser, hårnåle og risiko for låste forhjul.",
          "Trafik er sværest gennem de hurtige terrændele, ikke på langsiderne."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "29. juni 2003",
        event: "FIA GT Championship Donington",
        round: "Round 5",
        format: "500 km",
        gtWinner: "BMS Scuderia Italia #23 - Thomas Biagi / Matteo Bobbi",
        nGtWinner: "Freisinger Motorsport #50 - Marc Lieb / Stéphane Ortelli",
        report: [
          "Donington 2003 forlængede BMS' stærke sæsonstart. Det resultat siger en del, for Donington er ikke en ren motorbane. Ferrari 550'eren skulle også fungere gennem de flydende britiske sektioner.",
          "Freisingers N-GT-sejr passer til Porschens styrker: stabilitet, gentagelighed og evnen til at holde tempo uden at bruge dækkene op i de lange belastninger."
        ]
      },
      {
        season: "2004",
        date: "27. juni 2004",
        event: "FIA GT Championship Donington",
        round: "Round 6",
        format: "500 km / 3 timer",
        gtWinner: "JMB Racing #17 - Jaime Melo / Karl Wendlinger",
        nGtWinner: "Yukos Freisinger #50 - Stéphane Ortelli / Emmanuel Collard",
        report: [
          "Donington 2004 endte med JMB øverst i GT-klassen med en Ferrari 575 Maranello. På Donington kan en velafbalanceret bil være mere værd end den teoretisk bedste bil på papiret.",
          "N-GT-resultatet bekræftede igen Freisingers styrke i 2004. Ortelli og Collard var et stærkt makkerpar i den type løb, hvor fejlrate og trafikstyring vejer tungt."
        ]
      }
    ],
    famousStories: [
      {
        title: "1993 og det moderne Donington-ry",
        paragraphs: [
          "Doningtons mest citerede moderne øjeblik er European Grand Prix 1993, hvor Ayrton Sennas første omgang blev en del af banens internationale ry. Det var ikke et GT-løb, men det forklarer hvorfor banen stadig forbindes med skiftende greb, mod og præcision.",
          "For GT-racing er læringen mere jordnær: Donington belønner kørere, der kan læse greb og terræn hurtigt. Den belønner ikke kun maksimal fart."
        ]
      }
    ],
    variantNotes: {
      "donington-park-national": [
        "National-layoutet fjerner Melbourne Loop og gør banen mere flydende.",
        "Til DGTL giver National færre hårde overhalingszoner, men bedre rytme og færre afbrudte sekvenser."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: komplette FIA GT Donington race reports med safety car- og pitstopforløb."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.rsc2004, fiaGtSources.speedsport2003, fiaGtSources.speedsport2004]
  },
  dubai: {
    title: "Mellemøstens moderne FIA GT-ankomst",
    summary:
      "Dubai Autodrome er GTR2-katalogets tydeligste billede på FIA GT-seriens udvidelse uden for den klassiske europæiske kalender.",
    sections: [
      {
        title: "Et nyt anlæg i en ny region",
        paragraphs: [
          "Dubai Autodrome åbnede i 2004 og var fra starten tænkt som et moderne internationalt motorsportsanlæg. Den har ikke samme historiske lag som Spa, Monza eller Donington. Den kom med, da GT-racing begyndte at flytte sig ud over den faste europæiske kalender.",
          "Layoutfamilien er fleksibel. Club, National, International og GP-konfigurationer ændrer ikke kun længden, men også løbets karakter. De korte layouts gør trafik og traction dominerende, mens de længere varianter giver plads til motor, bremser og stabilitet.",
          "Den moderne asfaltkarakter betyder, at fejl ofte handler om bremsepunkter, kerbs og exits frem for uforudsigelige bump eller historiske vejbanesektioner. Det gør Dubai teknisk klar, men ikke nødvendigvis let."
        ]
      },
      {
        title: "GT-racing i varme og stop-start-rytme",
        paragraphs: [
          "Dubai stiller store krav til bremser og bagdæk. Mange sektioner starter med hård nedbremsning og slutter med acceleration fra lav eller mellem fart. Hvis bilen er for aggressiv på differentialet, kan den føles hurtig i to omgange og langsom derefter.",
          "I multiclass-løb på de korte layouts bliver tålmodighed afgørende. En hurtigere bil kan hurtigt indhente trafik, men der er ikke altid plads til at passere uden at ødelægge sin egen exit. Derfor skal DGTL-løb på Dubai sættes op med tydelige klasseforventninger."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2004",
        date: "8. oktober 2004",
        event: "FIA GT Championship Dubai",
        round: "Round 10",
        format: "500 km / 3 timer",
        gtWinner: "BMS Scuderia Italia #1 - Matteo Bobbi / Gabriele Gardel",
        nGtWinner: "Freisinger Motorsport #99 - Lucas Luhr / Sascha Maassen",
        report: [
          "Dubai 2004 viste, at FIA GT-serien var villig til at køre på nye anlæg uden for den gamle europæiske kerne. Regionen skulle senere få langt større betydning i international motorsport.",
          "Sportsligt fulgte løbet sæsonens hovedmønster: Ferrari 550 Maranello i GT og Freisinger/Porsche i N-GT. For DGTL er pointen enkel: Dubai var ikke bare en eksotisk kulisse. Den var et løb på 2004-kalenderen med de samme biler og de samme teams som resten af sæsonen."
        ]
      }
    ],
    famousStories: [
      {
        title: "Fra FIA GT-besøg til langdistancery",
        paragraphs: [
          "Dubai blev senere især kendt i sportsvognsmiljøet gennem 24H Dubai. Den udvikling giver mening: anlægget var moderne, logistisk stærkt og egnet til store amatør/pro-am-felter.",
          "Det ændrer også hvordan man bør læse banen i DGTL. Den er ikke klassisk på samme måde som Monza, men den hører med som et tidligt tegn på, at den internationale GT-kalender var på vej nye steder hen."
        ]
      }
    ],
    variantNotes: {
      "dubai-club": [
        "Club-layoutet er det mest kompakte og bør bruges til korte løb eller træning, hvor trafik er en del af udfordringen."
      ],
      "dubai-international": [
        "International-layoutet er mellemvejen: mere komplet end Club/National, men mindre åbent end GP-layoutet."
      ],
      "dubai-national": [
        "National-layoutet bevarer stop-start-karakteren og gør bremsebalance vigtigere end topfart."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: detaljeret officiel Dubai 2004 race report med temperatur, stintlængder og pitstopsekvens."
    ],
    sources: [fiaGtSources.rsc2004, fiaGtSources.speedsport2004]
  },
  enna: {
    title: "Pergusa: søbanen hvor bremser bliver historie",
    summary:
      "Enna-Pergusa er ikke en normal permanent bane. Den følger Pergusa-søen og gør høj fart teknisk gennem chikaner, bremsebelastning og kerb-kontrol.",
    sections: [
      {
        title: "Geografien bestemmer banen",
        paragraphs: [
          "Pergusa er speciel, fordi banens grundform kommer fra vejen rundt om Lago di Pergusa. Det giver en næsten ringformet struktur, hvor de store beslutninger historisk har handlet om at tæmme fart snarere end at skabe tekniske sektioner fra bunden.",
          "Chikanerne er derfor ikke pynt. De er banens moderne sikkerhedslogik. Uden dem ville layoutet være en ekstrem topfartsopgave. Med dem bliver det en hård test af bremser, kerbs og bilens evne til at skifte retning efter meget høj fart.",
          "For GT-biler betyder det, at Enna belønner en anden type disciplin end Brno eller Barcelona. Man skal kunne stoppe bilen gentagne gange uden at overophede bremserne, men man må ikke sætte bilen så konservativt op, at den mister fart på de lange stræk."
        ]
      },
      {
        title: "Hvorfor Pergusa kan være brutal i GTR2",
        paragraphs: [
          "GTR2-biler på Pergusa når hurtigt en rytme, hvor alt afhænger af chikanerne. En bil der hopper over kerbs eller lander ustabilt, taber ikke bare ét sving; den taber hele næste acceleration.",
          "Multiclass-racing er risikabelt her, fordi hastighedsforskellene opstår ved de hårdeste bremsepunkter. Hurtige biler bør ikke bruge chikanerne som tilfældige overhalingszoner."
        ],
        bullets: [
          "Lav drag er fristende, men ikke gratis.",
          "Bremsekøling og en bil der kan tage kerbs uden at hoppe, skal med i opsætningen.",
          "Fejl i en chikane forplanter sig direkte til næste straight."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "11. maj 2003",
        event: "FIA GT Championship Pergusa",
        round: "Round 3",
        format: "500 km",
        gtWinner: "BMS Scuderia Italia #23 - Thomas Biagi / Matteo Bobbi",
        nGtWinner: "EMKA Racing #61 - Tim Sugden / Martin Short",
        report: [
          "Pergusa 2003 blev endnu en sejr i BMS' stærke åbningsserie. Det siger noget om pakken, for Pergusa tester ikke kun rå fart. Den tester gentagne nedbremsninger fra høj hastighed.",
          "N-GT-sejren til EMKA Racing gav Ferrari/Porsche-mønstret modspil og passer til Pergusas særpræg: et rent løb med stabil bremse- og kerb-håndtering kan slå ren klassekonvention."
        ]
      }
    ],
    famousStories: [
      {
        title: "Middelhavsbanen med miljømæssige begrænsninger",
        paragraphs: [
          "Pergusa ligger i et følsomt naturområde, og det har altid gjort banens drift mere kompliceret end for mange permanente anlæg. Den historiske interesse ligger derfor ikke kun i løbene, men også i spændingen mellem motorsport, geografi og lokal regulering.",
          "For DGTL giver det banen et klart særpræg: den er ikke bare endnu en italiensk bane. Den er et teknisk kompromis skabt af et meget bestemt sted."
        ]
      }
    ],
    variantNotes: {},
    researchGaps: [
      "Ikke bekræftet endnu: moderne officiel dokumentation for præcis GTR2-layoutperiode og chikanekonfiguration."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.speedsport2003]
  },
  estoril: {
    title: "Estoril mellem Grand Prix-historie og GT-dækslid",
    summary:
      "Estoril er en portugisisk GP-bane, hvor langsomme exits, lange højresving og hovedlangsiden gør den mere nuanceret end dens enkle kort antyder.",
    sections: [
      {
        title: "Portugals internationale base",
        paragraphs: [
          "Autódromo do Estoril åbnede i 1972 og blev senere Portugals Formel 1-hjem. Den internationale periode gav banen en status, som også gjorde den naturlig for sportsvogne, test og store nationale mesterskaber.",
          "Banens tekniske styrke ligger i blandingen. Den har en lang hovedlangside, men omgangstiden afgøres ikke alene af motor. Parabolica Interior og de langsomme sektioner kræver balance, frontgreb og dækstyring.",
          "I GT-racing bliver Estoril hurtigt en bane, hvor man kan se forskel på en hurtig omgang og et godt stint. En bil der er hård ved forhjulene, kan virke stærk i kvalifikation og falde tilbage i løbet."
        ]
      },
      {
        title: "GTR2-karakter",
        paragraphs: [
          "Estoril 2003 føles mere teknisk end dramatisk. Den belønner kørere, der kan gentage bremsepunkter og få bilen vendt tidligt uden at bruge for meget bagdæk på exits.",
          "I multiclass-løb er hovedlangsiden en naturlig passagerute, men den forberedes i det foregående sving. En hurtigere bil der mister exit, får ikke den samme rene overhaling før første sving."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "5. oktober 2003",
        event: "FIA GT Championship Estoril",
        round: "Round 9",
        format: "500 km",
        gtWinner: "JMB Racing #9 - Fabio Babini / Philipp Peter",
        nGtWinner: "JMB Racing #52 - Andrea Bertolini / Fabrizio De Simone",
        report: [
          "Estoril 2003 skiller sig ud, fordi JMB tog både GT- og N-GT-sejren. Den dag fungerede teamets pakke bredt på tværs af klasserne.",
          "Banens karakter hjælper med at forklare resultatets betydning. Estoril kræver balance, og en organisation der rammer setup og drift på tværs af to klasser, får mere ud af bilen end ren tophastighed."
        ]
      }
    ],
    famousStories: [
      {
        title: "1985 står stadig tydeligt",
        paragraphs: [
          "Estoril er internationalt kendt for Portugals Grand Prix 1985, hvor Ayrton Senna tog sin første Formel 1-sejr. Det var ikke et sportsvognsløb, men det er en del af banens status som sted for store karrieremarkører.",
          "For GT-læsere er den historiske værdi mere praktisk: Estoril har altid været en bane, hvor greb, vejrlig og dækkontrol kan ændre styrkeforholdet."
        ]
      }
    ],
    variantNotes: {},
    researchGaps: [
      "Ikke bekræftet endnu: officielle FIA GT Estoril 2003 stint- og pitstopdata."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.speedsport2003]
  },
  hockenheim: {
    title: "Efter skoven: Hockenheim som moderne GT-stadion",
    summary:
      "Hockenheim i GTR2 er ikke den gamle skovbane. Det er den ombyggede 2002-konfiguration, hvor hårnåle, stadionsektion og traction bestemmer GT-løbet.",
    sections: [
      {
        title: "Ombygningen ændrede alt",
        paragraphs: [
          "Den gamle Hockenheimring var defineret af lange straights gennem skoven. Efter ombygningen i 2002 blev banen kortere, mere kompakt og langt mere publikumsnær. Det ændrede også den tekniske opgave for GT-biler.",
          "Hvor den gamle bane ville have været en ekstrem drag- og motortest, er GTR2-Hockenheim en bremse- og tractionbane. Mercedes Arena, hårnålen og Motodrom betyder, at bilen skal kunne stoppe og accelerere rent uden at miste balance i de langsommere sektioner.",
          "Det gør banen god til liga-ræs. Den giver klare overhalingszoner, men straffer også overoptimisme. Et for sent dyk til hårnålen kan ødelægge både egen og andres omgang."
        ]
      },
      {
        title: "Layoutvarianterne",
        paragraphs: [
          "GP-layoutet giver den mest komplette GT-opgave: høj fart, hård nedbremsning og stadionpræcision. National og Short fjerner noget af tophastigheden og koncentrerer løbet omkring acceleration, bremser og lavfartsbalance.",
          "I multiclass-racing kan de korte layouts blive meget tætte. Det er godt for intensitet, men det kræver tydelige regler for track limits og forudsigelige linjer i trafik."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2004",
        date: "16. maj 2004",
        event: "FIA GT Championship Hockenheim",
        round: "Round 4",
        format: "500 km / 3 timer",
        gtWinner: "BMS Scuderia Italia #1 - Matteo Bobbi / Gabriele Gardel",
        nGtWinner: "Freisinger Motorsport #99 - Lucas Luhr / Sascha Maassen",
        report: [
          "Hockenheim 2004 passer præcist til den ombyggede bane. BMS vandt GT-klassen på et layout, hvor Ferrari 550 skulle være mere end en stærk motorbil.",
          "Freisingers N-GT-sejr viste Porschens styrke på en bane med mange accelerationer og hårde stop. Stabilitet under bremsning og god traction var lige så afgørende som klassens rå omgangstid."
        ]
      }
    ],
    famousStories: [
      {
        title: "Tabet af skovbanen",
        paragraphs: [
          "Det store brud i Hockenheims historie er fraværet af den gamle skovbane. Ombygningen fjernede noget af den ekstreme karakter, men skabte en bane der bedre passede moderne sikkerhed, publikum og tv-produktion.",
          "Det gør Hockenheim til en god diskussion i DGTL: vil man have historisk myte, eller vil man have et layout der skaber flere faktiske race-situationer?"
        ]
      }
    ],
    variantNotes: {
      "hockenheim-national": [
        "National-layoutet gør Hockenheim mere kompakt og reducerer betydningen af topfart.",
        "Det passer bedst til felter, hvor forskellen mellem klasserne ikke skal blive for stor."
      ],
      "hockenheim-short": [
        "Short-layoutet er næsten et koncentrat af Motodrom- og lavfartsarbejde.",
        "Det bør bruges med omtanke i multiclass, fordi omgangstrafik hurtigt bliver dominerende."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: fuld officiel lap chart for FIA GT Hockenheim 2004."
    ],
    sources: [fiaGtSources.rsc2004, fiaGtSources.speedsport2004]
  },
  imola: {
    title: "Imola efter 1994: teknisk, hurtig og alvorlig",
    summary:
      "Imola er en bane, hvor historien ikke kan skilles fra layoutet. GTR2 bruger en ændret, mere teknisk udgave, men terræn, kerbs og mod-uret-rytme gør den stadig krævende.",
    sections: [
      {
        title: "Layoutet efter sikkerhedsændringerne",
        paragraphs: [
          "Imola udviklede sig fra en meget hurtig italiensk parkbane til et mere kontrolleret moderne layout efter sikkerhedsændringerne i midten af 1990erne. Det ændrede banens rytme, men ikke dens karakter fuldstændigt.",
          "Banen køres mod uret, hvilket gør den fysisk og teknisk anderledes end de fleste europæiske baner. Kombinationen af elevation, kerbs og korte accelerationer betyder, at en GT-bil skal være villig til at skifte retning uden at blive nervøs.",
          "I GTR2 handler Imola ikke om at køre maksimalt aggressivt over alle kerbs. Den hurtige omgang kommer fra at bruge nok kerb til at rette bilen, men ikke så meget at platformen bryder sammen."
        ]
      },
      {
        title: "GT-racingens Imola",
        paragraphs: [
          "Imola favoriserer en bil med god bremsebalance og stærk traction ud af chikaner. En bil der hopper, mister tid hele vejen ned til næste bremsezone. En bil der er for blød, mister præcision i de hurtige retningsskift.",
          "Multiclass-racing på Imola kræver disciplin. Der er steder, hvor hastighedsforskellen ser ud til at give en åbning, men hvor banens kerbs og smalle exits gør passeringen dårlig."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2004",
        date: "5. september 2004",
        event: "FIA GT Championship Imola",
        round: "Round 8",
        format: "500 km / 3 timer",
        gtWinner: "Vitaphone Racing Team #5 - Michael Bartels / Uwe Alzen",
        nGtWinner: "Freisinger Motorsport #99 - Lucas Luhr / Sascha Maassen",
        report: [
          "Imola 2004 kom lige før Maserati MC12 for alvor ændrede samtalen i FIA GT. Vitaphones Saleen-sejr står derfor som et af de sidste store nedslag før MC12'ens gennembrud.",
          "N-GT-resultatet fulgte Freisingers stærke 2004-mønster. På Imola gav Porsche-platformens stabilitet gennem chikaner og under nedbremsning et naturligt udgangspunkt."
        ]
      }
    ],
    famousStories: [
      {
        title: "1994 og banens alvor",
        paragraphs: [
          "Imola kan ikke omtales seriøst uden at anerkende San Marino Grand Prix 1994. Weekenden ændrede Formel 1 og påvirkede efterfølgende sikkerhedstænkning, også på baner langt uden for F1.",
          "For DGTL skal den historie håndteres nøgternt. Den gør ikke banen til et nostalgisk postkort. Den forklarer, hvorfor den GTR2-relevante Imola er en bane formet af konkrete sikkerhedsvalg."
        ]
      }
    ],
    variantNotes: {},
    researchGaps: [
      "Ikke bekræftet endnu: præcis forskel mellem GTR2s Imola-surface/kerbdata og den virkelige 2004 FIA GT-konfiguration."
    ],
    sources: [fiaGtSources.rsc2004, fiaGtSources.speedsport2004]
  },
  magnyCours: {
    title: "Magny-Cours som fransk teknisk laboratorie",
    summary:
      "Magny-Cours er ikke en tilfældig samling svingnavne. Den er en teknisk bane, hvor GT-biler skal kunne bremse, rotere og accelerere uden at miste rytmen.",
    sections: [
      {
        title: "Banens konstruktion og karakter",
        paragraphs: [
          "Magny-Cours blev Frankrigs Grand Prix-bane i 1990erne og er en mere planlagt type racerbane end de gamle vej- og parkbaner. Den er teknisk, kompakt og bevidst sammensat af sektioner med forskellig karakter.",
          "Svingnavne som Estoril og Adelaide siger noget om ambitionen: banen låner referencer, men bruger dem i sin egen rytme. For GT-biler betyder det, at setup skal dække både lange belastninger og hårde lavfartsstop.",
          "Magny-Cours ligger i GTR2 som en del af FIA GT-årenes klassiske kalender. Den er ikke den hurtigste bane, men den afslører om en bil kan gentage præcis kørsel over en hel distance."
        ]
      },
      {
        title: "Hvor løbet afgøres",
        paragraphs: [
          "Adelaide-hårnålen er den oplagte overhalingszone, men en dårlig exit kan ødelægge resten af sektoren. Derfor er det ikke nok at bremse sent. Bilen skal også kunne pege tidligt nok til at bruge accelerationen.",
          "National-layoutet gør banen mere kompakt og skubber vægten mod lavfartsbalance. Det kan give tættere liga-racing, men også flere situationer hvor trafik ødelægger de langsomme exits."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "27. april 2003",
        event: "FIA GT Championship Magny-Cours",
        round: "Round 2",
        format: "500 km",
        gtWinner: "BMS Scuderia Italia #23 - Thomas Biagi / Matteo Bobbi",
        nGtWinner: "Team Maranello #88 - Tim Mullen / Jamie Davies",
        report: [
          "Magny-Cours 2003 var anden runde og bekræftede, at BMS ikke blot havde ramt Barcelona. På en teknisk fransk bane fungerede Ferrari 550 Maranello igen som bilen de andre skulle slå.",
          "N-GT-sejren til Team Maranello gav Ferrari 360 Modena en tidlig klassesejr i sæsonen."
        ]
      },
      {
        season: "2004",
        date: "2. maj 2004",
        event: "FIA GT Championship Magny-Cours",
        round: "Round 3",
        format: "500 km / 3 timer",
        gtWinner: "Vitaphone Racing Team #5 - Michael Bartels / Uwe Alzen",
        nGtWinner: "Freisinger Motorsport #99 - Lucas Luhr / Sascha Maassen",
        report: [
          "Magny-Cours 2004 blev et af de løb, hvor Vitaphones Saleen S7-R viste, at Ferrari ikke havde monopol på GT-klassens tempo.",
          "Freisingers N-GT-sejr passede til banens krav om gentagelighed. Porsche 996 GT3-RSR var stærk, når bremsezoner, traction og dækstyring skulle gentages uden store fejl."
        ]
      }
    ],
    famousStories: [
      {
        title: "Fransk Grand Prix-base",
        paragraphs: [
          "Magny-Cours' bredere ry kommer fra Formel 1-årene, men for GT-racing ligger værdien i dens tekniske renhed.",
          "Det er en bane, hvor et felt kan se tæt ud uden at være tilfældigt. Små forskelle i rotation, bremsebalance og exitfart bliver tydelige over en løbsdistance."
        ]
      }
    ],
    variantNotes: {
      "magny-cours-national": [
        "National-layoutet forkorter rytmen og gør Magny-Cours mere egnet til sprintløb.",
        "Det reducerer noget af GP-layoutets strategiske dybde, men øger presset i trafik."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: komplet officiel FIA GT Magny-Cours 2003/2004 race narrative med pitstop og neutraliseringer."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.rsc2004, fiaGtSources.speedsport2003, fiaGtSources.speedsport2004]
  },
  monza: {
    title: "Monza: topfart, chikaner og GT-politik",
    summary:
      "Monza er stadig topfartens store målestok, men i FIA GT-årene var den moderne bane med chikaner også en test af bremser, kerbs og klasseforskelle.",
    sections: [
      {
        title: "Mere end fuld gas",
        paragraphs: [
          "Autodromo Nazionale Monza åbnede i 1922 og er et af motorsportens ældste permanente anlæg. Banens ry er bundet til fart, men den moderne GTR2-version er ikke bare en lang motorvej med sving.",
          "Chikanerne gør Monza teknisk. En GT1-bil skal køre med lav vinge, men den skal stadig være stabil under hårde nedbremsninger til Rettifilo og Roggia. Hvis bilen er for løs, bliver topfartsfordelen hurtigt spist af fejl og dårlige exits.",
          "I multiclass-racing er Monza både let og svært. Straights giver plads til passeringer, men de store hastighedsforskelle ind i chikanerne skaber risiko. Den hurtige bil skal være færdig med overhalingen før indstyring, ikke halvvejs over kerbs."
        ]
      },
      {
        title: "Junior-layoutet som kontrast",
        paragraphs: [
          "Monza Junior er næsten en anden disciplin. Det korte layout fjerner meget af GP-banens topfartsrolle og gør bilen afhængig af rotation, gearing og lavfartsbalance.",
          "Til DGTL er det værdifuldt, fordi Monza dermed ikke kun er én type løb. GP-layoutet er slipstream og bremser; Junior er tæt trafik og rytme."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "19. oktober 2003",
        event: "FIA GT Championship Monza",
        round: "Round 10",
        format: "500 km",
        gtWinner: "BMS Scuderia Italia #22 - Fabrizio Gollin / Luca Cappellari",
        nGtWinner: "JMB Racing #52 - Andrea Bertolini / Fabrizio De Simone",
        report: [
          "Monza 2003 afsluttede FIA GT-sæsonen og passede naturligt til Ferrari-året. Et italiensk finaleløb med BMS-sejr er en stor del af den stemning, GTR2 bygger på.",
          "N-GT-sejren til JMB viser, at Monza ikke kun var GT1-topfart. De mindre biler skulle også kunne bremse hårdt, bruge slipstream og overleve kerbs."
        ]
      },
      {
        season: "2004",
        date: "28. marts 2004",
        event: "FIA GT Championship Monza",
        round: "Round 1",
        format: "500 km",
        gtWinner: "BMS Scuderia Italia #2 - Fabrizio Gollin / Luca Cappellari",
        nGtWinner: "Yukos Freisinger #50 - Stéphane Ortelli / Emmanuel Collard",
        report: [
          "Monza 2004 åbnede sæsonen med Gollin/Cappellari på toppen. Racing Sports Cars registrerer feltet som 23 startende og 14 klassificerede, hvilket siger noget om belastningen i et 500 km-løb på høj fart.",
          "Pole og hurtigste omgange lå i et tempo, hvor de store GT-biler stadig var voldsomme maskiner. For DGTL er Monza derfor en god test af, om en liga kan håndtere topfart uden at løbet bliver tilfældigt."
        ]
      }
    ],
    famousStories: [
      {
        title: "1971 og slipstream-logikken",
        paragraphs: [
          "Monza forbindes ofte med Italiens Grand Prix 1971, et af de tætteste topopgør i Formel 1-historien. Det var en anden biltype og en anden æra, men det forklarer Monzas varige tema: slipstream, positionering og timing.",
          "I GT-racing lever samme logik videre, men med tungere biler, større bremsebelastning og chikaner. Man kan vinde fart på langsiden og tabe løbet på næste kerb."
        ]
      }
    ],
    variantNotes: {
      "monza-junior": [
        "Junior-layoutet skal behandles som en selvstændig teknisk bane, ikke som et mini-Monza.",
        "Det er velegnet til kortere klubløb, men ikke som erstatning for GP-layoutets FIA GT-karakter."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: fuldt lap chart for FIA GT Monza 2003 og 2004."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.rsc2004, fiaGtSources.speedsport2003, fiaGtSources.speedsport2004, fiaGtSources.monza2004]
  },
  oschersleben: {
    title: "Oschersleben: kompakt bane, store konsekvenser",
    summary:
      "Oschersleben er en tysk teknisk bane, hvor placering på banen, trafik og rotation betyder mere end store topfartstal.",
    sections: [
      {
        title: "Hvorfor banen virker i GT",
        paragraphs: [
          "Motorsport Arena Oschersleben åbnede i 1997 og blev hurtigt en fast tysk base for touring cars og GT-racing. Banen er ikke lang, men den er meget brugbar for tætte felter, fordi den samler bilerne uden at blive ren gokartbane.",
          "For GT-biler er udfordringen lav- og mellemfartsbalance. En bil der ikke roterer, bliver fanget bag andre. En bil der roterer for aggressivt, ødelægger bagdæk og traction.",
          "I GTR2 er Oschersleben et godt sted at skelne mellem kvalifikationsfart og racefart. En hurtig omgang kan komme fra aggression. Et godt løb kræver, at bilen stadig er præcis efter gentagne accelerationer og defensive linjer."
        ]
      },
      {
        title: "Multiclass-udfordringen",
        paragraphs: [
          "Oschersleben er vanskelig i multiclass, fordi de korte straights reducerer tiden til at færdiggøre passeringer. Hurtigere biler skal læse exits, ikke bare kaste sig ind i bremsezoner.",
          "For en liga er banen god, fordi den fremtvinger disciplin. Den afslører hurtigt forskellen mellem pres og uforsvarlig kørsel."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "21. september 2003",
        event: "FIA GT Championship Oschersleben",
        round: "Round 8",
        format: "500 km",
        gtWinner: "BMS Scuderia Italia #23 - Thomas Biagi / Matteo Bobbi",
        nGtWinner: "JMB Racing #52 - Andrea Bertolini / Fabrizio De Simone",
        report: [
          "Oschersleben 2003 var endnu en BMS-sejr på en bane, der ikke burde reduceres til power. Det styrker billedet af Ferrari 550 som en komplet FIA GT-bil i 2003.",
          "N-GT-sejren til JMB passer til Oscherslebens tekniske karakter. Ferrari 360 Modena kunne udnytte balance og rotation på en bane, hvor ren motor ikke afgjorde alt."
        ]
      },
      {
        season: "2004",
        date: "19. september 2004",
        event: "FIA GT Championship Oschersleben",
        round: "Round 9",
        format: "500 km / 3 timer",
        gtWinner: "AF Corse #33 - Mika Salo / Andrea Bertolini",
        nGtWinner: "Freisinger Motorsport #99 - Lucas Luhr / Sascha Maassen",
        report: [
          "Oschersleben 2004 er værd at standse ved, fordi AF Corse vandt med Maserati MC12 kort efter bilens FIA GT-debut. Banen blev dermed et tydeligt punkt i skiftet fra Ferrari 550/Saleen-perioden til MC12-årene.",
          "Racing Sports Cars registrerer løbet som stoppet på 3-timersreglen efter et planlagt 500 km-format. Den detalje er værd at få med, for FIA GT-løbene var ofte styret af både distance og maksimal tid."
        ]
      }
    ],
    famousStories: [
      {
        title: "MC12-gennembruddet",
        paragraphs: [
          "Maserati MC12'ens sejr på Oschersleben i 2004 er banens store FIA GT-resultat. Det var ikke bare en sejr for et team, men et tegn på at seriens tekniske balance var ved at ændre sig.",
          "For DGTL er det værdifuldt, fordi Oschersleben ellers kan ligne en anonym teknisk bane. I resultatlisterne står den som et sted, hvor en ny biltype meldte sig ind i fronten."
        ]
      }
    ],
    variantNotes: {},
    researchGaps: [
      "Ikke bekræftet endnu: detaljeret officiel beskrivelse af MC12'ens løbsforløb på Oschersleben 2004."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.rsc2004, fiaGtSources.speedsport2003, fiaGtSources.speedsport2004, fiaGtSources.oschersleben2004]
  },
  spa: {
    title: "Spa i FIA GT-årene",
    summary:
      "Spa-Francorchamps fylder mest i GTR2s historiske univers. Her mødes sportsvognsracing, 24-timersløb, GT1/GT2/NGT og 2000ernes store GT-biler.",
    sections: [
      {
        title: "Hvorfor Spa er anderledes",
        paragraphs: [
          "Spa begyndte som en vejbaseret rute i Ardennerne og blev senere et moderne permanent anlæg uden at miste terræn og rytme. GTR2-udgaven bevarer Eau Rouge/Raidillon, Kemmel, Pouhon, Blanchimont og Bus Stop som de steder, der afgør omgangen.",
          "For GT-biler er Spa en komplet prøve. Den kræver topfart, aero-stabilitet, bremser, mod og dækstyring. En bil kan være hurtig i sektor et og stadig tabe løbet, hvis den slider dækkene gennem Pouhon eller bliver ustabil under nedbremsning til Bus Stop.",
          "Spa 24 Hours gør banen til noget andet end en hurtig omgang. Det bliver en hel dag med skiftende greb, trafik, nattimer, pitstrategi og mekanisk holdbarhed."
        ]
      },
      {
        title: "GTR2-læsning af Spa",
        paragraphs: [
          "I GTR2 er Spa fristende at angribe for hårdt. Eau Rouge/Raidillon kan få en kører til at jage mod, men den praktiske værdi ligger i exit mod Kemmel. En lille korrektion kan koste hele langsiden.",
          "Multiclass-racing er særligt krævende gennem de hurtige sektioner. En GT1-bil skal ikke forsøge at løse alle problemer midt i Pouhon eller Blanchimont. Den hurtige løsning er ofte at planlægge passeringen før svinget."
        ],
        bullets: [
          "Lav drag hjælper, men stabilitet over kompressioner er mere værd end et par km/t.",
          "Bus Stop og La Source er oplagte angrebspunkter, men exits afgør værdien.",
          "Vejr og rytme kan ændre et Spa-løb mere end ren omgangsfart."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2003",
        date: "26.-27. juli 2003",
        event: "Proximus 24 Spa",
        round: "Round 6",
        format: "24 timer",
        gtWinner: "BMS Scuderia Italia #22 - Fabrizio Gollin / Luca Cappellari / Enzo Calderari / Lilian Bryner",
        nGtWinner: "Freisinger Motorsport #50 - Marc Lieb / Stéphane Ortelli / Romain Dumas",
        report: [
          "Spa 2003 er et af de FIA GT-løb, der skal med, fordi en N-GT-bil vandt løbet samlet. Freisingers Porsche #50 med Lieb, Ortelli og Dumas står som den samlede vinder, mens BMS #22 vandt GT-klassen.",
          "Det er et sjældent resultat. 24-timersløb afgøres ikke kun af den hurtigste klasse på papiret. Holdbarhed, fejlrate, trafik og nattimer kan vende hierarkiet."
        ]
      },
      {
        season: "2004",
        date: "31. juli-1. august 2004",
        event: "Proximus 24 Spa",
        round: "Round 7",
        format: "24 timer",
        gtWinner: "BMS Scuderia Italia #2 - Fabrizio Gollin / Luca Cappellari / Enzo Calderari / Lilian Bryner",
        nGtWinner: "Yukos Freisinger #50 - Stéphane Ortelli / Emmanuel Collard / Romain Dumas",
        report: [
          "Spa 2004 var et stort FIA GT-udholdenhedsløb med national GT- og one-make-klasser blandet ind i feltet. Racing Sports Cars registrerer 51 tilmeldte og 42 startende biler.",
          "BMS #2 vandt samlet med Ferrari 550 Maranello. Det er også et af Lilian Bryners store FIA GT-resultater og en del af Ferrari 550'ernes bedste GT-år."
        ]
      }
    ],
    famousStories: [
      {
        title: "24-timersløbet som klasseblander",
        paragraphs: [
          "Spa 24 Hours samlede flere lag af GT-racing i samme løb: fabriksnære topbiler, stærke private teams, N-GT-biler og nationale klasser. Det gav et felt, som føltes større og mere levende end et rent sprintløb.",
          "For DGTL bør Spa derfor ikke bare være kalenderens flotte bane. Den bør være stedet, hvor ligaen viser om regler, klasser, teams og skins faktisk fungerer sammen over et stort arrangement."
        ]
      }
    ],
    variantNotes: {},
    researchGaps: [
      "Ikke bekræftet endnu: fulde stintdiagrammer for Spa 24 Hours 2003 og 2004. Næste skridt er officielle timingark eller arkiverede SRO/FIA GT dokumenter."
    ],
    sources: [fiaGtSources.rsc2003, fiaGtSources.rsc2004, fiaGtSources.speedsport2003, fiaGtSources.speedsport2004, fiaGtSources.spa2003, fiaGtSources.spa2004]
  },
  valencia: {
    title: "Ricardo Tormo: stadionbane med teknisk tålmodighed",
    summary:
      "Valencia er kompakt, publikumsvenlig og køres mod uret. Den kræver tålmodighed, frontgreb og en bil der kan rotere uden at ødelægge bagdækkene.",
    sections: [
      {
        title: "Stadionbanens karakter",
        paragraphs: [
          "Circuit Ricardo Tormo åbnede i 1999 og er især kendt fra motorcykelsport. For GT-biler er den interessant af andre grunde: mange sving kan ses fra tribunerne, og layoutet holder feltet samlet.",
          "Banen køres mod uret, hvilket ændrer belastningen på både bil og kører. De lange sekvenser skaber varme i dæk og gør det svært at skjule en ubalanceret bil.",
          "GTR2s Valencia-varianter giver tre niveauer af samme problem. Long/GP-layoutet er den mest komplette tekniske opgave, mens National komprimerer trafikken og gør løbet mere afbrudt."
        ]
      },
      {
        title: "GT-racing på Valencia",
        paragraphs: [
          "Valencia belønner ikke den mest brutale kører. Den belønner den, der kan holde fronten i live og få bilen vendt uden at miste traction. Det er især tydeligt i længere løb, hvor forhjulstemperatur bliver en begrænsning.",
          "I multiclass-løb er Valencia tæt. Hurtigere biler skal planlægge passeringer, fordi mange svingsekvenser ikke giver plads til improvisation."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2004",
        date: "18. april 2004",
        event: "FIA GT Championship Valencia",
        round: "Round 2",
        format: "500 km / 3 timer",
        gtWinner: "BMS Scuderia Italia #2 - Fabrizio Gollin / Luca Cappellari",
        nGtWinner: "Freisinger Motorsport #99 - Lucas Luhr / Sascha Maassen",
        report: [
          "Valencia 2004 fortsatte BMS' stærke start efter Monza. Det sætter sejren i relief, for Valencia er en helt anden type bane end Monza: mindre topfart, mere stadionrytme og flere tekniske sekvenser.",
          "N-GT-sejren til Luhr/Maassen bekræftede Freisingers rolle som klassens målestok i 2004."
        ]
      }
    ],
    famousStories: [
      {
        title: "Motorcykelbanen læst som GT-bane",
        paragraphs: [
          "Valencias ry er tæt knyttet til motorcykelsport, men banen fungerer også for GT-biler. Motorcykelbaggrunden forklarer både flowet og det publikumsvenlige stadiondesign.",
          "For DGTL er Valencia en god modvægt til Spa og Monza. Den flytter fokus fra topfart og store dramatiske sektioner til tålmodighed og gentagelig teknisk kørsel."
        ]
      }
    ],
    variantNotes: {
      "valencia-national": [
        "National-layoutet er den mest kompakte DGTL-udgave og gør trafik til en stor del af løbet."
      ],
      "valencia-long": [
        "Long-layoutet er den fulde tekniske udgave af Valencia-familien."
      ]
    },
    researchGaps: [
      "Ikke bekræftet endnu: detaljeret officiel FIA GT Valencia 2004 race report med pitstopforløb."
    ],
    sources: [fiaGtSources.rsc2004, fiaGtSources.speedsport2004]
  },
  zhuhai: {
    title: "Zhuhai og Kinas tidlige internationale GT-ambition",
    summary:
      "Zhuhai markerer Kinas tidlige permanente internationale motorsportsfase og er en ren GT-bane i praksis: straights, hårde stop og klare duelpunkter.",
    sections: [
      {
        title: "Før Shanghai blev symbolet",
        paragraphs: [
          "Zhuhai International Circuit åbnede i 1996 og blev Kinas første permanente internationale racerbane. Før Shanghai International Circuit blev det globale navn, var Zhuhai det første tydelige tegn på kinesiske ambitioner i international motorsport.",
          "Layoutet er mere funktionelt end spektakulært. Lange straights fører til hårde bremsezoner, og langsomme exits afgør hvor godt bilen kan forsvare eller angribe. Det gør banen velegnet til GT-racing, fordi forskellene mellem bilerne bliver tydelige uden at layoutet bliver uoverskueligt.",
          "I GTR2 er Zhuhai et godt sted for multiclass, hvis kørerne er disciplinerede. Hurtigere biler kan planlægge passeringer, men de skal stadig respektere bremsezonerne."
        ]
      },
      {
        title: "Teknisk profil",
        paragraphs: [
          "Zhuhai kræver stærk bremsebalance og traction. En bil der låser forhjulene, mister både apex og exit. En bil med dårlig baghjulskontrol bliver sårbar på de lange accelerationer.",
          "Banen virker enkel, men enkelheden gør fejl synlige. Hver dårlig exit kan måles direkte på næste straight."
        ]
      }
    ],
    fiaGtReports: [
      {
        season: "2004",
        date: "14. november 2004",
        event: "FIA GT Championship Zhuhai",
        round: "Round 11",
        format: "500 km / 3 timer",
        gtWinner: "AF Corse #33 - Mika Salo / Andrea Bertolini",
        nGtWinner: "G.P.C. Giesse #62 - Jaime Melo / Christian Pescatori",
        report: [
          "Zhuhai 2004 afsluttede sæsonen og gav AF Corse endnu en sejr med Maserati MC12. Dermed hører Zhuhai med i de første MC12-år, ikke bare som et fjernt kalenderpunkt.",
          "Racing Sports Cars registrerer varmt og fugtigt vejr, 29 startende og et løb stoppet på 3-timersreglen. Det understreger banens karakter som fysisk og mekanisk belastende afslutning på sæsonen."
        ]
      }
    ],
    famousStories: [
      {
        title: "Globaliseringen af GT-kalenderen",
        paragraphs: [
          "Zhuhai hører med, fordi banen viser FIA GT-seriens vej ud over den klassiske europæiske base. Sammen med Dubai viser den, hvordan GT-racing blev mere internationalt organiseret.",
          "For DGTL giver det banen en anden værdi end nostalgi. Zhuhai er ikke med fordi den er romantisk. Den var på kalenderen i de år, hvor serien flyttede sig uden for Europa."
        ]
      }
    ],
    variantNotes: {},
    researchGaps: [
      "Ikke bekræftet endnu: officielle detaljer om alle neutraliseringer og pitstrategier i Zhuhai 2004."
    ],
    sources: [fiaGtSources.rsc2004, fiaGtSources.speedsport2004, fiaGtSources.zhuhai2004]
  }
};

function dossierKey(trackId: string) {
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

function wordCount(dossier: TrackDossier) {
  const chunks = [
    dossier.title,
    dossier.summary,
    ...dossier.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? [])
    ]),
    ...dossier.fiaGtReports.flatMap((report) => [
      report.season,
      report.date,
      report.event,
      report.round,
      report.format,
      report.gtWinner,
      report.nGtWinner,
      ...report.report
    ]),
    ...dossier.famousStories.flatMap((story) => [story.title, ...story.paragraphs]),
    ...Object.values(dossier.variantNotes).flat(),
    ...dossier.researchGaps
  ];

  return chunks.join(" ").split(/\s+/).filter(Boolean).length;
}

function uniqueSources(sources: DossierSource[]) {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}

export function getTrackDossier(track: Gtr2Track) {
  const dossier = dossiers[dossierKey(track.id)];
  const variantNotes = dossier.variantNotes[track.id] ?? [
    `${track.name} bruger hoveddossieret for ${track.data.location}. Layoutspecifikke data er vist i faktafeltet ovenfor.`
  ];

  return {
    ...dossier,
    readingMinutes: Math.max(4, Math.ceil(wordCount(dossier) / 180)),
    variantNotes,
    sources: uniqueSources(dossier.sources)
  };
}
