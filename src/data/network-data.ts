/**
 * Contact network data curated from Anthony Fauci's diary
 * (materials released by Chairman Rand Paul).
 * Part of 01_Contact_Network / interactive-org-chart.
 */

export type CategoryId =
  | "central"
  | "vaccine"
  | "origins"
  | "wh"
  | "media"
  | "intl"
  | "social"
  | "nih"
  | "eco"
  | "critic";

export interface Person {
  id: string;
  name: string;
  shortName: string;
  category: CategoryId;
  role: string;
  affiliation: string;
  keyDates: string;
  summary: string;
  flags: string[];
  mentions: string;
  /** Fixed layout coordinates in graph space */
  x: number;
  y: number;
  r?: number;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
  strength: 1 | 2 | 3 | 4 | 5;
  period: string;
  detail: string;
  diaryQuote?: string;
  quoteContext?: string;
}

export const CATEGORIES: Record<
  CategoryId,
  { label: string; color: string; description: string }
> = {
  central: {
    label: "Central",
    color: "var(--color-cat-central)",
    description: "Anthony Fauci — diary author and hub",
  },
  vaccine: {
    label: "Vaccine / Biotech",
    color: "var(--color-cat-vaccine)",
    description: "Early mRNA vaccine development (VRC / Moderna)",
  },
  origins: {
    label: "Origins Network",
    color: "var(--color-cat-origins)",
    description: "Jan 31–Feb 1 2020 private origins discussion",
  },
  wh: {
    label: "White House / Task Force",
    color: "var(--color-cat-wh)",
    description: "Executive branch and COVID Task Force",
  },
  media: {
    label: "Media",
    color: "var(--color-cat-media)",
    description: "Press platforms and journalists",
  },
  intl: {
    label: "International / WHO",
    color: "var(--color-cat-intl)",
    description: "WHO and foreign coordination",
  },
  social: {
    label: "Social / Other",
    color: "var(--color-cat-social)",
    description: "Personal and prior-administration contacts",
  },
  nih: {
    label: "NIH / Scientific",
    color: "var(--color-cat-nih)",
    description: "NIH leadership and scientific peers",
  },
  eco: {
    label: "EcoHealth / Pre-2020 Funding",
    color: "var(--color-cat-eco)",
    description: "Grants, Daszak, Baric, P3CO — as recorded in 2021 diary",
  },
  critic: {
    label: "GOF Critics",
    color: "var(--color-cat-critic)",
    description: "Long-time gain-of-function research critics",
  },
};

