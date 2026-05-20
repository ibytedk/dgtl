type TrackSource = {
  label: string;
  url: string;
};

export type Gtr2Track = {
  id: string;
  name: string;
  slug: string;
  country: string;
  lengthKm: number;
  screenshotUrl: string;
  data: {
    layout: string;
    era: string;
    location: string;
    direction: "Med uret" | "Mod uret";
    corners: number | null;
    setupFocus: string;
    history: string;
    anecdote: string;
    sources: TrackSource[];
  };
};

const sources = {
  anderstorp: "https://www.racingcircuits.info/europe/sweden/anderstorp.html",
  barcelona: "https://www.racingcircuits.info/europe/spain/circuit-de-barcelona-catalunya.html",
  brno: "https://www.racingcircuits.info/europe/czech-republic/brno.html",
  donington: "https://www.racingcircuits.info/europe/united-kingdom/donington-park.html",
  dubai: "https://www.racingcircuits.info/middle-east/united-arab-emirates/dubai-autodrome.html",
  enna: "https://www.racingcircuits.info/europe/italy/enna-pergusa.html",
  estoril: "https://www.racingcircuits.info/europe/portugal/estoril.html",
  hockenheim: "https://www.racingcircuits.info/europe/germany/hockenheimring.html",
  imola: "https://www.racingcircuits.info/europe/italy/imola.html",
  magnyCours: "https://www.racingcircuits.info/europe/france/magny-cours.html",
  monza: "https://www.racingcircuits.info/europe/italy/monza.html",
  oschersleben: "https://www.racingcircuits.info/europe/germany/oschersleben.html",
  spa: "https://www.racingcircuits.info/europe/belgium/spa-francorchamps.html",
  valencia: "https://www.racingcircuits.info/europe/spain/valencia-ricardo-tormo.html",
  zhuhai: "https://www.racingcircuits.info/asia/china/zhuhai.html"
} as const;

const officialSources: Record<string, TrackSource> = {
  [sources.anderstorp]: { label: "Scandinavian Raceway", url: "https://www.scandinavianraceway.se/en/" },
  [sources.barcelona]: { label: "Circuit de Barcelona-Catalunya", url: "https://www.circuitcat.com/en/" },
  [sources.brno]: { label: "Automotodrom Brno", url: "https://www.automotodrombrno.cz/cz/" },
  [sources.donington]: { label: "Donington Park", url: "https://www.donington-park.co.uk/" },
  [sources.dubai]: { label: "Dubai Autodrome", url: "https://dubaiautodrome.ae/" },
  [sources.enna]: { label: "Autodromo di Pergusa", url: "https://www.autodromopergusa.it/" },
  [sources.estoril]: { label: "Circuito do Estoril", url: "https://www.circuito-estoril.pt/" },
  [sources.hockenheim]: { label: "Hockenheimring", url: "https://www.hockenheimring.de/en/" },
  [sources.imola]: { label: "Autodromo Imola", url: "https://www.autodromoimola.it/" },
  [sources.magnyCours]: { label: "Circuit de Nevers Magny-Cours", url: "https://www.circuitmagnycours.com/" },
  [sources.monza]: { label: "Autodromo Nazionale Monza", url: "https://www.monzanet.it/en/" },
  [sources.oschersleben]: { label: "Motorsport Arena Oschersleben", url: "https://www.motorsportarena.com/" },
  [sources.spa]: { label: "Circuit de Spa-Francorchamps", url: "https://www.spa-francorchamps.be/" },
  [sources.valencia]: { label: "Circuit Ricardo Tormo", url: "https://www.circuitricardotormo.com/" },
  [sources.zhuhai]: { label: "Zhuhai International Circuit", url: "https://www.zic.com.cn/" }
};

