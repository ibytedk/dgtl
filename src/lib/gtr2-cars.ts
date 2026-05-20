export type Gtr2CarClassId = "gt" | "ngt" | "g2" | "g3";

type CarSource = {
  label: string;
  url: string;
};

export type Gtr2Car = {
  id: string;
  name: string;
  slug: string;
  manufacturer: string;
  model: string;
  year: number;
  classId: Gtr2CarClassId;
  screenshotUrl: string | null;
  specs: {
    engine: string;
    power: string;
    weight: string;
    team: string;
    character: string;
  };
  artwork: {
    body: string;
    stripe: string;
    number: string;
  };
  history: string;
  sources: readonly CarSource[];
};

export type Gtr2SupportVehicle = {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  role: string;
  screenshotUrl: string | null;
  artwork: Gtr2Car["artwork"];
  history: string;
  sources: readonly CarSource[];
};

const igcdCatalogSource = {
  label: "IGCD GTR2-billiste",
  url: "https://www.igcd.net/game.php?id=10000202"
} as const;

const gtr2DataSource = {
  label: "GTR2 liste des voitures",
  url: "https://sites.fsa.ulaval.ca/personnel/paradisj/gtr2/GTR2%20liste%20des%20voitures.pdf"
} as const;

const igcdMaseratiCoupeSource = {
  label: "IGCD Maserati Coupé",
  url: "https://www.igcd.net/vehicle.php?id=7170"
} as const;

export const carCatalogSources = [igcdCatalogSource, gtr2DataSource] as const;

function car(input: Omit<Gtr2Car, "slug" | "screenshotUrl" | "sources"> & { slug?: string }): Gtr2Car {
  return {
    ...input,
    slug: input.slug ?? input.id,
    screenshotUrl: `/images/cars/${input.id}.png`,
    sources: carCatalogSources
  };
}