export const PEOPLE: Person[] = [
  {
    id: "fauci",
    name: "Anthony Fauci",
    shortName: "Fauci",
    category: "central",
    role: "Director, NIAID; White House COVID Task Force science lead",
    affiliation: "NIAID / NIH",
    keyDates: "Throughout 2020–2022",
    summary:
      "Central node and diary author. Documents private knowledge, decision-making, media strategy, vaccine acceleration, origins discussions, and political interactions across the pandemic response.",
    flags: ["Diary author", "Central hub"],
    mentions: "—",
    x: 0,
    y: 0,
    r: 28,
  },
  {
    id: "graham",
    name: "Barney Graham",
    shortName: "Graham",
    category: "vaccine",
    role: "Deputy Director, Vaccine Research Center (VRC)",
    affiliation: "NIAID / VRC",
    keyDates: "Jan 11–14, 2020+",
    summary:
      "Directed early vaccine constructs. Ordered constructs on credit cards (Jan 11) and started GMP vaccine work with Moderna (Jan 14) — days after the Wuhan sequence became public.",
    flags: ["Critical early action"],
    mentions: "11",
    x: -320,
    y: 140,
  },
  {
    id: "moderna",
    name: "Moderna",
    shortName: "Moderna",
    category: "vaccine",
    role: "mRNA vaccine company; NIAID-VRC partner",
    affiliation: "Biotech / industry",
    keyDates: "Jan 14, 2020 onward",
    summary:
      "Direct collaboration with Graham’s VRC team on GMP vaccine production from mid-January 2020 — predating widespread public recognition of pandemic scale.",
    flags: ["High commercial + institutional interest"],
    mentions: "129",
    x: -380,
    y: -40,
  },
  {
    id: "farrar",
    name: "Jeremy Farrar",
    shortName: "Farrar",
    category: "origins",
    role: "Director, Wellcome Trust",
    affiliation: "Wellcome Trust",
    keyDates: "Jan 31 – Feb 1, 2020",
    summary:
      "Initiated the critical Jan 31 call to Fauci, conferencing Kristian Andersen. Raised concern over a possible engineered/constructed virus (furin cleavage site). Coordinated with Collins toward WHO.",
    flags: ["Key initiator of origins discussion"],
    mentions: "3",
    x: 180,
    y: 280,
  },
  {
    id: "andersen",
    name: "Kristian Andersen",
    shortName: "Andersen",
    category: "origins",
    role: "Director of Infectious Disease Genomics",
    affiliation: "Scripps Research",
    keyDates: "Jan 31 – Feb 1, 2020; later Proximal Origin",
    summary:
      "On the Farrar call; noted unusual features consistent with possible construction. Later co-author of Proximal Origin concluding natural origin. Diary records an initial split of opinion in the group.",
    flags: ["Central to origins narrative shift"],
    mentions: "5",
    x: 340,
    y: 220,
  },
  {
    id: "collins",
    name: "Francis Collins",
    shortName: "Collins",
    category: "origins",
    role: "Director, National Institutes of Health",
    affiliation: "NIH",
    keyDates: "Feb 1, 2020 group call; ongoing",
    summary:
      "Participated in the Feb 1 origins discussion. Collaborated with Farrar to contact Tedros/WHO. High-level NIH leadership linkage on origins messaging and funding debates.",
    flags: ["Institutional authority"],
    mentions: "59",
    x: 120,
    y: 180,
  },
  {
    id: "holmes",
    name: "Edward Holmes",
    shortName: "Holmes",
    category: "origins",
    role: "Professor of Viral Evolution",
    affiliation: "University of Sydney",
    keyDates: "Jan 31 – Feb 1, 2020",
    summary:
      "Had examined the sequence with Andersen; raised possibility of constructed virus due to furin cleavage site features not seen in bat isolates.",
    flags: ["Origins discussion participant"],
    mentions: "7",
    x: 400,
    y: 120,
  },
  {
    id: "garry",
    name: "Robert Garry",
    shortName: "Garry",
    category: "origins",
    role: "Professor of Virology",
    affiliation: "Tulane University",
    keyDates: "Feb 1, 2020; Proximal Origin",
    summary:
      "Participated in early origins calls. Later co-author of Proximal Origin paper that publicly favored natural origin.",
    flags: ["Origins → public narrative"],
    mentions: "4",
    x: 300,
    y: 40,
  },
  {
    id: "rambaut",
    name: "Andrew Rambaut",
    shortName: "Rambaut",
    category: "origins",
    role: "Professor of Molecular Evolution",
    affiliation: "University of Edinburgh",
    keyDates: "Feb 1 period; Proximal Origin",
    summary:
      "Part of the group that later produced Proximal Origin analysis concluding natural occurrence.",
    flags: ["Origins network"],
    mentions: "2",
    x: 420,
    y: 20,
  },
  {
    id: "fouchier",
    name: "Ron Fouchier",
    shortName: "Fouchier",
    category: "origins",
    role: "Deputy Head, Viroscience",
    affiliation: "Erasmus Medical Center",
    keyDates: "Feb 1, 2020",
    summary:
      "Diary notes he was 'sure that this could occur naturally.' Fauci notes this is expected of him as 'the original GOF person with Yoshi Kawaoka.'",
    flags: ["GOF researcher; dissented on engineered hypothesis"],
    mentions: "2",
    x: 240,
    y: 340,
  },
  {
    id: "drosten",
    name: "Christian Drosten",
    shortName: "Drosten",
    category: "origins",
    role: "Director of Human Virology",
    affiliation: "German Center for Infection Research",
    keyDates: "Feb 1, 2020",
    summary:
      "Aligned with Fouchier in the group discussion favoring natural occurrence possibility.",
    flags: ["Origins discussion"],
    mentions: "2",
    x: 320,
    y: 320,
  },
  {
    id: "shi",
    name: "Shi Zhengli",
    shortName: "Shi Zhengli",
    category: "origins",
    role: "Bat coronavirus / GOF researcher",
    affiliation: "Wuhan Institute of Virology",
    keyDates: "Referenced Feb 1, 2020; 2021 funding debates",
    summary:
      "Named in the diary as having worked for years on GOF in coronaviruses to adapt spike protein to human ACE2. Cited as reason the lab-origin possibility 'could not be let go.' Later linked via EcoHealth subaward debates.",
    flags: ["Central to lab-leak hypothesis in diary"],
    mentions: "2+",
    x: 480,
    y: 200,
  },
  {
    id: "tedros",
    name: "Tedros Adhanom",
    shortName: "Tedros",
    category: "intl",
    role: "Director-General, WHO",
    affiliation: "World Health Organization",
    keyDates: "Early Feb 2020+; ongoing references",
    summary:
      "Farrar + Collins contacted him (via Stewart Simonson arranged by Fauci) to convene experts on origins. Diary later notes skepticism about Chinese influence on Tedros/WHO.",
    flags: ["WHO leadership; China dynamics"],
    mentions: "16",
    x: 80,
    y: 340,
  },
  {
    id: "trump",
    name: "Donald Trump",
    shortName: "Trump",
    category: "wh",
    role: "President of the United States",
    affiliation: "White House",
    keyDates: "Late Jan 2020 onward",
    summary:
      "Direct Oval Office briefings (e.g., China travel restrictions Jan 31). Diary records Fauci positioned as primary science spokesperson because Redfield 'does not come across very well.' Ongoing tension over treatments (HCQ) and messaging.",
    flags: ["Executive authority; friction points"],
    mentions: "425+",
    x: -120,
    y: -280,
  },
  {
    id: "pence",
    name: "Mike Pence",
    shortName: "Pence",
    category: "wh",
    role: "Vice President; COVID Task Force chair",
    affiliation: "White House",
    keyDates: "Late Jan / Feb 2020+",
    summary:
      "Task Force chair. Diary notes Pence-related decisions and optics, including mask issues around White House staff.",
    flags: ["Task Force leadership"],
    mentions: "6",
    x: 20,
    y: -320,
  },
  {
    id: "redfield",
    name: "Robert Redfield",
    shortName: "Redfield",
    category: "wh",
    role: "Director, CDC",
    affiliation: "CDC",
    keyDates: "Jan–Feb 2020 intensive",
    summary:
      "Frequent coordination on screening, travel policy, messaging. Fauci notes internal friction and that Redfield was not preferred as the public face of the response.",
    flags: ["CDC leadership; positioning dynamics"],
    mentions: "34",
    x: 140,
    y: -250,
  },
  {
    id: "azar",
    name: "Alex Azar",
    shortName: "Azar",
    category: "wh",
    role: "Secretary of HHS",
    affiliation: "HHS",
    keyDates: "Jan–April 2020 intensive",
    summary:
      "High frequency in diary. Involved in Oval Office presentations, Cabinet briefings, and early policy. Records political dynamics around him within the White House.",
    flags: ["HHS Secretary"],
    mentions: "116",
    x: -240,
    y: -200,
  },
  {
    id: "hahn",
    name: "Steve Hahn",
    shortName: "Hahn",
    category: "wh",
    role: "Commissioner, FDA",
    affiliation: "FDA",
    keyDates: "March 2020 (HCQ) and ongoing",
    summary:
      "Noted positively by Fauci for stressing need for safety and efficacy data amid HCQ pressure from Trump and advisors.",
    flags: ["FDA; treatment evidentiary standards"],
    mentions: "21",
    x: 60,
    y: -180,
  },
  {
    id: "birx",
    name: "Deborah Birx",
    shortName: "Birx",
    category: "wh",
    role: "White House Coronavirus Response Coordinator",
    affiliation: "White House Task Force",
    keyDates: "2020 Task Force period",
    summary:
      "Frequent Task Force participant. Diary references coordination and later reflections on messaging dynamics.",
    flags: ["Task Force coordinator"],
    mentions: "57",
    x: -40,
    y: -200,
  },
  {
    id: "cohen",
    name: "Elizabeth Cohen",
    shortName: "E. Cohen",
    category: "media",
    role: "Senior Medical Correspondent",
    affiliation: "CNN",
    keyDates: "Jan 2020 onward",
    summary:
      "Repeated interviews. Diary notes caution: she 'tends to dramatize things, which can get me in trouble no matter how many caveats I give her.'",
    flags: ["Media relationship management"],
    mentions: "7",
    x: 300,
    y: -160,
  },
  {
    id: "cnn",
    name: "CNN",
    shortName: "CNN",
    category: "media",
    role: "Major television network",
    affiliation: "Media",
    keyDates: "Throughout",
    summary:
      "Highest media-outlet frequency in the diary. Used for messaging on virus, masks, treatments. Specific notes on Sciutto and others regarding the mask guidance pivot.",
    flags: ["Primary media platform"],
    mentions: "269",
    x: 240,
    y: -240,
  },
  {
    id: "burwell",
    name: "Sylvia Burwell",
    shortName: "Burwell",
    category: "social",
    role: "Former HHS Secretary",
    affiliation: "Prior administration",
    keyDates: "Jan 6 & Feb 2, 2020",
    summary:
      "Social encounter at a book party; later called for clarification of China travel policy. Fauci notes missing working with her.",
    flags: ["Prior administration link"],
    mentions: "9",
    x: -280,
    y: -80,
  },
  {
    id: "zients",
    name: "Jeff Zients",
    shortName: "Zients",
    category: "social",
    role: "Later COVID Response Coordinator (Biden era)",
    affiliation: "White House (later period)",
    keyDates: "Later diary (2022)",
    summary:
      "Hosted events; diary notes personal conversations in the later period of Fauci’s service.",
    flags: ["Later administration / social"],
    mentions: "51",
    x: -360,
    y: -160,
  },
  {
    id: "daszak",
    name: "Peter Daszak",
    shortName: "Daszak",
    category: "eco",
    role: "President, EcoHealth Alliance",
    affiliation: "EcoHealth Alliance",
    keyDates: "2021 diary (esp. Apr, Sep–Oct)",
    summary:
      "Named as central figure in accusations that Fauci worked with Daszak and the Chinese to create a virus. Diary records external efforts to remove him and ongoing congressional focus on his grants.",
    flags: ["Primary accused collaborator in lab-leak narratives Fauci addresses"],
    mentions: "Key target",
    x: -200,
    y: 280,
  },
  {
    id: "ecohealth",
    name: "EcoHealth Alliance",
    shortName: "EcoHealth",
    category: "eco",
    role: "NIAID grantee; Wuhan Institute of Virology subawardee",
    affiliation: "NGO / research funder",
    keyDates: "May–Oct 2021 intensive (diary)",
    summary:
      "Core institutional target of 2021 scrutiny. Late progress reports, mice with increased viral growth, HHS IG audit, definitional fights over whether funded work was GOF under P3CO.",
    flags: ["Core institutional link for Wuhan funding"],
    mentions: "13+",
    x: -280,
    y: 220,
  },
  {
    id: "baric",
    name: "Ralph Baric",
    shortName: "Baric",
    category: "eco",
    role: "Coronavirus / chimeric virus researcher",
    affiliation: "University of North Carolina",
    keyDates: "2021 (via NYT / Paul hearing notes)",
    summary:
      "2015 Nature Medicine chimeric CoV paper (work at UNC using Shi Zhengli data; NIH + P3CO approved) used by critics as GOF exemplar. Diary captures the article and Baric’s defense.",
    flags: ["Cited GOF researcher (Obama-era paper)"],
    mentions: "2–3",
    x: -160,
    y: 380,
  },
  {
    id: "tabak",
    name: "Larry Tabak",
    shortName: "Tabak",
    category: "nih",
    role: "Principal Deputy / Acting NIH Director (later period)",
    affiliation: "NIH",
    keyDates: "Oct 2021",
    summary:
      "Released EcoHealth progress reports to Congress (Comer). Disclosure about mice getting sicker was seized on by critics as proof Fauci/Collins lied about GOF; letter also said work did not meet P3CO.",
    flags: ["NIH transparency action that intensified GOF accusations"],
    mentions: "Several",
    x: -80,
    y: 200,
  },
  {
    id: "ebright",
    name: "Richard Ebright",
    shortName: "Ebright",
    category: "critic",
    role: "Long-time GOF critic",
    affiliation: "Rutgers",
    keyDates: "Apr 2021; ongoing",
    summary:
      "Named (via David Morens) among long-time GOF critics Fauci believed were joining congressional efforts. Diary calls him and Imperiale 'preposterous.'",
    flags: ["Persistent external critic of NIAID GOF funding"],
    mentions: "Multiple",
    x: -320,
    y: 360,
  },
  {
    id: "osterholm",
    name: "Michael Osterholm",
    shortName: "Osterholm",
    category: "nih",
    role: "Director, CIDRAP",
    affiliation: "University of Minnesota",
    keyDates: "2020–2022",
    summary:
      "Frequent public commentator and occasional direct interlocutor on transmission, surges, and policy. Primary Minnesota institutional appearance. Not linked in the diary to EcoHealth/Wuhan grants.",
    flags: ["Minnesota public-health figure"],
    mentions: "10+",
    x: 380,
    y: -80,
  },
];

