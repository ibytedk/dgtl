export const ruleDocumentSlugs = ["generelle-regler", "dgtl-endurance"] as const;

export type RuleDocumentSlug = (typeof ruleDocumentSlugs)[number];

export type DefaultRuleDocument = {
  slug: RuleDocumentSlug;
  title: string;
  scope: "GENERAL" | "SERIES";
  seriesSlug: string | null;
  bodyHtml: string;
};

const allowedRuleTags = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "div",
  "em",
  "h2",
  "h3",
  "h4",
  "i",
  "li",
  "ol",
  "p",
  "pre",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
]);

const dangerousRuleBlockPattern =
  /<\s*(script|style|iframe|object|embed|svg|math|meta|link)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
const dangerousRuleSingleTagPattern =
  /<\s*(script|style|iframe|object|embed|svg|math|meta|link)[^>]*\/?\s*>/gi;
const htmlTagPattern = /<\/?([a-zA-Z0-9-]+)([^>]*)>/g;
const hrefAttributePattern = /\shref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i;

function escapeHtmlAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function isSafeRuleHref(value: string) {
  const href = value.trim().toLowerCase();
  return (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:")
  );
}

export function sanitizeRuleHtml(input: string) {
  const withoutDangerousBlocks = input
    .replace(dangerousRuleBlockPattern, "")
    .replace(dangerousRuleSingleTagPattern, "");

  return withoutDangerousBlocks
    .replace(htmlTagPattern, (tag, rawName: string, rawAttributes: string) => {
      const tagName = rawName.toLowerCase();
      const isClosingTag = tag.startsWith("</");

      if (!allowedRuleTags.has(tagName)) {
        return "";
      }

      if (isClosingTag) {
        return `</${tagName}>`;
      }

      if (tagName === "br") {
        return "<br>";
      }

      if (tagName === "a") {
        const match = rawAttributes.match(hrefAttributePattern);
        const href = match?.[2] ?? match?.[3] ?? match?.[4] ?? "";

        if (!href || !isSafeRuleHref(href)) {
          return "<a>";
        }

        return `<a href="${escapeHtmlAttribute(href)}" rel="noopener noreferrer">`;
      }

      return `<${tagName}>`;
    })
    .trim();
}