export const gtr2Cars = [
  car({
    id: "bmw-m-coupe-2003",
    name: "2003 BMW M Coupe",
    manufacturer: "BMW",
    model: "M Coupe",
    year: 2003,
    classId: "g3",
    specs: {
      engine: "3.2L inline-six",
      power: "380 hk @ 7400",
      weight: "1100 kg",
      team: "JMT Racing",
      character: "Kort akselafstand, lav masse og mere momentum end ren topfart."
    },
    artwork: { body: "#f4f7fb", stripe: "#4d7cff", number: "115" },
    history:
      "BMW M Coupe er GTR2-feltets kompakte BMW-indslag fra 2003-listen. Spildata placerer den i G3, hvor den fungerer som en mindre og mere mekanisk direkte kontrast til de store GT-biler."
  }),
  car({
    id: "bmw-m3-gtr-2004",
    name: "2004 BMW M3 GTR",
    manufacturer: "BMW",
    model: "M3 GTR",
    year: 2004,
    classId: "g2",
    specs: {
      engine: "4.0L V8",
      power: "500 hk @ 7800",
      weight: "1170 kg",
      team: "BMW Motorsport",
      character: "Hurtig respons, høj omdrejningsvillighed og stærk balance over kerbs."
    },
    artwork: { body: "#f7f7f2", stripe: "#1b4f9c", number: "142" },
    history:
      "M3 GTR er den V8-drevne E46-variant, som i GTR2 står udenfor hovedklasserne GT og nGT. Spillets 2004-data placerer den i G2 sammen med de kraftigere 24-timers- og specialbiler."
  }),
  car({
    id: "chevrolet-corvette-c5-r-2003",
    name: "2003 Chevrolet Corvette C5.R",
    manufacturer: "Chevrolet",
    model: "Corvette C5.R",
    year: 2003,
    classId: "g2",
    specs: {
      engine: "7.0L V8",
      power: "610 hk @ 6200",
      weight: "Ikke bekræftet endnu",
      team: "Excelsior",
      character: "Stor motor, stabil bremseplatform og meget moment ud af langsomme sving."
    },
    artwork: { body: "#f0c536", stripe: "#10131d", number: "106" },
    history:
      "C5.R er Chevrolets fabriksudviklede GT-racer fra perioden, men GTR2-listen bruger den som G2-bil i både 2003 og 2004. Vægten i den tilgængelige 2003-PDF fremstår fejlscannet, så den er markeret som ikke bekræftet."
  }),
  car({
    id: "chevrolet-corvette-c5-r-2004",
    name: "2004 Chevrolet Corvette C5.R",
    manufacturer: "Chevrolet",
    model: "Corvette C5.R",
    year: 2004,
    classId: "g2",
    specs: {
      engine: "7.0L V8",
      power: "610 hk @ 6200",
      weight: "1150 kg",
      team: "Excelsior",
      character: "Meget momentstærk og effektiv på baner med hårde accelerationer."
    },
    artwork: { body: "#ffd23f", stripe: "#1b1d24", number: "108" },
    history:
      "2004-udgaven fastholder C5.R som en G2-entry i GTR2. Den passer til 24-timerskonteksten i spillet: hurtig nok til at true GT-feltet, men ikke placeret i hovedklassens mesterskabsstruktur."
  }),
  car({
    id: "chrysler-viper-gts-r-2003",
    name: "2003 Chrysler Viper GTS-R",
    manufacturer: "Chrysler",
    model: "Viper GTS-R",
    year: 2003,
    classId: "gt",
    specs: {
      engine: "8.0L V10",
      power: "655 hk @ 6200",
      weight: "1100 kg",
      team: "Force One Festina",
      character: "Brutalt moment, enkel aero og høj fart ud af stop-start-sektioner."
    },
    artwork: { body: "#d72231", stripe: "#f4f4f4", number: "004" },
    history:
      "Viper GTS-R hører til blandt de store biler i FIA GT-årene før og omkring GTR2. 2003-bilen er den tunge V10-skole, som stadig kunne køre mod Ferrari, Lister og Saleen."
  }),
  car({
    id: "chrysler-viper-gts-r-2004",
    name: "2004 Chrysler Viper GTS-R",
    manufacturer: "Chrysler",
    model: "Viper GTS-R",
    year: 2004,
    classId: "gt",
    specs: {
      engine: "8.0L V10",
      power: "636 hk @ 6500",
      weight: "1100 kg",
      team: "Zwaan's Racing",
      character: "Stærk på kerbs og god i trafik, men tungere at holde ren over lange stints."
    },
    artwork: { body: "#c41224", stripe: "#ffffff", number: "009" },
    history:
      "2004-udgaven viser, at Viper stadig var en reel privatteam-bil i FIA GT, selv om Ferrari 550/575 og nye fabrikslignende programmer fyldte mere. GTR2 klassificerer den som GT."
  }),
  car({
    id: "dodge-viper-competition-coupe-2004",
    name: "2004 Dodge Viper Competition Coupe",
    manufacturer: "Dodge",
    model: "Viper Competition Coupe",
    year: 2004,
    classId: "g3",
    specs: {
      engine: "8.3L V10",
      power: "520 hk @ 5600",
      weight: "1165 kg",
      team: "US Carworld Racing",
      character: "Masser af motor i en lavere klasse, men mindre forfinet end GT-bilerne."
    },
    artwork: { body: "#1b5fa8", stripe: "#f7f7f7", number: "115" },
    history:
      "Competition Coupe er kundeversionen af Viper-konceptet og står i GTR2 som G3-bil. Den giver G3-feltet en usædvanligt motorstærk profil sammenlignet med Lotus, Gillet og Cup-Porsche."
  }),
  car({
    id: "ferrari-360-gtc-2004",
    name: "2004 Ferrari 360 GTC",
    manufacturer: "Ferrari",
    model: "360 GTC",
    year: 2004,
    classId: "ngt",
    specs: {
      engine: "3.6L V8",
      power: "460 hk @ 8750",
      weight: "1100 kg",
      team: "GPC Giesse Squadra Corse",
      character: "Høj omdrejning, præcis front og stærk fart i flydende sektioner."
    },
    artwork: { body: "#d31922", stripe: "#f0d66a", number: "062" },
    history:
      "360 GTC er den videreudviklede Ferrari i nGT-feltet og en direkte rival til Porsche 996 GT3-RS/RSR. I 2004-listen er den den stærkeste Ferrari 360-variant i GTR2."
  }),
  car({
    id: "ferrari-360-modena-2003",
    name: "2003 Ferrari 360 Modena",
    manufacturer: "Ferrari",
    model: "360 Modena",
    year: 2003,
    classId: "ngt",
    specs: {
      engine: "3.6L V8",
      power: "440 hk @ 8400",
      weight: "1100 kg",
      team: "JMB Racing",
      character: "Let rotation og høj kurvehastighed, men mindre moment end Porsche-rivalerne."
    },
    artwork: { body: "#c91721", stripe: "#ffffff", number: "052" },
    history:
      "360 Modena var Ferraris nGT-arbejdshest i 2003. Den hører til den mindre GT-klasse, hvor bilerne typisk handler mere om rytme, dæk og præcision end ren motorkraft."
  }),
  car({
    id: "ferrari-360-modena-2004",
    name: "2004 Ferrari 360 Modena",
    manufacturer: "Ferrari",
    model: "360 Modena",
    year: 2004,
    classId: "ngt",
    specs: {
      engine: "3.6L V8",
      power: "440 hk @ 8400",
      weight: "1100 kg",
      team: "Darro Motor Racing",
      character: "Stabil og teknisk, særligt god hvor minimumsfart betyder mere end topfart."
    },
    artwork: { body: "#e12a33", stripe: "#0f1119", number: "058" },
    history:
      "2004-udgaven holder 360 Modena i nGT-feltet, selv om 360 GTC og Porsche RSR markerer næste trin. Den er derfor en god referencebil for den ældre nGT-balance i GTR2."
  }),
  car({
    id: "ferrari-550-maranello-gts-2003",
    name: "2003 Ferrari 550 Maranello GTS",
    manufacturer: "Ferrari",
    model: "550 Maranello GTS",
    year: 2003,
    classId: "gt",
    specs: {
      engine: "6.0L V12",
      power: "630 hk @ 7200",
      weight: "1100 kg",
      team: "JMB Racing / BMS Scuderia Italia",
      character: "Frontmotor med stærk aero-balance og høj stabilitet under lang belastning."
    },
    artwork: { body: "#d81e2a", stripe: "#f4f4f4", number: "009" },
    history:
      "550 Maranello GTS er en nøglebil i 2003-sæsonens GT-historie. Den Prodrive-udviklede Ferrari blev referencepunktet for BMS Scuderia Italia og en af bilerne, der flyttede GT-klassen væk fra Viper-dominansen."
  }),
  car({
    id: "ferrari-550-maranello-gts-2004",
    name: "2004 Ferrari 550 Maranello GTS",
    manufacturer: "Ferrari",
    model: "550 Maranello GTS",
    year: 2004,
    classId: "gt",
    specs: {
      engine: "6.0L V12",
      power: "630 hk @ 7200",
      weight: "1100 kg",
      team: "BMS Scuderia Italia",
      character: "Meget komplet GT-bil: hurtig på langsider, stabil i hurtige sving og stærk over stints."
    },
    artwork: { body: "#cf1824", stripe: "#e7e9ef", number: "001" },
    history:
      "2004-udgaven fortsætter 550'erens rolle som GT-klassens målestok. I GTR2 er den en af de mest historisk centrale biler, fordi den binder spillets FIA GT-periode direkte til BMS' mesterskabsår."
  }),
  car({
    id: "ferrari-575-gtc-2003",
    name: "2003 Ferrari 575 GTC",
    manufacturer: "Ferrari",
    model: "575 GTC",
    year: 2003,
    classId: "gt",
    specs: {
      engine: "6.0L V12",
      power: "610 hk @ 6600",
      weight: "1100 kg",
      team: "JMB Racing",
      character: "Mere moderne Ferrari GT, men med mindre dokumenteret dominans end 550 GTS."
    },
    artwork: { body: "#b81220", stripe: "#f0c536", number: "009" },
    history:
      "575 GTC var Ferraris nyere kundevåben i GT-klassen. I perioden omkring GTR2 var den vigtig som efterfølger, men 550 GTS var fortsat bilen med den stærkeste mesterskabshistorik."
  }),
  car({
    id: "ferrari-575-gtc-2004",
    name: "2004 Ferrari 575 GTC",
    manufacturer: "Ferrari",
    model: "575 GTC",
    year: 2004,
    classId: "gt",
    specs: {
      engine: "6.0L V12",
      power: "610 hk @ 6600",
      weight: "1100 kg",
      team: "G.P.C. Giesse Squadra Corse",
      character: "Stærk V12-bil med god acceleration, men ikke helt samme rolige balance som 550."
    },
    artwork: { body: "#a6111d", stripe: "#ffffff", number: "011" },
    history:
      "2004-bilen placerer 575 GTC i den øverste GT-klasse ved siden af 550, Saleen, Lister og Murcielago. Den er historisk interessant, fordi den viser Ferraris parallelle GT-programmer i samme periode."
  }),
  car({
    id: "gillet-vertigo-streiff-2003",
    name: "2003 Gillet Vertigo Streiff",
    manufacturer: "Gillet",
    model: "Vertigo Streiff",
    year: 2003,
    classId: "g3",
    specs: {
      engine: "3.0L V6",
      power: "242 hk @ 6300",
      weight: "1030 kg",
      team: "Belgian Racing",
      character: "Lav vægt og særpræget balance, men begrænset motorkraft."
    },
    artwork: { body: "#0f8b8d", stripe: "#f2d15c", number: "100" },
    history:
      "Vertigo Streiff er en af de mest specielle biler i GTR2. Den virkelige FIA GT-historik knytter bilen til G2 for ikke-homologerede biler, mens den tilgængelige GTR2-datafil placerer 2003-udgaven i G3."
  }),
  car({
    id: "gillet-vertigo-streiff-2004",
    name: "2004 Gillet Vertigo Streiff",
    manufacturer: "Gillet",
    model: "Vertigo Streiff",
    year: 2004,
    classId: "g3",
    specs: {
      engine: "3.0L V6",
      power: "242 hk @ 6300",
      weight: "1030 kg",
      team: "Belgian Racing",
      character: "Små krav til bremserne, men kræver fart gennem svingene for at følge med."
    },
    artwork: { body: "#147f88", stripe: "#f3f0d1", number: "100" },
    history:
      "2004-Vertigoen er GTR2-feltets belgiske særling. Den er ikke hurtig på samme måde som en GT-bil, men den giver G3-klassen teknisk variation med lav vægt og anderledes køredynamik."
  }),
  car({
    id: "lamborghini-murcielago-r-gt-2003",
    name: "2003 Lamborghini Murcielago R-GT",
    manufacturer: "Lamborghini",
    model: "Murcielago R-GT",
    year: 2003,
    classId: "gt",
    specs: {
      engine: "6.0L V12",
      power: "610 hk @ 7000",
      weight: "1100 kg",
      team: "Reiter Engineering",
      character: "Midtmotor, bredt greb og krævende balance på indgang til langsomme sving."
    },
    artwork: { body: "#f28c28", stripe: "#10131d", number: "036" },
    history:
      "Murcielago R-GT bragte Lamborghinis V12-platform ind i GT-klassen via Reiter Engineering. I GTR2 giver den GT-feltet et midtmotoralternativ til Ferrari, Saleen og Viper."
  }),
  car({
    id: "lamborghini-murcielago-r-gt-2004",
    name: "2004 Lamborghini Murcielago R-GT",
    manufacturer: "Lamborghini",
    model: "Murcielago R-GT",
    year: 2004,
    classId: "gt",
    specs: {
      engine: "6.0L V12",
      power: "610 hk @ 7000",
      weight: "1100 kg",
      team: "DAMS",
      character: "Stærk højfartsstabilitet, men kræver disciplin ved nedbremsning og traction."
    },
    artwork: { body: "#e98924", stripe: "#ffffff", number: "024" },
    history:
      "2004-versionen viser Murcielago R-GT som en etableret, men stadig særpræget GT-bil i perioden. Dens rolle i GTR2 er at give GT-klassen en aggressiv midtmotorprofil."
  }),
  car({
    id: "lister-storm-gt-2003",
    name: "2003 Lister Storm GT",
    manufacturer: "Lister",
    model: "Storm GT",
    year: 2003,
    classId: "gt",
    specs: {
      engine: "7.0L V12",
      power: "595 hk @ 7400",
      weight: "1100 kg",
      team: "Creation Autosportif",
      character: "Lang, stabil og stærk ved høj fart, men fysisk i tætte chikaner."
    },
    artwork: { body: "#1c7f45", stripe: "#f2f2f2", number: "006" },
    history:
      "Lister Storm var en britisk veteran i FIA GT-feltet. I 2003-listen er den stadig en GT-bil med stor motor og lang akselafstand, tydeligt anderledes end de nyere Ferrari- og Lamborghini-programmer."
  }),
  car({
    id: "lister-storm-gt-2004",
    name: "2004 Lister Storm GT",
    manufacturer: "Lister",
    model: "Storm GT",
    year: 2004,
    classId: "gt",
    specs: {
      engine: "7.0L V12",
      power: "595 hk @ 7400",
      weight: "1100 kg",
      team: "Lister Racing",
      character: "God retningsstabilitet og kraftig motor, men mindre letbenet end de korte rivaler."
    },
    artwork: { body: "#176d3e", stripe: "#d9e8ef", number: "014" },
    history:
      "2004-udgaven markerer Stormens sene FIA GT-periode. Den er vigtig i GTR2, fordi den holder 1990ernes store frontmotor-GT-tradition synlig i et felt med stadig mere specialiserede biler."
  }),
  car({
    id: "lotus-motor-sport-elise-2003",
    name: "2003 Lotus Motor Sport Elise",
    manufacturer: "Lotus",
    model: "Motor Sport Elise",
    year: 2003,
    classId: "g3",
    specs: {
      engine: "1.8L inline-four",
      power: "200 hk @ 8200",
      weight: "700 kg",
      team: "Campus Automobile",
      character: "Meget let og præcis, men skal bære fart i stedet for at trække sig fri."
    },
    artwork: { body: "#f0cf37", stripe: "#1b7f43", number: "118" },
    history:
      "Lotus Elise er G3-feltets letteste bil i GTR2-dataene. Den har ikke motorkraften til at matche de større biler, men den forklarer tydeligt klassens rolle: lav vægt, teknik og momentum."
  }),
  car({
    id: "lotus-motor-sport-elise-2004",
    name: "2004 Lotus Motor Sport Elise",
    manufacturer: "Lotus",
    model: "Motor Sport Elise",
    year: 2004,
    classId: "g3",
    specs: {
      engine: "1.8L inline-four",
      power: "200 hk @ 8200",
      weight: "700 kg",
      team: "Campus Automobile",
      character: "Kræver rene linjer, tidlig rotation og mindst mulig farttab."
    },
    artwork: { body: "#e9c82f", stripe: "#0e6535", number: "116" },
    history:
      "2004-Elisen fastholder den rene G3-karakter. I multiclass-løb er den relevant, fordi den gør hastighedsforskellene mod GT og G2 meget tydelige."
  }),
  car({
    id: "maserati-mc12-gt1-2004",
    name: "2004 Maserati MC12 GT1",
    manufacturer: "Maserati",
    model: "MC12 GT1",
    year: 2004,
    classId: "gt",
    specs: {
      engine: "6.0L V12",
      power: "650 hk @ 7200",
      weight: "1270 kg",
      team: "AF Corse",
      character: "Meget stabil ved høj fart og stærk på baner med lange, hurtige belastninger."
    },
    artwork: { body: "#1f9fb8", stripe: "#ffffff", number: "033" },
    history:
      "MC12 kom ind i FIA GT sent i 2004 med AF Corse og blev straks en central bil i seriens næste kapitel. GTR2 placerer 2004-bilen i GT, selv om dens homologeringsstatus var et af tidens store diskussionspunkter."
  }),
  car({
    id: "morgan-aero-8-gtn-2003",
    name: "2003 Morgan Aero 8 GTN",
    manufacturer: "Morgan",
    model: "Aero 8 GTN",
    year: 2003,
    classId: "g2",
    specs: {
      engine: "4.7L V8",
      power: "460 hk @ 7000",
      weight: "1100 kg",
      team: "Aero Racing",
      character: "Smal, let og gammeldags i udtrykket, men med solid V8-trækkraft."
    },
    artwork: { body: "#315f4c", stripe: "#f3ead1", number: "107" },
    history:
      "Morgan Aero 8 GTN er en af GTR2-listens mere karakterfulde G2-biler. Den hører til blandt de mindre og mere særprægede 24-timersbiler, som giver spillets felt bredde ud over fabriksnære GT-programmer."
  }),
  car({
    id: "mosler-mt900r-2003",
    name: "2003 Mosler MT900R",
    manufacturer: "Mosler",
    model: "MT900R",
    year: 2003,
    classId: "g2",
    specs: {
      engine: "5.7L V8",
      power: "438 hk @ 6200",
      weight: "1100 kg",
      team: "Rollcentre Racing",
      character: "Lav silhuet, midtmotorbalance og god effektivitet gennem hurtige sving."
    },
    artwork: { body: "#1d232f", stripe: "#f0c536", number: "101" },
    history:
      "Mosler MT900R var et let, aerodynamisk GT-alternativ fra den private ende af sportsvognsracing. I GTR2 er den en G2-bil og passer særligt godt til tekniske baner, hvor effektivitet betyder mere end rå hk."
  }),
  car({
    id: "nissan-350z-2004",
    name: "2004 Nissan 350Z",
    manufacturer: "Nissan",
    model: "350Z",
    year: 2004,
    classId: "ngt",
    specs: {
      engine: "3.5L V6",
      power: "430 hk @ 7000",
      weight: "1100 kg",
      team: "RJN Motorsport",
      character: "Forudsigelig frontmotorbil med god bremsebalance og moderat topfart."
    },
    artwork: { body: "#f47a2a", stripe: "#20242f", number: "085" },
    history:
      "350Z giver nGT-klassen et japansk indslag i 2004-listen. Den er mindre ekstrem end GT-bilerne og står i GTR2 som en mere jordnær konkurrent til Ferrari 360 og Porsche 996 GT3."
  }),
  car({
    id: "porsche-911-biturbo-2003",
    name: "2003 Porsche 911 Biturbo",
    manufacturer: "Porsche",
    model: "911 Biturbo",
    year: 2003,
    classId: "g2",
    specs: {
      engine: "3.6L flat-six biturbo",
      power: "520 hk @ 6250",
      weight: "1200 kg",
      team: "AD Sport",
      character: "Turbo-moment og bagmotortraktion, men kræver rolig gas på exit."
    },
    artwork: { body: "#d8dde6", stripe: "#1d232f", number: "102" },
    history:
      "911 Biturbo er GTR2's G2-Porsche med mere effekt end Cup- og RS-bilerne. Den placerer sig mellem den egentlige GT-klasse og de lettere Porsche nGT-biler."
  }),
  car({
    id: "porsche-911-biturbo-2004",
    name: "2004 Porsche 911 Biturbo",
    manufacturer: "Porsche",
    model: "911 Biturbo",
    year: 2004,
    classId: "g2",
    specs: {
      engine: "3.6L flat-six biturbo",
      power: "520 hk @ 6250",
      weight: "1200 kg",
      team: "PSI Motorsport",
      character: "Stærk ud af hårnåle og langsomme sving, men tungere over en hel omgang."
    },
    artwork: { body: "#cfd6df", stripe: "#e21a22", number: "103" },
    history:
      "2004-versionen fortsætter Biturboens rolle som G2-bil. I spillets klassebillede er den en nyttig mellemklasse-Porsche, ikke en del af nGT-duellen mellem GT3-RS/RSR og Ferrari 360."
  }),
  car({
    id: "porsche-911-gt2-2003",
    name: "2003 Porsche 911 GT2",
    manufacturer: "Porsche",
    model: "911 GT2",
    year: 2003,
    classId: "gt",
    specs: {
      engine: "3.6L flat-six turbo",
      power: "605 hk @ 6250",
      weight: "1130 kg",
      team: "Proton Competition",
      character: "Kraftig turbo-Porsche med høj fart, men krævende bagende under belastning."
    },
    artwork: { body: "#f0f2f5", stripe: "#e21a22", number: "012" },
    history:
      "911 GT2 viderefører den ældre turbo-Porsche-tradition i GT-klassen. I 2003-listen står den som en topklassebil, adskilt fra de senere 996 GT3-varianter i nGT og G3."
  }),
  car({
    id: "porsche-911-gt3-cup-2003",
    name: "2003 Porsche 911 GT3 Cup",
    manufacturer: "Porsche",
    model: "911 GT3 Cup",
    year: 2003,
    classId: "g3",
    specs: {
      engine: "3.6L flat-six",
      power: "450 hk @ 8250",
      weight: "1100 kg",
      team: "Freisinger Motorsport",
      character: "Cup-bil med enkel aero, stærke bremser og meget tydelig bagmotorbalance."
    },
    artwork: { body: "#f5f5f1", stripe: "#2f7ed8", number: "051" },
    history:
      "GT3 Cup er Porsches mere basisprægede racer i GTR2. Den ligger i G3 i 2003-dataene og fungerer som kontrast til de mere udviklede GT3-RS og RSR i nGT."
  }),
  car({
    id: "porsche-911-gt3-cup-2004",
    name: "2004 Porsche 911 GT3 Cup",
    manufacturer: "Porsche",
    model: "911 GT3 Cup",
    year: 2004,
    classId: "g3",
    specs: {
      engine: "3.6L flat-six",
      power: "390 hk @ 7200",
      weight: "1150 kg",
      team: "Signa Racing",
      character: "Stabil og ærlig, men uden nGT-bilernes ekstra greb og motor."
    },
    artwork: { body: "#f8f8f2", stripe: "#1b1d24", number: "111" },
    history:
      "2004-Cup-bilen holder G3-klassen tæt på one-make-racingens logik. Den er vigtig i GTR2, fordi den giver en naturlig trædesten op mod GT3-RS og GT3-RSR."
  }),
  car({
    id: "porsche-911-gt3-rs-2003",
    name: "2003 Porsche 911 GT3-RS",
    manufacturer: "Porsche",
    model: "911 GT3-RS",
    year: 2003,
    classId: "ngt",
    specs: {
      engine: "3.6L flat-six",
      power: "450 hk @ 8250",
      weight: "1100 kg",
      team: "Freisinger Motorsport",
      character: "Meget stærk under nedbremsning og stabil over lange nGT-stints."
    },
    artwork: { body: "#f7f7f2", stripe: "#d8242f", number: "050" },
    history:
      "GT3-RS er en af nGT-klassens referencebiler i 2003. Den er tæt knyttet til Freisinger Motorsport-perioden og den Porsche/Ferrari-duel, som definerer den lille FIA GT-klasse i GTR2."
  }),
  car({
    id: "porsche-911-gt3-rs-2004",
    name: "2004 Porsche 911 GT3-RS",
    manufacturer: "Porsche",
    model: "911 GT3-RS",
    year: 2004,
    classId: "ngt",
    specs: {
      engine: "3.6L flat-six",
      power: "450 hk @ 8250",
      weight: "1100 kg",
      team: "AB Motorsport",
      character: "Let at placere, stærk over kerbs og god til dækstyring."
    },
    artwork: { body: "#efefea", stripe: "#1b5fa8", number: "056" },
    history:
      "2004-udgaven af GT3-RS er stadig nGT, selv om GT3-RSR bliver klassens skarpere Porsche. Den er en stabil og historisk korrekt del af GTR2's Porsche-tyngdepunkt."
  }),
  car({
    id: "porsche-911-gt3-rsr-2004",
    name: "2004 Porsche 911 GT3-RSR",
    manufacturer: "Porsche",
    model: "911 GT3-RSR",
    year: 2004,
    classId: "ngt",
    specs: {
      engine: "3.6L flat-six",
      power: "457 hk @ 8250",
      weight: "1100 kg",
      team: "Freisinger Motorsport",
      character: "Den skarpeste nGT-Porsche i 2004: stærke bremser, stabil bagende og god stint-fart."
    },
    artwork: { body: "#ffffff", stripe: "#111827", number: "050" },
    history:
      "GT3-RSR er Porsches videreudviklede nGT-våben i 2004-listen. Den står i GTR2 som den mest komplette Porsche i den mindre klasse og som direkte modstander til Ferrari 360 GTC."
  }),
  car({
    id: "saleen-s7-r-2003",
    name: "2003 Saleen S7-R",
    manufacturer: "Saleen",
    model: "S7-R",
    year: 2003,
    classId: "gt",
    specs: {
      engine: "7.0L V8",
      power: "620 hk @ 6400",
      weight: "1200 kg",
      team: "Konrad Motorsport",
      character: "Lav, bred og stærk på høj fart, men fysisk i langsomme kombinationer."
    },
    artwork: { body: "#243c5a", stripe: "#f0c536", number: "002" },
    history:
      "Saleen S7-R var det amerikanske midtmotorindslag i GT-klassen. I 2003 står den som et seriøst alternativ til Ferrari 550, Viper og Lister i GTR2's topfelt."
  }),
  car({
    id: "saleen-s7-r-2004",
    name: "2004 Saleen S7-R",
    manufacturer: "Saleen",
    model: "S7-R",
    year: 2004,
    classId: "gt",
    specs: {
      engine: "7.0L V8",
      power: "620 hk @ 6400",
      weight: "1200 kg",
      team: "Konrad Motorsport",
      character: "Høj topfart og effektiv aero, men kræver tålmodighed i tæt trafik."
    },
    artwork: { body: "#1d3557", stripe: "#f4d35e", number: "004" },
    history:
      "2004-Saleenen fastholder S7-R som en GT-klassebil med stort potentiale på hurtige baner. Den er en af bilerne, der gør GTR2's GT-felt bredere end Ferrari mod Viper."
  }),
  car({
    id: "seat-toledo-gt-2003",
    name: "2003 Seat Toledo GT",
    manufacturer: "SEAT",
    model: "Toledo GT",
    year: 2003,
    classId: "g2",
    specs: {
      engine: "3.0L V6 turbo",
      power: "510 hk @ 6300",
      weight: "1150 kg",
      team: "Darro Motorsport",
      character: "Særpræget GT-entry med midtmotorlayout og mere kompakt format."
    },
    artwork: { body: "#f0c536", stripe: "#d8242f", number: "103" },
    history:
      "Toledo GT er et af de mest usædvanlige navne i GTR2's G2-klasse. Spillets 2003-data placerer den som G2 med V6 turbo, hvilket gør den til en tydelig specialbil i kataloget."
  }),
  car({
    id: "tvr-t400r-2004",
    name: "2004 TVR T400R",
    manufacturer: "TVR",
    model: "T400R",
    year: 2004,
    classId: "ngt",
    specs: {
      engine: "4.0L inline-six",
      power: "440 hk @ 7000",
      weight: "1100 kg",
      team: "RSR Motorsport",
      character: "Frontmotor-nGT med god lyd, enkel balance og krav om præcis indstyring."
    },
    artwork: { body: "#6f3fb5", stripe: "#f0c536", number: "153" },
    history:
      "TVR T400R giver nGT-klassen britisk variation i 2004-listen. Den er ikke den dominerende nGT-reference, men den er vigtig for GTR2-feltets bredde og periodens private GT-kultur."
  })
] as const;

export const gtr2SupportVehicles = [
  {
    id: "maserati-coupe-safety-car",
    name: "Maserati Coupé",
    manufacturer: "Maserati",
    model: "Coupé",
    role: "Unplayable / support vehicle",
    screenshotUrl: "/images/cars/maserati-coupe-safety-car.png",
    artwork: { body: "#27364a", stripe: "#d7dde6", number: "SC" },
    history:
      "IGCD registrerer Maserati Coupé på GTR2-siden, men som unplayable vehicle med coupe-klasse. Den er derfor vist separat og ikke lagt ind som GT, nGT, G2 eller G3-racer.",
    sources: [igcdMaseratiCoupeSource]
  }
] as const satisfies readonly Gtr2SupportVehicle[];