export const EDGES: Edge[] = [
  {
    id: "e-fauci-graham",
    source: "fauci",
    target: "graham",
    type: "Scientific collaborator / subordinate",
    strength: 4,
    period: "Jan 2020+",
    detail:
      "Fauci oversaw VRC direction. Graham executed the earliest vaccine construct orders and GMP start with Moderna under NIAID.",
    diaryQuote:
      "Jan. 11, 2020 (Saturday) – Barney Graham ordered the constructs using credit cards.",
    quoteContext: "Days after the Wuhan sequence was posted publicly.",
  },
  {
    id: "e-fauci-moderna",
    source: "fauci",
    target: "moderna",
    type: "Institutional partnership (via VRC)",
    strength: 4,
    period: "Jan 14 2020+",
    detail:
      "NIAID-VRC collaboration with Moderna on GMP mRNA vaccine production began mid-January 2020 — extremely early relative to public alarm.",
    diaryQuote:
      "Jan. 14, 2020 – Barney Graham’s team starts work on GMP vaccine in collaboration with Moderna.",
    quoteContext: "Notable Entries compilation; near-instant pivot to mRNA development.",
  },
  {
    id: "e-graham-moderna",
    source: "graham",
    target: "moderna",
    type: "Vaccine development collaboration",
    strength: 5,
    period: "Jan 11–14 2020",
    detail:
      "Direct scientific-industrial collaboration: constructs ordered, then GMP production with Moderna using NIAID/VRC materials.",
    diaryQuote:
      "Barney Graham’s team starts work on GMP vaccine in collaboration with Moderna.",
    quoteContext: "Jan 14, 2020 diary entry.",
  },
  {
    id: "e-fauci-farrar",
    source: "fauci",
    target: "farrar",
    type: "Peer scientific / policy contact",
    strength: 5,
    period: "Jan 31 2020",
    detail:
      "Farrar initiated the critical call after White House meetings, raising engineered-virus concerns and bringing Andersen onto the line.",
    diaryQuote:
      "When I got back to my office, got call from Jeremy Farrar who sounded very concerned and conferenced me in with Kristian Anderson...",
    quoteContext: "Jan 31 / Feb 1 2020 origins discussion.",
  },
  {
    id: "e-farrar-andersen",
    source: "farrar",
    target: "andersen",
    type: "Conferenced into Fauci call",
    strength: 4,
    period: "Jan 31 2020",
    detail:
      "Farrar brought Andersen into the call with Fauci to discuss sequence anomalies and possible construction.",
    diaryQuote:
      "...conferenced me in with Kristian Anderson... There have been conspiracy theories that the virus was given GOF by inserted mutations...",
    quoteContext: "Same Jan 31 call chain.",
  },
  {
    id: "e-fauci-andersen",
    source: "fauci",
    target: "andersen",
    type: "Scientific consultation on sequence",
    strength: 5,
    period: "Jan 31–Feb 1",
    detail:
      "Andersen and Holmes raised the furin cleavage site and possible engineered origin. Group later shifted; Andersen co-authored Proximal Origin favoring natural origin.",
    diaryQuote:
      "The people on the phone felt that the mutations around the furine cleavage site of the spike protein could not have occurred naturally since it would require an evolutionary “jump that they found nowhere in bat isolates.",
    quoteContext: "Feb 1 group discussion notes in diary.",
  },
  {
    id: "e-fauci-collins",
    source: "fauci",
    target: "collins",
    type: "NIH leadership; joint action on origins",
    strength: 4,
    period: "Feb 1 2020",
    detail:
      "Collins joined the origins group call and partnered with Farrar to reach Tedros/WHO.",
    diaryQuote:
      "We decided to have Jeremy with Francis to contact Tedros with Stewart Simonson’s help (I arranged this) to see if Tedros would convene experts.",
    quoteContext: "Feb 1 2020 follow-through.",
  },
  {
    id: "e-collins-farrar",
    source: "collins",
    target: "farrar",
    type: "Joint contact to Tedros/WHO",
    strength: 3,
    period: "Feb 1 2020",
    detail: "Collins and Farrar coordinated outreach to WHO leadership on the origins question.",
  },
  {
    id: "e-fauci-shi",
    source: "fauci",
    target: "shi",
    type: "Referenced (GOF work cited)",
    strength: 3,
    period: "Feb 1 2020",
    detail:
      "No direct contact recorded. Shi’s GOF program at Wuhan was explicitly cited as why the engineered/lab hypothesis could not be dismissed.",
    diaryQuote:
      "...given the fact that Dr. Zheng-Li Shi at the University of Wuhan has been working for years in GOF in coronaviruses to allow adaptation of the spike protein to bind to the human ACE2 receptor, we could not let this go.",
    quoteContext: "Feb 1 2020 origins group discussion.",
  },
  {
    id: "e-fauci-fouchier",
    source: "fauci",
    target: "fouchier",
    type: "Scientific discussion (pro-natural)",
    strength: 2,
    period: "Feb 1 2020",
    detail:
      "Fouchier argued natural occurrence was certain; Fauci notes his GOF research background with Kawaoka.",
    diaryQuote:
      "Ron Fouchier said he was sure that this could occur naturally... This is expected of him since he was the original GOF person with Yoshi Kawaoka.",
    quoteContext: "Feb 1 group call.",
  },
  {
    id: "e-fauci-garry",
    source: "fauci",
    target: "garry",
    type: "Scientific discussion; later Proximal Origin",
    strength: 3,
    period: "Feb 1 + later",
    detail:
      "Garry participated in early origins discussion and later Proximal Origin co-authorship favoring natural origin.",
  },
  {
    id: "e-fauci-holmes",
    source: "fauci",
    target: "holmes",
    type: "Sequence analysis input",
    strength: 3,
    period: "Jan 31–Feb 1",
    detail:
      "Holmes had reviewed the sequence with Andersen before the call; part of the initial concern set about unusual features.",
  },
  {
    id: "e-andersen-garry",
    source: "andersen",
    target: "garry",
    type: "Later Proximal Origin co-authors",
    strength: 3,
    period: "Weeks after Feb 1",
    detail:
      "Public paper pathway from private concern to natural-origin consensus narrative.",
    diaryQuote:
      "A few weeks later Christian Andersen got together with Bob Garry and Andrew Rambaut to examine this more carefully and they came to the conclusion that they were convinced that this was a natural occurrence...",
    quoteContext: "2021 diary reflection on the 2020 sequence of events.",
  },
  {
    id: "e-andersen-rambaut",
    source: "andersen",
    target: "rambaut",
    type: "Later Proximal Origin co-authors",
    strength: 3,
    period: "Weeks after Feb 1",
    detail: "Rambaut joined Andersen and Garry on the Proximal Origin analysis.",
  },
  {
    id: "e-fauci-trump",
    source: "fauci",
    target: "trump",
    type: "Briefings, policy, spokesperson role",
    strength: 5,
    period: "Jan 31 2020+",
    detail:
      "Direct Oval Office presentations and ongoing tension over treatments, messaging, and public positioning.",
    diaryQuote:
      "...convinced that I be the science/health spokesperson for the USG. Bob Redfield just does not come across very well.",
    quoteContext: "Around China travel restriction decision, late Jan 2020.",
  },
  {
    id: "e-fauci-redfield",
    source: "fauci",
    target: "redfield",
    type: "Coordination + internal positioning",
    strength: 4,
    period: "Jan–Feb 2020",
    detail:
      "Daily operational coordination with frequent notes of disagreement on screening logistics and public messaging strength.",
  },
  {
    id: "e-fauci-azar",
    source: "fauci",
    target: "azar",
    type: "HHS / Task Force coordination",
    strength: 4,
    period: "Jan–April 2020",
    detail: "Joint briefings to POTUS and Cabinet; political dynamics inside HHS/White House.",
  },
  {
    id: "e-fauci-hahn",
    source: "fauci",
    target: "hahn",
    type: "Treatment evidentiary standards (HCQ)",
    strength: 3,
    period: "March 2020",
    detail:
      "Aligned on requiring controlled safety/efficacy data before broad HCQ expansion despite executive enthusiasm.",
    diaryQuote:
      "POTUS was hot to give out chloroquine or hydroxychloroquine since Jeff Ellison thinks that it is a great drug. Steve Hahn did a good job in stressing the need for safety and efficacy data.",
    quoteContext: "March 2020 HCQ debates.",
  },
  {
    id: "e-fauci-birx",
    source: "fauci",
    target: "birx",
    type: "Task Force coordination",
    strength: 3,
    period: "2020",
    detail: "Ongoing Task Force operational and messaging coordination.",
  },
  {
    id: "e-fauci-pence",
    source: "fauci",
    target: "pence",
    type: "Task Force / VP",
    strength: 3,
    period: "2020",
    detail: "Pence chaired the Task Force; diary notes decisions and optics including masks.",
  },
  {
    id: "e-fauci-tedros",
    source: "fauci",
    target: "tedros",
    type: "Indirect via Farrar/Collins; political notes",
    strength: 2,
    period: "Feb 2020+",
    detail:
      "Outreach arranged for origins expert convening; later diary skepticism about Chinese influence on WHO leadership.",
  },
  {
    id: "e-fauci-cnn",
    source: "fauci",
    target: "cnn",
    type: "Frequent media platform",
    strength: 4,
    period: "Throughout",
    detail:
      "Highest-frequency media outlet. Used for messaging pivots including masks.",
    diaryQuote:
      "Big issue today is whether we should be recommending masks for everyone. We probably were too strong in saying masks do not work. I mentioned this on CNN (Sciutto) this AM.",
    quoteContext: "Late March – early April 2020 mask guidance pivot.",
  },
  {
    id: "e-fauci-cohen",
    source: "fauci",
    target: "cohen",
    type: "Repeated interviews + noted caution",
    strength: 2,
    period: "Jan 2020+",
    detail: "Regular CNN medical correspondent contact with diary caution about dramatization.",
    diaryQuote:
      "Problem with her is that she tends to dramatize things, which can get me in trouble no matter how many caveats I give her.",
    quoteContext: "Early pandemic media notes.",
  },
  {
    id: "e-fauci-burwell",
    source: "fauci",
    target: "burwell",
    type: "Social + policy clarification",
    strength: 2,
    period: "Jan–Feb 2020",
    detail: "Book-party social contact and later policy clarification call on China travel rules.",
  },
  {
    id: "e-fauci-zients",
    source: "fauci",
    target: "zients",
    type: "Later social / professional",
    strength: 2,
    period: "Later diary",
    detail: "Social/professional receptions in the later period of service.",
  },
  {
    id: "e-fauci-daszak",
    source: "fauci",
    target: "daszak",
    type: "Accused collaborator (via EcoHealth grant)",
    strength: 5,
    period: "2021 diary",
    detail:
      "No partnership claimed in diary; Fauci records accusations tying him to Daszak and virus creation, and treats them as conspiracy — while managing grant-oversight fallout.",
    diaryQuote:
      "They are saying that I deliberately worked with the Chinese together with Peter Daszak to create a virus that would be released to the world. This sounds very much like a way-out conspiracy theory, which it is.",
    quoteContext: "April 20, 2021 diary entry on far-right / congressional pressure.",
  },
  {
    id: "e-fauci-ecohealth",
    source: "fauci",
    target: "ecohealth",
    type: "NIAID grantee under intense scrutiny",
    strength: 5,
    period: "2021 diary",
    detail:
      "Diary tracks IG audit, late progress reports, mice with increased viral growth, and definitional fights over GOF/P3CO tied to the Wuhan subaward.",
    diaryQuote:
      "Things continue to heat up regarding the innuendoes about our being responsible for the COVID-19 pandemic because of our grant to EcoHealth. Amazing!!! All the right wing conspiracy theorists are piling on with no data at all.",
    quoteContext: "May 2021 diary entry.",
  },
  {
    id: "e-daszak-ecohealth",
    source: "daszak",
    target: "ecohealth",
    type: "President / principal investigator",
    strength: 5,
    period: "Pre-2020 + 2021",
    detail: "Organizational leadership of the grantee organization under scrutiny.",
  },
  {
    id: "e-ecohealth-shi",
    source: "ecohealth",
    target: "shi",
    type: "Subaward to Wuhan Institute of Virology",
    strength: 5,
    period: "Pre-2020 grant",
    detail:
      "Funding path from NIAID → EcoHealth → Wuhan Institute work that became the center of 2021 GOF oversight fights.",
  },
  {
    id: "e-baric-shi",
    source: "baric",
    target: "shi",
    type: "Data collaboration (2015 chimeric virus paper)",
    strength: 3,
    period: "2015 / noted 2021",
    detail:
      "2015 Nature Medicine chimeric virus work at UNC using data from Shi; cited in 2021 hearings as GOF example.",
    diaryQuote:
      "Working with data sent from Shi Zhengli, the director of the Wuhan Institute of Virology, Dr. Baric and his colleagues built a new coronavirus from an existing one. All of the work was done in the North Carolina lab...",
    quoteContext: "NY Times article excerpt recorded in diary (2021).",
  },
  {
    id: "e-fauci-baric",
    source: "fauci",
    target: "baric",
    type: "Referenced via congressional/GOF debates",
    strength: 2,
    period: "2021",
    detail: "Baric’s NIH-approved work cited in Rand Paul questioning; diary captures media coverage.",
  },
  {
    id: "e-fauci-tabak",
    source: "fauci",
    target: "tabak",
    type: "NIH colleague; progress report disclosure",
    strength: 4,
    period: "Oct 2021",
    detail:
      "Tabak’s letter to Comer about late EcoHealth report triggered a media firestorm Fauci spent days countering.",
    diaryQuote:
      "Larry Tabak, representing the NIH, released some progress reports from the EcoHealth... Ecohealth was late in submitting a progress report of their grant and mentioned in the letter that some of the mice in the study had an increase in viral growth and got sicker.",
    quoteContext: "Oct 2021 diary notes on congressional disclosure fallout.",
  },
  {
    id: "e-tabak-ecohealth",
    source: "tabak",
    target: "ecohealth",
    type: "Progress report disclosure to Congress",
    strength: 4,
    period: "Oct 2021",
    detail:
      "Transparency action that critics used as proof of GOF; NIH maintained work did not trigger P3CO.",
  },
  {
    id: "e-fauci-ebright",
    source: "fauci",
    target: "ebright",
    type: "Long-time GOF critic; adversarial",
    strength: 3,
    period: "Apr 2021+",
    detail:
      "Fauci records suspicion that Ebright and Imperiale were feeding efforts to connect him to Wuhan virus creation.",
    diaryQuote:
      "It is my suspicion that some of these so-called NIAID grantees are Imperiale and Rich Ebright. They have been complaining about gain of function research for years.",
    quoteContext: "April 20, 2021 entry.",
  },
  {
    id: "e-fauci-osterholm",
    source: "fauci",
    target: "osterholm",
    type: "Public health interlocutor / commentator",
    strength: 2,
    period: "2020–2022",
    detail:
      "Direct calls and frequent public commentary. Minnesota CIDRAP — not linked in diary to EcoHealth/Wuhan grants.",
  },
  {
    id: "e-drosten-fouchier",
    source: "drosten",
    target: "fouchier",
    type: "Aligned on natural occurrence",
    strength: 2,
    period: "Feb 1 2020",
    detail: "Both favored natural origin possibility in the early group discussion.",
  },
];

export function getPerson(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}

export function getEdge(id: string): Edge | undefined {
  return EDGES.find((e) => e.id === id);
}

export function edgesForPerson(id: string): Edge[] {
  return EDGES.filter((e) => e.source === id || e.target === id);
}