export const defaultRuleDocuments: DefaultRuleDocument[] = [
  {
    slug: "generelle-regler",
    title: "DGTL.dk Generelle Regler 2026",
    scope: "GENERAL",
    seriesSlug: null,
    bodyHtml: `
<h2>§1 Gyldighed og formål</h2>
<ol>
  <li>Dette reglement gælder for alle officielle DGTL.dk-løb, medmindre andet fremgår af en series tillægsreglement.</li>
  <li>Tillægsregler kan fastsætte særlige krav til bilvalg, klasseinddeling, point, serveropsætning, assists, løbsformat og protestprocedure.</li>
  <li>Ved konflikt mellem dette reglement og en series tillægsreglement gælder tillægsreglementet for den pågældende serie.</li>
  <li>Ændringer til reglementet skal offentliggøres før ikrafttrædelse.</li>
</ol>
<h2>§2 Krav til deltageren</h2>
<ol>
  <li>Deltageren skal være godkendt medlem af DGTL.dk for at kunne deltage.</li>
  <li>Deltageren skal kunne læse og forstå dansk. DGTL-ledelsen kan give dispensation.</li>
  <li>Deltageren skal som udgangspunkt være fyldt 18 år. DGTL-ledelsen kan give dispensation.</li>
  <li>Deltageren skal anvende et godkendt kørernavn. Rigtigt navn anbefales.</li>
  <li>Deltageren har ansvar for stabil internetforbindelse, stabil hardware og korrekt opsætning.</li>
  <li>Gentagne forbindelsesproblemer, høj ping, pakketab, warping eller tekniske problemer, som påvirker andre deltagere, kan føre til advarsel, startforbud eller straf.</li>
  <li>Krav til voice-kanal, kommunikationsplatform og tilstedeværelse fastsættes i tillægsreglementet.</li>
</ol>
<h2>§3 Tilmelding og fremmøde</h2>
<ol>
  <li>Tilmelding sker via den af DGTL fastsatte kanal.</li>
  <li>En deltager er kun startberettiget, hvis vedkommende er korrekt tilmeldt inden fristen.</li>
  <li>Afmelding skal ske inden den angivne frist.</li>
  <li>Udeblivelse uden afmelding kan medføre advarsel, strafpoint, tab af prioritet eller udelukkelse fra kommende løb.</li>
  <li>Maksimalt deltagerantal fastsættes i serie- eller løbsspecifikke regler.</li>
</ol>
<h2>§4 Server, spilopsætning og løbsformat</h2>
<ol>
  <li>Serveropsætning, lobbyindstillinger, assists, damage, fuel, tyre wear, track limits, vejr, tidsskala og løbsformat fastsættes i tillægsreglementet.</li>
  <li>Deltageren har ansvar for at kontrollere, at egen bil, skin, klasse og opsætning er i overensstemmelse med reglerne.</li>
  <li>Password og serverinformation må ikke deles med personer uden for deltagerfeltet.</li>
  <li>Officielt replay, serverlog eller andet af DGTL godkendt materiale danner grundlag for vurdering af hændelser.</li>
</ol>
<h2>§5 Kvalifikation og startberettigelse</h2>
<ol>
  <li>For at deltage i løbet skal en kører som udgangspunkt kunne sætte en gyldig tid inden for 107% af klassens hurtigste kvalifikationstid.</li>
  <li>DGTL-ledelsen kan nægte start, hvis en kører vurderes teknisk ustabil, ikke-reglementeret eller væsentligt til fare for løbets afvikling.</li>
  <li>Eventuelle undtagelser fra 107%-reglen skal fremgå af tillægsreglementet.</li>
</ol>
<h2>§6 Startprocedure</h2>
<ol>
  <li>Starttype fastsættes i tillægsreglementet: stående start, rullende start, manuel formationsomgang eller spillets automatiske startprocedure.</li>
  <li>Ved stående start må bilen ikke bevæge sig før startsignal.</li>
  <li>Ved rullende start skal feltet holde formation, stabil afstand og forudsigelig hastighed.</li>
  <li>Ved manuel formationsomgang fungerer polesitteren som pacefører, medmindre andet er angivet.</li>
  <li>Det er forbudt at accelerere aggressivt op til forankørende, bremseteste, slingre uforudsigeligt eller skabe unødvendig uro i formationen.</li>
  <li>Overhaling før startsignal eller før den angivne startlinje er forbudt, medmindre en bil tydeligt har problemer eller forlader formationen.</li>
</ol>
<h2>§7 Kørsel på banen</h2>
<ol>
  <li>Al kørsel skal ske sportsligt, forudsigeligt og med respekt for andre deltagere.</li>
  <li>Det er forbudt at påkøre andre deltagere, presse andre af banen, blokere ulovligt eller foretage manøvrer uden realistisk chance for at lykkes.</li>
  <li>En kører må som udgangspunkt kun foretage ét defensivt linjeskift mellem to sving.</li>
  <li>En kører må gerne vende tilbage mod idealsporet, men skal efterlade tilstrækkelig plads, hvis en anden bil har overlap.</li>
  <li>To biler anses for at have overlap, når den bageste bils foraksel er på højde med eller foran den forreste bils bagaksel.</li>
  <li>Ved overlap skal begge kørere give hinanden plads.</li>
  <li>Et sent dyk på indersiden efter forankørendes tydelige indstyring er forbudt, medmindre manøvren kan gennemføres kontrolleret uden kontakt og uden at tvinge modparten af banen.</li>
  <li>Track limits følger spillets system eller seriens tillægsregler. Hvis intet andet er angivet, er det forbudt at opnå fordel ved at køre uden for banens afgrænsning.</li>
  <li>Opnået fordel ved off-track, kontakt eller ulovlig manøvre skal gives tilbage hurtigst muligt og på sikker måde.</li>
</ol>
<h2>§8 Overhaling af langsommere eller omgangshentede biler</h2>
<ol>
  <li>Den overhalende kører har ansvar for at gennemføre overhalingen sikkert.</li>
  <li>Den langsommere eller omgangshentede kører skal køre forudsigeligt og må ikke forsvare positionen mod en bil, der er en eller flere omgange foran.</li>
  <li>Den omgangshentede kører bør lette på speederen på en lige strækning eller bremse tidligere, hvor det kan ske sikkert.</li>
  <li>Pludselige linjeskift, hårde opbremsninger eller uforudsigelig adfærd under blå flag kan straffes.</li>
</ol>
<h2>§9 Pit entry og pit exit</h2>
<ol>
  <li>Pit entry og pit exit skal ske sikkert og uden at hindre andre deltagere unødigt.</li>
  <li>Pit exit-linjen må ikke krydses, hvis banen eller spillet markerer en sådan linje.</li>
  <li>Kørere på banen skal være opmærksomme på biler, der forlader pitten, men bilen fra pitten har ansvar for sikker indfletning.</li>
  <li>Pit speed limit og eventuelle pitregler følger spillet eller tillægsreglementet.</li>
</ol>
<h2>§10 Spin, uheld, rejoin og tekniske problemer</h2>
<ol>
  <li>En kører, der spinner, kører af eller holder stille, har ansvar for at komme tilbage i løbet uden at genere andre.</li>
  <li>Rejoin skal ske parallelt med banen og først, når det er sikkert.</li>
  <li>Det er forbudt at bakke, vende eller krydse banen på en måde, der skaber fare.</li>
  <li>Ved skade, langsom kørsel eller tekniske problemer skal køreren holde en forudsigelig linje og søge væk fra idealsporet, hvor det er sikkert.</li>
  <li>Massedisconnect, servernedbrud eller tekniske løbsafbrydelser håndteres efter mesterskabsreglerne eller tillægsreglementet.</li>
</ol>
<h2>§11 Straffe</h2>
<ol>
  <li>DGTL-ledelsen eller den ansvarlige løbsledelse kan uddele straffe efter hændelsens karakter.</li>
  <li>Mulige straffe omfatter påtale, advarsel, tidsstraf, pointstraf, placeringstab, diskvalifikation, start fra pit, karantæne og udelukkelse.</li>
  <li>Straffe vurderes ud fra skyld, konsekvens, gentagelse, opnået fordel, skade på andre kørere og om køreren selv forsøgte at rette fejlen.</li>
  <li>Gentagne forseelser kan straffes hårdere end enkeltstående forseelser.</li>
</ol>
<h2>§12 Mesterskab, point og afbrudte løb</h2>
<ol>
  <li>Et mesterskab er en officiel DGTL-serie bestående af mindst fire løb, medmindre andet fremgår af tillægsreglementet.</li>
  <li>Pointsystem fastsættes i seriens tillægsreglement.</li>
  <li>En kører skal som udgangspunkt have fuldført mindst 2/3 af løbsdistancen for at kunne opnå point.</li>
  <li>Ved pointlighed afgøres placering efter flest sejre, flest andenpladser, flest tredjepladser og derefter bedste placering i seneste afdeling.</li>
  <li>Ved servernedbrud før to fuldførte omgange genstartes, udsættes eller aflyses løbet uden point.</li>
  <li>Ved afbrydelse efter to omgange, men før 2/3 distance, kan reducerede point anvendes.</li>
  <li>Ved afbrydelse efter 2/3 distance kan fulde point uddeles.</li>
</ol>
<h2>§13 Protester og hændelsesbehandling</h2>
<ol>
  <li>Protestfrist er 36 timer efter løbets afslutning, medmindre andet fremgår af tillægsreglementet.</li>
  <li>En protest skal indeholde løb, klasse, omgang eller replay-tidspunkt, involverede kørere og en kort neutral beskrivelse af hændelsen.</li>
  <li>Protester skal være faktuelle. Personlige kommentarer, beskyldninger og følelsesladet sprog kan afvises.</li>
  <li>DGTL-ledelsen kan tage hændelser op af egen drift, også uden protest.</li>
  <li>Afgørelser træffes på baggrund af replay, serverdata, forklaringer og gældende reglement.</li>
</ol>
<h2>§14 Opførsel og kommunikation</h2>
<ol>
  <li>Deltagere skal opføre sig respektfuldt over for andre kørere, officials og DGTL.</li>
  <li>Chikane, personangreb, diskrimination, trusler eller bevidst ødelæggende adfærd accepteres ikke.</li>
  <li>Diskussioner efter løb skal holdes saglige.</li>
  <li>Voice- og chatkommunikation under officielle sessions må ikke forstyrre løbsafviklingen.</li>
  <li>Alvorlig eller gentagen dårlig opførsel kan føre til sportslig eller administrativ straf.</li>
</ol>
<h2>§15 Fortolkning</h2>
<ol>
  <li>DGTL-ledelsen har ansvar for fortolkning af reglementet.</li>
  <li>Reglementet skal anvendes konsekvent, men med mulighed for konkret vurdering af hændelser.</li>
  <li>Formålet er fair konkurrence, stabil løbsafvikling og respektfuld deltagelse.</li>
</ol>`.trim()
  },
  {
    slug: "dgtl-endurance",
    title: "DGTL Endurance 2026 - Tillægsregler",
    scope: "SERIES",
    seriesSlug: "dgtl-endurance",
    bodyHtml: `
<h2>§1 Serieformat</h2>
<ol>
  <li>DGTL Endurance er DGTL.dk's hovedserie.</li>
  <li>Serien køres efter DGTL.dk's generelle reglement samt disse tillægsregler.</li>
  <li>Ved konflikt mellem de generelle regler og disse tillægsregler gælder tillægsreglerne for DGTL Endurance.</li>
  <li>Serien køres som multiclass med spillets oprindelige klasser: GT, nGT, G2 og G3.</li>
</ol>
<h2>§2 Kørerprofil</h2>
<ol>
  <li>Ved tilmelding vælger hver kører enten <strong>Kører for at vinde (Pro)</strong> eller <strong>Kører for sjov (Am)</strong>.</li>
  <li><strong>Kører for at vinde (Pro)</strong> må vælge GT eller nGT.</li>
  <li><strong>Kører for sjov (Am)</strong> må vælge nGT, G2 eller G3.</li>
  <li>nGT er åben for begge profiler.</li>
  <li>Profilen kan kun ændres mellem sæsoner, medmindre DGTL-ledelsen giver dispensation.</li>
</ol>
<h2>§3 Biler og klassevalg</h2>
<ol>
  <li>Køreren vælger bil ud fra spillets oprindelige klasseinddeling.</li>
  <li>Der anvendes ikke en særskilt DGTL GT1/GT2-billiste i 2026-reglementet.</li>
  <li>Bil og klasse låses fra kørerens første officielle start i sæsonen.</li>
  <li>Skift af bilmodel eller klasse efter første start kræver godkendelse fra DGTL-ledelsen.</li>
  <li>Ikke-godkendt bil- eller klasseskift medfører, at resultatet ikke tæller i mesterskabet.</li>
</ol>
<h2>§4 Hold</h2>
<ol>
  <li>Et hold består som udgangspunkt af mindst 2 kørere.</li>
  <li>Et hold kan have flere end 4 medlemmer, men kan maksimalt stille med 4 kørere til samme løb.</li>
  <li>Holdmesterskabet tæller holdets 2 bedst pointgivende resultater pr. løb.</li>
  <li>Det anbefales, at hold stiller på tværs af flere klasser for at understøtte multiclass-formatet.</li>
  <li>Enkeltmandshold kan kun godkendes efter særlig vurdering fra DGTL-ledelsen.</li>
</ol>
<h2>§5 Tilmelding</h2>
<ol>
  <li>Tilmelding sker til ét løb ad gangen.</li>
  <li>Tilmelding til næste løb åbner først, når det aktuelle løb er afsluttet.</li>
  <li>Ved tilmelding angives kørernavn, hold, kørerprofil, bilklasse og bilmodel.</li>
  <li>Kører man en anden bil eller klasse end den tilmeldte uden godkendelse, tæller resultatet ikke.</li>
  <li>Hvis der er flere tilmeldte end pladser, anvendes reserver.</li>
</ol>
<h2>§6 Mesterskaber</h2>
<ol>
  <li>DGTL Endurance køres med både individuelt mesterskab og holdmesterskab.</li>
  <li>Der føres individuelt mesterskab i hver aktiv klasse: GT, nGT, G2 og G3.</li>
  <li>En klasse betragtes som aktiv, når mindst én kører er startet i klassen.</li>
  <li>I det individuelle mesterskab kan hver kører fratrække sit dårligste resultat, hvis sæsonformatet fastholder denne regel.</li>
</ol>
<h2>§7 Point</h2>
<ol>
  <li>Point gives pr. klasse efter skalaen: 15, 12, 10, 8, 6, 5, 4, 3, 2, 1.</li>
  <li>Der gives 1 bonuspoint for pole position i klassen.</li>
  <li>Der gives 1 bonuspoint for hurtigste omgang i klassen.</li>
  <li>Bonuspoint gives kun til kørere, der er startberettigede og korrekt tilmeldt.</li>
  <li>Point ved afbrudte løb følger de generelle regler, medmindre andet fremgår af løbsopslaget.</li>
</ol>
<h2>§8 Start</h2>
<ol>
  <li>DGTL Endurance køres med flyvende start.</li>
  <li>Startprocedure følger DGTL.dk's generelle reglement.</li>
  <li>Eventuelle særlige startinstruktioner for et konkret løb skal fremgå af løbsopslaget.</li>
</ol>
<h2>§9 Vægtstraf og ballast</h2>
<ol>
  <li>Den gamle GT1/GT2-vægtstraf videreføres ikke automatisk i 2026-reglementet.</li>
  <li>Ballast anvendes kun, hvis det fremgår tydeligt af sæsonreglementet.</li>
  <li>Hvis ballast anvendes, skal reglerne angive omfattede klasser, vægt pr. placering, maksimum ballast, hvornår ballast fjernes og hvordan ballast kontrolleres.</li>
</ol>
<h2>§10 Skins</h2>
<ol>
  <li>DGTL Endurance kan køres med officiel skinpakke.</li>
  <li>Skins må kun ændre bilens visuelle filer.</li>
  <li>Det er ikke tilladt at ændre fysik, performance, lyd, kollisionsdata eller andre filer, der kan give sportslig fordel.</li>
  <li>DGTL kan afvise skins, der er defekte, upassende, politiske, krænkende eller teknisk problematiske.</li>
</ol>
<h2>§11 Specialregler</h2>
<ol>
  <li>Eventuelle specialregler for enkelte løb skal offentliggøres inden løbet.</li>
  <li>Specialregler kan omfatte pitstopkrav, stintlængde, vejr, starttidspunkt, klassebegrænsning eller særlige baneregler.</li>
  <li>Ingen specialregel gælder, medmindre den er offentliggjort i løbsopslaget.</li>
</ol>
<h2>§12 Serieansvar</h2>
<ol>
  <li>Serieansvarlig for DGTL Endurance 2026 angives i sæsonopslaget.</li>
  <li>DGTL-ledelsen kan justere reglementet mellem sæsoner.</li>
  <li>Ændringer midt i en sæson bør kun ske ved teknisk nødvendighed, alvorlig ubalance eller uklarhed i reglerne.</li>
</ol>`.trim()
  }
];

export function getDefaultRuleDocument(slug: RuleDocumentSlug) {
  return defaultRuleDocuments.find((document) => document.slug === slug);
}