const crossCheckSources: TrackSource[] = [
  { label: "LapMeta track database", url: "https://www.lapmeta.com/en/track" },
  {
    label: "IGCD in-game circuit screenshots",
    url: "https://www.igcd.net/game.php?id=10000202&type=circuits"
  },
  { label: "Wikimedia Commons track maps", url: "https://commons.wikimedia.org/" },
  { label: "World Race Circuits", url: "https://worldracecircuits.com/" },
  {
    label: "Wikipedia track index",
    url: "https://en.wikipedia.org/wiki/List_of_motor_racing_tracks"
  }
];

function image(slug: string) {
  return `/images/tracks/${slug}.svg`;
}

function racingCircuits(url: string): TrackSource[] {
  return [
    { label: "RacingCircuits.info", url },
    officialSources[url],
    ...crossCheckSources
  ].filter(Boolean);
}

export const gtr2Tracks = [
  {
    id: "anderstorp-2003",
    name: "Anderstorp 2003",
    slug: "anderstorp-2003",
    country: "Sverige",
    lengthKm: 4.025,
    screenshotUrl: image("anderstorp-2003"),
    data: {
      layout: "Grand Prix Circuit",
      era: "1998-2006",
      location: "Scandinavian Raceway, Anderstorp",
      direction: "Med uret",
      corners: 8,
      setupFocus: "Lav drag til flyveplads-straights, men nok mekanisk greb til de lange, flade højresving.",
      history: "Anderstorp blev bygget på en tidligere flyveplads og gav Sverige sin Formel 1 Grand Prix-periode i 1970erne.",
      anecdote: "Brabhams fan car vandt sit eneste Grand Prix på Anderstorp i 1978, før konceptet blev trukket tilbage.",
      sources: racingCircuits(sources.anderstorp)
    }
  },
  {
    id: "anderstorp-south",
    name: "Anderstorp South",
    slug: "anderstorp-south",
    country: "Sverige",
    lengthKm: 2.0,
    screenshotUrl: image("anderstorp-south"),
    data: {
      layout: "South Circuit",
      era: "1998-2006",
      location: "Scandinavian Raceway, Anderstorp",
      direction: "Med uret",
      corners: null,
      setupFocus: "Kortere gearing, aggressiv rotation og god traction ud af langsomme sving.",
      history: "South-layoutet bruger den kompakte del af Anderstorp og gør banen mere sprint-orienteret end GP-sløjfen.",
      anecdote: "Fordi banen er født af en flyveplads, føles selv den korte version usædvanligt bred og åben.",
      sources: racingCircuits(sources.anderstorp)
    }
  },
  {
    id: "barcelona-2003",
    name: "Barcelona 2003",
    slug: "barcelona-2003",
    country: "Spanien",
    lengthKm: 4.73,
    screenshotUrl: image("barcelona-2003"),
    data: {
      layout: "Grand Prix Circuit",
      era: "1995-2003",
      location: "Circuit de Barcelona-Catalunya, Montmeló",
      direction: "Med uret",
      corners: 13,
      setupFocus: "Aerodynamisk stabilitet gennem lange højresving og god front i de tekniske sektorer.",
      history: "Circuit de Barcelona-Catalunya åbnede i 1991 og blev hurtigt standard-testbane for internationale topserier.",
      anecdote: "Michael Schumacher kørte store dele af Spaniens GP 1994 fastlåst i femte gear og endte stadig på podiet.",
      sources: racingCircuits(sources.barcelona)
    }
  },
  {
    id: "barcelona-national",
    name: "Barcelona National",
    slug: "barcelona-national",
    country: "Spanien",
    lengthKm: 3.069,
    screenshotUrl: image("barcelona-national"),
    data: {
      layout: "National Circuit",
      era: "1995-2003",
      location: "Circuit de Barcelona-Catalunya, Montmeló",
      direction: "Med uret",
      corners: null,
      setupFocus: "Mere acceleration end topfart; prioritér bremsebalance og hurtig retningændring.",
      history: "National-layoutet skærer GP-banen ned til en mere kompakt klub- og testkonfiguration.",
      anecdote: "Barcelona var i mange år den bane, hvor teams kunne måle om en bil var stærk overalt.",
      sources: racingCircuits(sources.barcelona)
    }
  },
  {
    id: "brno-2003",
    name: "Brno 2003",
    slug: "brno-2003",
    country: "Tjekkiet",
    lengthKm: 5.403,
    screenshotUrl: image("brno-2003"),
    data: {
      layout: "Automotodrom Brno",
      era: "1996-nu",
      location: "Masaryk Circuit, Brno",
      direction: "Med uret",
      corners: 14,
      setupFocus: "Stabil bil i lange camber-sving, kontrolleret dæktemperatur og stærk traction op ad bakke.",
      history: "Brnos moderne permanente bane åbnede i 1987 som afløser for den lange Masaryk landevejsrute.",
      anecdote: "Den gamle Masaryk-ring løb gennem landsbyer og var over 29 km lang før den moderne bane tog over.",
      sources: racingCircuits(sources.brno)
    }
  },
  {
    id: "brno-2004",
    name: "Brno 2004",
    slug: "brno-2004",
    country: "Tjekkiet",
    lengthKm: 5.403,
    screenshotUrl: image("brno-2004"),
    data: {
      layout: "Automotodrom Brno",
      era: "1996-nu",
      location: "Masaryk Circuit, Brno",
      direction: "Med uret",
      corners: 14,
      setupFocus: "Hold bilen rolig over crest og undgå for meget bagvognsslid i de lange højfartsbuer.",
      history: "Brno var fast stop for internationale GT- og motorcykelserier i GTR2-årene.",
      anecdote: "Banens konstante højdeforskelle gør den til en af de klassiske setup-prøver i GTR2.",
      sources: racingCircuits(sources.brno)
    }
  },
  {
    id: "donington-park-2003",
    name: "Donington Park 2003",
    slug: "donington-park-2003",
    country: "England",
    lengthKm: 4.02,
    screenshotUrl: image("donington-park-2003"),
    data: {
      layout: "Grand Prix Circuit",
      era: "1986-2009",
      location: "Donington Park, Leicestershire",
      direction: "Med uret",
      corners: 12,
      setupFocus: "Blød kerb-håndtering til chikanen og præcis front gennem Craner Curves.",
      history: "Donington var en førkrigsbane, der blev genoplivet af Tom Wheatcroft efter årtier uden racing.",
      anecdote: "Ayrton Sennas første omgang i European GP 1993 er stadig en af banens mest berømte historier.",
      sources: racingCircuits(sources.donington)
    }
  },
  {
    id: "donington-park-2004",
    name: "Donington Park 2004",
    slug: "donington-park-2004",
    country: "England",
    lengthKm: 4.02,
    screenshotUrl: image("donington-park-2004"),
    data: {
      layout: "Grand Prix Circuit",
      era: "1986-2009",
      location: "Donington Park, Leicestershire",
      direction: "Med uret",
      corners: 12,
      setupFocus: "Stabilitet under trail braking ind i Melbourne Hairpin og stærk exit fra Goddards.",
      history: "GP-layoutet tilføjer Melbourne Loop til den flydende nationalbane og giver flere hårde bremsezoner.",
      anecdote: "GT-biler ser ekstra dramatiske ud her, fordi banen skifter fra flydende bakker til stop-start hårnåle.",
      sources: racingCircuits(sources.donington)
    }
  },
  {
    id: "donington-park-national",
    name: "Donington Park National",
    slug: "donington-park-national",
    country: "England",
    lengthKm: 3.149,
    screenshotUrl: image("donington-park-national"),
    data: {
      layout: "National Circuit",
      era: "1986-2009",
      location: "Donington Park, Leicestershire",
      direction: "Med uret",
      corners: 10,
      setupFocus: "Flow, commitment og en bil der kan angribe Craner Curves uden nervøs bagende.",
      history: "National-layoutet er Doningtons hurtige kerne uden Melbourne Loop.",
      anecdote: "Craner Curves er et af de steder, hvor en lille lift kan føles som et helt tabt sekund.",
      sources: racingCircuits(sources.donington)
    }
  },
  {
    id: "dubai-club",
    name: "Dubai Club",
    slug: "dubai-club",
    country: "UAE",
    lengthKm: 2.46,
    screenshotUrl: image("dubai-club"),
    data: {
      layout: "Club Circuit",
      era: "2004-nu",
      location: "Dubai Autodrome, Dubailand",
      direction: "Med uret",
      corners: null,
      setupFocus: "Kort gearing, bremsekøling og traction ud af de langsomme tekniske sving.",
      history: "Dubai Autodrome åbnede i 2004 som et af Mellemøstens første moderne FIA-grade anlæg.",
      anecdote: "Club-layoutet viser hvor fleksibelt anlægget er, fordi flere baner kan køres uden at bruge hele GP-sløjfen.",
      sources: racingCircuits(sources.dubai)
    }
  },
  {
    id: "dubai-2004",
    name: "Dubai 2004",
    slug: "dubai-2004",
    country: "UAE",
    lengthKm: 5.39,
    screenshotUrl: image("dubai-2004"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2004-nu",
      location: "Dubai Autodrome, Dubailand",
      direction: "Med uret",
      corners: 16,
      setupFocus: "Lang straightline-effektivitet, stærke bremser og stabilitet i ørkenbanens hurtige retningsskift.",
      history: "GP-layoutet blev brugt til Dubai Autodromes internationale lancering i 2004.",
      anecdote: "I GTR2 føles Dubai som en tidskapsel fra den periode, hvor FIA GT begyndte at rykke udenfor Europa.",
      sources: racingCircuits(sources.dubai)
    }
  },
  {
    id: "dubai-international",
    name: "Dubai International",
    slug: "dubai-international",
    country: "UAE",
    lengthKm: 4.29,
    screenshotUrl: image("dubai-international"),
    data: {
      layout: "International Circuit",
      era: "2004-nu",
      location: "Dubai Autodrome, Dubailand",
      direction: "Med uret",
      corners: null,
      setupFocus: "Balancér mellem topfart og rotation, da layoutet beholder flere hurtige partier.",
      history: "International-konfigurationen er mellemvejen mellem Dubai GP-layoutet og de korte klubbaner.",
      anecdote: "Banen blev designet med flere samtidige konfigurationer, så test, klubracing og internationale løb kunne dele anlægget.",
      sources: racingCircuits(sources.dubai)
    }
  },
  {
    id: "dubai-national",
    name: "Dubai National",
    slug: "dubai-national",
    country: "UAE",
    lengthKm: 3.56,
    screenshotUrl: image("dubai-national"),
    data: {
      layout: "National Circuit",
      era: "2004-nu",
      location: "Dubai Autodrome, Dubailand",
      direction: "Med uret",
      corners: null,
      setupFocus: "Mere downforce end GP-layoutet og skarp bremsebalance til de korte accelerationer.",
      history: "National-layoutet bruges til kortere raceformater og holder stadig Dubai-banens moderne stop-start-karakter.",
      anecdote: "Layoutet gør Dubai mere intens, fordi de lange pauser mellem duellerne forsvinder.",
      sources: racingCircuits(sources.dubai)
    }
  },
  {
    id: "enna-pergusa-2003",
    name: "Enna Pergusa 2003",
    slug: "enna-pergusa-2003",
    country: "Italien",
    lengthKm: 4.95,
    screenshotUrl: image("enna-pergusa-2003"),
    data: {
      layout: "Autodromo di Pergusa",
      era: "1995-2004",
      location: "Pergusa-søen, Sicilien",
      direction: "Med uret",
      corners: null,
      setupFocus: "Meget lav drag, høj bremsekøling og stabil bil over chikanernes kerbs.",
      history: "Enna-Pergusa går rundt om Pergusa-søen og er kendt for lange straights afbrudt af chikaner.",
      anecdote: "Banen ligger midt i et naturreservat, hvilket gør den til et af motorsportens mest særprægede steder.",
      sources: racingCircuits(sources.enna)
    }
  },
  {
    id: "estoril-2003",
    name: "Estoril 2003",
    slug: "estoril-2003",
    country: "Portugal",
    lengthKm: 4.182,
    screenshotUrl: image("estoril-2003"),
    data: {
      layout: "Grand Prix Circuit",
      era: "1999-2006",
      location: "Autódromo do Estoril, Cascais",
      direction: "Med uret",
      corners: 13,
      setupFocus: "God traction ud af langsomme sving og nok frontgreb til den lange Parabolica Interior.",
      history: "Estoril åbnede i 1972 og var Portugals Grand Prix-hjem i Formel 1 fra 1984 til 1996.",
      anecdote: "Ayrton Senna tog sin første Formel 1-sejr på Estoril i regnvejret i 1985.",
      sources: racingCircuits(sources.estoril)
    }
  },
  {
    id: "hockenheim-2004",
    name: "Hockenheim 2004",
    slug: "hockenheim-2004",
    country: "Tyskland",
    lengthKm: 4.574,
    screenshotUrl: image("hockenheim-2004"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2002-nu",
      location: "Hockenheimring, Baden-Württemberg",
      direction: "Med uret",
      corners: 17,
      setupFocus: "Bremsemod og traction ind/ud af hårnålen, men stadig effektiv aero gennem Motodrom.",
      history: "Hockenheim blev markant ombygget i 2002, hvor de lange skovstraights blev erstattet af en kortere stadionbane.",
      anecdote: "Rubens Barrichello vandt her i 2000 fra 18. startplacering i et løb med både regn og safety drama.",
      sources: racingCircuits(sources.hockenheim)
    }
  },
  {
    id: "hockenheim-national",
    name: "Hockenheim National",
    slug: "hockenheim-national",
    country: "Tyskland",
    lengthKm: 3.692,
    screenshotUrl: image("hockenheim-national"),
    data: {
      layout: "National Circuit",
      era: "2002-nu",
      location: "Hockenheimring, Baden-Württemberg",
      direction: "Med uret",
      corners: null,
      setupFocus: "Kortere gearing og mere fokus på Motodrom-flow end på den lange GP-straight.",
      history: "National-layoutet bruger Hockenheims moderne stadionkarakter i en kortere løbsdistance.",
      anecdote: "Motodrom-sektionen er berømt for at føles som en arena, hvor publikum sidder tæt på bilerne.",
      sources: racingCircuits(sources.hockenheim)
    }
  },
  {
    id: "hockenheim-short",
    name: "Hockenheim Short",
    slug: "hockenheim-short",
    country: "Tyskland",
    lengthKm: 2.604,
    screenshotUrl: image("hockenheim-short"),
    data: {
      layout: "Short Circuit",
      era: "2002-nu",
      location: "Hockenheimring, Baden-Württemberg",
      direction: "Med uret",
      corners: null,
      setupFocus: "Maksimal traction, hurtig bremserespons og lav risiko på kolde bagdæk.",
      history: "Short-layoutet koncentrerer Hockenheim til Motodrom og de nærmeste tekniske sektioner.",
      anecdote: "På de korte Hockenheim-layouts kommer trafikken hurtigt igen, så multiclass-racing kræver ekstra tålmodighed.",
      sources: racingCircuits(sources.hockenheim)
    }
  },
  {
    id: "imola",
    name: "Imola",
    slug: "imola",
    country: "Italien",
    lengthKm: 4.933,
    screenshotUrl: image("imola"),
    data: {
      layout: "Autodromo Internazionale Enzo e Dino Ferrari",
      era: "1995-2006",
      location: "Imola, Emilia-Romagna",
      direction: "Mod uret",
      corners: 17,
      setupFocus: "Kerb-compliance, stabil bagende i hurtige retningsskift og bremsemod ind i chikanerne.",
      history: "Imola er en klassisk parkbane med San Marino GP-historie og et flow bygget af elevation og chikaner.",
      anecdote: "Navne som Tamburello, Tosa, Piratella og Acque Minerali gør banen genkendelig allerede før første omgang.",
      sources: racingCircuits(sources.imola)
    }
  },
  {
    id: "magny-cours-2003",
    name: "Magny-Cours 2003",
    slug: "magny-cours-2003",
    country: "Frankrig",
    lengthKm: 4.411,
    screenshotUrl: image("magny-cours-2003"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2003-2008",
      location: "Circuit de Nevers Magny-Cours",
      direction: "Med uret",
      corners: 17,
      setupFocus: "Stærk front ind i de tekniske kombinationer og god traction ud af Adelaide-hårnålen.",
      history: "Magny-Cours var Frankrigs Grand Prix-bane fra 1991 til 2008 og er kendt for tekniske sektorer.",
      anecdote: "Flere sving er opkaldt efter andre baner, blandt andet Estoril og Adelaide.",
      sources: racingCircuits(sources.magnyCours)
    }
  },
  {
    id: "magny-cours-2004",
    name: "Magny-Cours 2004",
    slug: "magny-cours-2004",
    country: "Frankrig",
    lengthKm: 4.411,
    screenshotUrl: image("magny-cours-2004"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2003-2008",
      location: "Circuit de Nevers Magny-Cours",
      direction: "Med uret",
      corners: 17,
      setupFocus: "Hold bagdækkene i live gennem de lange mellemhurtige sving og pas på kerbs i chikanen.",
      history: "2004-layoutet er den nyere Grand Prix-konfiguration med revideret sidste sektor.",
      anecdote: "Michael Schumacher vandt Frankrigs GP 2004 her med en usædvanlig fire-stop strategi.",
      sources: racingCircuits(sources.magnyCours)
    }
  },
  {
    id: "magny-cours-national",
    name: "Magny-Cours National",
    slug: "magny-cours-national",
    country: "Frankrig",
    lengthKm: 2.684,
    screenshotUrl: image("magny-cours-national"),
    data: {
      layout: "National Circuit",
      era: "2003-2008",
      location: "Circuit de Nevers Magny-Cours",
      direction: "Med uret",
      corners: null,
      setupFocus: "Kortere gearing, hurtigere reaktioner og mindre aero-kompromis end GP-layoutet.",
      history: "National-layoutet bevarer Magny-Cours' tekniske karakter, men skærer banen ned til sprintformat.",
      anecdote: "På den korte version koster fejl ved Adelaide-hårnålen hurtigt positioner i trafik.",
      sources: racingCircuits(sources.magnyCours)
    }
  },
  {
    id: "monza-2003",
    name: "Monza 2003",
    slug: "monza-2003",
    country: "Italien",
    lengthKm: 5.793,
    screenshotUrl: image("monza-2003"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2000-nu",
      location: "Autodromo Nazionale Monza",
      direction: "Med uret",
      corners: 11,
      setupFocus: "Minimal vinge, stabile bremser og stærk traction ud af de langsomme chikaner.",
      history: "Monza åbnede i 1922 og er kendt som Temple of Speed på grund af de lange fuldgasstræk.",
      anecdote: "Italiens GP 1971 på Monza blev afgjort med en målmargin på få hundrededele mellem top fem.",
      sources: racingCircuits(sources.monza)
    }
  },
  {
    id: "monza-2004",
    name: "Monza 2004",
    slug: "monza-2004",
    country: "Italien",
    lengthKm: 5.793,
    screenshotUrl: image("monza-2004"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2000-nu",
      location: "Autodromo Nazionale Monza",
      direction: "Med uret",
      corners: 11,
      setupFocus: "Bremsekøling, lav downforce og kontrolleret kerb-brug gennem Variante del Rettifilo.",
      history: "Monza 2004 er den moderne GTR2-udgave: chikaner, hårde bremser og stadig ekstrem topfart.",
      anecdote: "Selv med chikaner er Monza en bane hvor slipstream kan ændre et helt løb på sidste omgang.",
      sources: racingCircuits(sources.monza)
    }
  },
  {
    id: "monza-junior",
    name: "Monza Junior",
    slug: "monza-junior",
    country: "Italien",
    lengthKm: 2.405,
    screenshotUrl: image("monza-junior"),
    data: {
      layout: "Junior Circuit",
      era: "2000-nu",
      location: "Autodromo Nazionale Monza",
      direction: "Med uret",
      corners: null,
      setupFocus: "Sprint-setup med kontant turn-in, kort gearing og minimal margin i trafik.",
      history: "Junior-layoutet bruger en kompakt del af Monza og er langt mere teknisk end GP-banens fuldgasry.",
      anecdote: "Navnet Monza får mange til at tænke topfart, men Junior-versionen straffer især dårlig rotation.",
      sources: racingCircuits(sources.monza)
    }
  },
  {
    id: "oschersleben-2003",
    name: "Oschersleben 2003",
    slug: "oschersleben-2003",
    country: "Tyskland",
    lengthKm: 3.667,
    screenshotUrl: image("oschersleben-2003"),
    data: {
      layout: "Motorsport Arena Oschersleben",
      era: "1997-2006",
      location: "Oschersleben, Sachsen-Anhalt",
      direction: "Med uret",
      corners: 14,
      setupFocus: "Traktion og lavfartsrotation, da banen er tæt, teknisk og svær at overhale på.",
      history: "Oschersleben åbnede i 1997 som en af Tysklands første moderne permanente baner efter genforeningen.",
      anecdote: "Turn 1-komplekset har skabt utallige touring car- og GT-dueller, fordi feltet komprimeres hårdt.",
      sources: racingCircuits(sources.oschersleben)
    }
  },
  {
    id: "oschersleben-2004",
    name: "Oschersleben 2004",
    slug: "oschersleben-2004",
    country: "Tyskland",
    lengthKm: 3.667,
    screenshotUrl: image("oschersleben-2004"),
    data: {
      layout: "Motorsport Arena Oschersleben",
      era: "1997-2006",
      location: "Oschersleben, Sachsen-Anhalt",
      direction: "Med uret",
      corners: 14,
      setupFocus: "Bliv tålmodig på speederen og hold bilen neutral i de mange mellemhurtige knæk.",
      history: "I GTR2-årene var Oschersleben et fast tysk stop for tætte GT-felter.",
      anecdote: "Banens rytme gør kvalifikation dyrbar, fordi turbulent luft og korte langsider gør forbikørsler svære.",
      sources: racingCircuits(sources.oschersleben)
    }
  },
  {
    id: "spa-2003",
    name: "Spa 2003",
    slug: "spa-2003",
    country: "Belgien",
    lengthKm: 6.976,
    screenshotUrl: image("spa-2003"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2002-2003",
      location: "Spa-Francorchamps, Ardennerne",
      direction: "Med uret",
      corners: 20,
      setupFocus: "Lav drag, stabil bil gennem Eau Rouge/Raidillon og sikker bremsebalance til Bus Stop.",
      history: "Spa voksede ud af en offentlig vejtrekant og blev med tiden en af verdens store GT- og endurancebaner.",
      anecdote: "Vejret i Ardennerne kan give regn på den ene del af banen og tørt asfaltgreb på den anden.",
      sources: racingCircuits(sources.spa)
    }
  },
  {
    id: "spa-2004",
    name: "Spa 2004",
    slug: "spa-2004",
    country: "Belgien",
    lengthKm: 6.976,
    screenshotUrl: image("spa-2004"),
    data: {
      layout: "Grand Prix Circuit",
      era: "2004-2006",
      location: "Spa-Francorchamps, Ardennerne",
      direction: "Med uret",
      corners: 20,
      setupFocus: "Topfart på Kemmel, ro i højfart og en bil der kan tage kerbs uden at slå tilbage.",
      history: "Spa 2004 ligger lige i GTR2-nostalgiens kerne med 24-timers GT-racing og store internationale felter.",
      anecdote: "Når GT1-biler går side om side op gennem Raidillon, føles banen stadig som en plakat fra 2000erne.",
      sources: racingCircuits(sources.spa)
    }
  },
  {
    id: "valencia-2004",
    name: "Valencia 2004",
    slug: "valencia-2004",
    country: "Spanien",
    lengthKm: 4.005,
    screenshotUrl: image("valencia-2004"),
    data: {
      layout: "Grand Prix Circuit",
      era: "1999-nu",
      location: "Circuit Ricardo Tormo, Cheste",
      direction: "Mod uret",
      corners: 14,
      setupFocus: "Mekanisk greb, stærke bremser og præcis rotation i den stadionagtige sekvens.",
      history: "Circuit Ricardo Tormo åbnede i 1999 og er opkaldt efter den spanske motorcykelverdensmester.",
      anecdote: "Banens stadionlayout gør, at publikum fra mange tribuner kan følge næsten hele omgange.",
      sources: racingCircuits(sources.valencia)
    }
  },
  {
    id: "valencia-long",
    name: "Valencia Long",
    slug: "valencia-long",
    country: "Spanien",
    lengthKm: 4.005,
    screenshotUrl: image("valencia-long"),
    data: {
      layout: "Long / Grand Prix Circuit",
      era: "1999-nu",
      location: "Circuit Ricardo Tormo, Cheste",
      direction: "Mod uret",
      corners: 14,
      setupFocus: "Brug hele banebredden, men pas på forhjulstemperatur i de lange, vedvarende sving.",
      history: "Long-layoutet svarer til den fulde Ricardo Tormo-konfiguration i GTR2-kataloget.",
      anecdote: "Valencia føles kompakt i cockpit, men lap-tiden kommer fra tålmodig minimumsfart gennem de lange buer.",
      sources: racingCircuits(sources.valencia)
    }
  },
  {
    id: "valencia-national",
    name: "Valencia National",
    slug: "valencia-national",
    country: "Spanien",
    lengthKm: 3.099,
    screenshotUrl: image("valencia-national"),
    data: {
      layout: "National Circuit",
      era: "1999-nu",
      location: "Circuit Ricardo Tormo, Cheste",
      direction: "Mod uret",
      corners: null,
      setupFocus: "Kortere gear, mere fokus på exit-speed og mindre kompromis på straightline-fart.",
      history: "National-layoutet forkorter Ricardo Tormo uden at miste stadionbanens tekniske rytme.",
      anecdote: "Den kortere version gør multiclass-trafik mere intens, fordi GT1-bilerne hurtigt henter NGT-feltet.",
      sources: racingCircuits(sources.valencia)
    }
  },
  {
    id: "zhuhai",
    name: "Zhuhai",
    slug: "zhuhai",
    country: "Kina",
    lengthKm: 4.319,
    screenshotUrl: image("zhuhai"),
    data: {
      layout: "Zhuhai International Circuit",
      era: "1998-nu",
      location: "Zhuhai, Guangdong",
      direction: "Med uret",
      corners: 14,
      setupFocus: "Bremser og traction dominerer; bilen skal være stabil mellem lange straights og hårde stop.",
      history: "Zhuhai åbnede i 1996 og blev Kinas første permanente internationale racerbane.",
      anecdote: "Før Shanghai kom på Formel 1-kortet, var Zhuhai det kinesiske anlæg med de store internationale ambitioner.",
      sources: racingCircuits(sources.zhuhai)
    }
  }
] satisfies Gtr2Track[];
