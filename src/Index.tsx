import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BarrierCard } from "@/components/BarrierCard";
import { StrategyCard } from "@/components/StrategyCard";
import { CaseCard } from "@/components/CaseCard";
import { BarrierDialog } from "@/components/BarrierDialog";
import { StrategyDialog } from "@/components/StrategyDialog";
import { Chatbot } from "@/components/Chatbot";
import { RogersAdoptionCurve } from "@/components/RogersAdoptionCurve";
import { BenefitDialog } from "@/components/BenefitDialog";
import { ReadinessScan } from "@/components/ReadinessScan";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Brain,
  Users,
  Target,
  Lock,
  TrendingDown,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Zap,
  Settings,
  ArrowRight,
  Sparkles,
  LogIn,
  User,
  TrendingUp,
  ShieldCheck,
  Globe,
  ChevronDown,
  Home,
  BookOpen,
  Briefcase,
  Smile,
  CheckCircle2,
  Scale,
  Code2,
  HelpCircle,
  Shield,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const barriers = [
  {
    id: 1,
    title: "Gebrek aan urgentie",
    icon: AlertCircle,
    description: "Veel marketingorganisaties zien AI nog niet als directe noodzaak voor hun bedrijfsvoering. De druk om te innoveren ontbreekt vaak, waardoor AI-initiatieven op de lange baan worden geschoven.",
    example: "Het marketingteam van een groot retailmerk werkt met bestaande campagnetools en ziet geen directe reden om AI te integreren in hun creatieve proces.",
    stats: "Uit onderzoek blijkt dat 42% van de marketingbedrijven AI niet als prioriteit ziet voor het komende jaar.",
    color: "red" as const,
  },
  {
    id: 2,
    title: "Onvoldoende kennis",
    icon: Brain,
    description: "Er is een groot kennistekort binnen marketingteams over wat AI precies kan betekenen en hoe het praktisch toegepast kan worden.",
    example: "Het brand management team weet wel dat AI bestaat, maar heeft geen idee hoe ze het kunnen inzetten voor hun specifieke uitdagingen zoals personalisatie.",
    stats: "68% van de marketing professionals geeft aan onvoldoende kennis te hebben over AI-toepassingen.",
    color: "blue" as const,
  },
  {
    id: 3,
    title: "Angst bij medewerkers",
    icon: Users,
    description: "Werknemers zijn bang dat AI hun baan overneemt of dat ze niet kunnen meekomen met de nieuwe technologie. Dit leidt tot weerstand.",
    example: "Het content creation team vreest dat AI-tools hun creatieve rol zullen vervangen en zijn daarom terughoudend in adoptie.",
    stats: "53% van de marketingmedewerkers maakt zich zorgen over baanzekerheid door AI-implementatie.",
    color: "orange" as const,
  },
  {
    id: 4,
    title: "Geen duidelijke strategie",
    icon: Target,
    description: "AI-initiatieven worden ad-hoc opgepakt zonder heldere visie of integratie met bedrijfsdoelen, wat leidt tot gefragmenteerde resultaten.",
    example: "Social media experimenteert met ChatGPT, terwijl CRM een ander AI-tool gebruikt, zonder onderlinge afstemming of centrale sturing.",
    stats: "Slechts 23% van de marketingafdelingen heeft een gedocumenteerde AI-strategie die is afgestemd met business goals.",
    color: "purple" as const,
  },
  {
    id: 5,
    title: "Privacy- en datazorgen",
    icon: Lock,
    description: "Zorgen over gegevensprivacy, compliance met AVG, en het delen van vertrouwelijke bedrijfsinformatie met AI-platforms.",
    example: "Het legal team blokkeert het gebruik van ChatGPT voor productbeschrijvingen vanwege onduidelijkheid over data ownership.",
    stats: "76% van de marketingbedrijven noemt privacy en compliance als grootste barrière voor AI-adoptie.",
    color: "emerald" as const,
  },
  {
    id: 6,
    title: "Onduidelijke ROI",
    icon: TrendingDown,
    description: "Het is moeilijk om de business case voor AI te maken wanneer de return on investment onduidelijk of moeilijk meetbaar is.",
    example: "De CFO vraagt om concrete cijfers over kostenbesparingen en omzetstijging, maar het marketing team kan geen harde ROI voorleggen.",
    stats: "61% van de marketingbeslissers zegt dat onduidelijke ROI de belangrijkste reden is om AI-investeringen uit te stellen.",
    color: "amber" as const,
  },
];

const strategies = [
  {
    id: 1,
    number: 1,
    title: "Top-down visie en commitment",
    icon: Lightbulb,
    description: "Zorg voor commitment van het management en communiceer een heldere AI-visie die aansluit bij bedrijfsdoelen.",
    actions: [
      "Laat C-level publiekelijk hun commitment tonen voor AI-adoptie",
      "Ontwikkel een AI-visiedocument dat de strategische richting uitzet",
      "Koppel AI-doelen aan concrete business KPI's",
      "Creëer een dedicated AI-taskforce met senior stakeholders",
    ],
    example: "Een toonaangevend marketingbureau heeft een Chief AI Officer aangesteld die AI-integratie aanstuurt en regelmatig townhalls organiseert over de AI-roadmap.",
  },
  {
    id: 2,
    number: 2,
    title: "Investeren in training en kennis",
    icon: GraduationCap,
    description: "Bied medewerkers toegankelijke trainingen en workshops om AI-geletterdheid te vergroten.",
    actions: [
      "Organiseer 'AI for Everyone' workshops voor verschillende afdelingen",
      "Creëer een intern AI-kennisplatform met use cases en best practices",
      "Stel AI-ambassadeurs aan per team die kennis delen",
      "Partner met universiteiten of trainingsplatforms voor upskilling programma's",
    ],
    example: "Een internationaal mediabureau heeft een intern 'AI Academy' programma gelanceerd dat al 5000+ medewerkers heeft getraind in AI-basics en praktische toepassingen.",
  },
  {
    id: 3,
    number: 3,
    title: "Angsten wegnemen via communicatie",
    icon: MessageSquare,
    description: "Transparante communicatie over hoe AI het werk zal veranderen en verbeteren, niet vervangen.",
    actions: [
      "Deel succesverhalen waarin AI medewerkers ondersteunt in plaats van vervangt",
      "Organiseer Q&A sessies waar angsten bespreekbaar worden gemaakt",
      "Toon concrete voorbeelden van hoe AI saai werk elimineert en creativiteit bevordert",
      "Creëer een 'AI Myths vs Reality' communicatiecampagne",
    ],
    example: "Een groot digitaal agentschap heeft een interne campagne 'AI as your co-pilot' gelanceerd, waarin wordt benadrukt dat AI creatieve professionals versterkt met data-inzichten.",
  },
  {
    id: 4,
    number: 4,
    title: "Kleine experimenten en quick wins",
    icon: Zap,
    description: "Start met laagdrempelige AI-projecten die snel waarde aantonen en vertrouwen opbouwen.",
    actions: [
      "Identificeer 3-5 use cases met hoge impact en lage complexiteit",
      "Creëer een 'AI Sandbox' waar teams veilig kunnen experimenteren",
      "Vier en communiceer elke quick win breed in de organisatie",
      "Meet en deel concrete resultaten (tijd bespaard, kwaliteit verbeterd)",
    ],
    example: "Een social media agency startte met AI voor monitoring en sentiment analyse, wat binnen 3 maanden 40% snellere responstijden opleverde - een quick win die overtuigde voor verdere adoptie.",
  },
  {
    id: 5,
    number: 5,
    title: "Integratie in processen",
    icon: Settings,
    description: "Bouw AI geleidelijk in bestaande workflows in plaats van het als apart project te behandelen.",
    actions: [
      "Map huidige workflows en identificeer 'AI integration points'",
      "Ontwikkel standaard processen voor AI-gebruik (bijv. content creatie workflow met AI-check)",
      "Integreer AI-tools in de bestaande tech stack",
      "Maak AI-gebruik onderdeel van rol-verwachtingen en performance reviews",
    ],
    example: "Een content marketing platform heeft AI geïntegreerd in hun planningsproces - elke campagne doorloopt nu een AI-analyse fase voor targeting optimalisatie voordat deze live gaat.",
  },
];

const cases = [
  {
    company: "Global Brand Campaign",
    title: "Gepersonaliseerde Video Campagne",
    description: "Inzet van deepfake technologie om celebrities digitaal in te zetten voor hyper-gepersonaliseerde advertenties voor lokale markten, waardoor engagement significant steeg.",
    impact: "130.000+ gepersonaliseerde advertenties gegenereerd, 95% positieve sentiment",
  },
  {
    company: "Content Studio",
    title: "AI-gegenereerde product visuals",
    description: "Gebruik van generative AI om snel meerdere product visual varianten te creëren voor verschillende markten en kanalen, waardoor de time-to-market drastisch is verkort.",
    impact: "70% snellere content productie, 50% kostenbesparing op fotografie",
  },
  {
    company: "Interactive Agency",
    title: "AI Art Platform",
    description: "Lancering van een platform waar consumenten zelf AI-kunstwerken kunnen maken met merkelementen, wat zorgde voor enorme engagement en user-generated content.",
    impact: "120.000+ AI artworks gegenereerd, 30% stijging in social media engagement",
  },
  {
    company: "E-commerce Giant",
    title: "AI-gedreven personalisatie",
    description: "Gebruik van AI om consumenten voorkeuren te analyseren en gepersonaliseerde product aanbevelingen te doen, waardoor conversie in e-commerce significant steeg.",
    impact: "25% hogere conversie op e-commerce, 40% betere customer satisfaction scores",
  },
];

const impactStats = [
  {
    label: "Gemiddelde AI readiness",
    value: "62%",
    trend: "+8% vs. 2024",
    description: "Organisaties scoren hoger op experimenteercultuur.",
    icon: TrendingUp,
  },
  {
    label: "Teams met AI-guardrails",
    value: "48",
    trend: "+21 nieuwe programma's",
    description: "AI-governance frameworks live in grote marketingteams.",
    icon: ShieldCheck,
  },
  {
    label: "Markten gemonitord",
    value: "27",
    trend: "Europa + Azië",
    description: "Inzicht in wereldwijde adoptiesnelheid.",
    icon: Globe,
  },
];

const benefits = [
  {
    id: 1,
    title: "Inzicht in AI-vaardigheid",
    icon: Users,
    colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    description: "Zie direct hoe vaardig elk team is. Identificeer koplopers en medewerkers die extra ondersteuning nodig hebben.",
    details: [
      "Dashboard met scores per afdeling",
      "Benchmarken tegen marktstandaarden",
      "Identificatie van interne 'AI-kampioenen'",
      "Inzicht in 'Prompt Engineering' vaardigheden"
    ]
  },
  {
    id: 2,
    title: "Gerichte Trainingen",
    icon: Target,
    colorClass: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    description: "Bepaal op basis van data welke trainingen echt nodig zijn, in plaats van een 'one-size-fits-all' aanpak.",
    details: [
      "Persoonlijke leerpaden per medewerker",
      "Besparing op onnodige trainingskosten",
      "Focus op relevante tools voor specifieke rollen",
      "Meetbaar rendement op leerinvesteringen"
    ]
  },
  {
    id: 3,
    title: "Succesvolle Adoptie",
    icon: TrendingUp,
    colorClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    description: "Vergroot de kans dat AI-projecten daadwerkelijk worden omarmd door de juiste voorwaarden te scheppen.",
    details: [
      "Verlagen van weerstand door angst weg te nemen",
      "Hogere ROI op aangeschafte AI-licenties",
      "Versnellen van innovatiecycli",
      "Cultuurverandering naar 'AI-first' werken"
    ]
  }
];

const testModules = [
  {
    id: 1,
    title: "Basiskennis AI",
    description: "Een fundamentele toetsing van AI-geletterdheid. Begrijpen medewerkers de kernconcepten?",
    icon: BookOpen,
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-100 dark:bg-sky-900/30",
    borderColor: "hover:border-sky-200 dark:hover:border-sky-800",
    bullets: [
      "Wat is AI precies?",
      "Machine Learning vs. traditionele software",
      "Bias, ethiek en veiligheid"
    ]
  },
  {
    id: 2,
    title: "Toepassing in werk",
    description: "Hoe vertalen medewerkers AI-kennis naar de dagelijkse praktijk? Van theorie naar doen.",
    icon: Briefcase,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    borderColor: "hover:border-amber-200 dark:hover:border-amber-800",
    bullets: [
      "Herkennen van AI-kansen in processen",
      "Effectief werken met AI-tools (bv. ChatGPT)",
      "Praktische use-cases op de werkvloer"
    ]
  },
  {
    id: 3,
    title: "Mindset & Adoptie",
    description: "De zachte kant van innovatie. Is er bereidheid om te veranderen en te leren?",
    icon: Smile,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    borderColor: "hover:border-rose-200 dark:hover:border-rose-800",
    bullets: [
      "Openheid voor experimenteren",
      "Samenwerken met data & IT teams",
      "Omgaan met constante verandering"
    ]
  }
];

const Index = () => {
  const [selectedBarrier, setSelectedBarrier] = useState<typeof barriers[0] | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<typeof strategies[0] | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const barriersRef = useRef<HTMLElement>(null);
  const strategiesRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AI-Nulmeting</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/")} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Home</button>
            <button onClick={() => navigate("/assessment")} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Nulmeting</button>
            <button onClick={() => navigate("/dashboard")} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Resultaten</button>
            <button onClick={() => scrollToSection(barriersRef)} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Over</button>
          </nav>

          <Button
            onClick={() => navigate("/assessment")}
            className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            Start AI-nulmeting
          </Button>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Nieuw: Modulaire Organisatie Scan</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] animate-fade-in-up animation-delay-100">
            Meet uw <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Digitale IQ</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up animation-delay-200">
            Krijg direct inzicht in de AI-volwassenheid van uw teams. Wetenschappelijk onderbouwd, praktisch toepasbaar en volledig modulair.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Button
              onClick={() => navigate("/assessment")}
              size="lg"
              className="h-14 px-10 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Begin nu met de scan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection(barriersRef)}
              size="lg"
              className="h-14 px-10 rounded-full text-lg font-medium border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Meer leren
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-400 font-medium animate-fade-in-up animation-delay-500">
            Al meer dan 500+ professionals gingen u voor.
          </p>
        </div>
      </section>

      {/* Waarom-sectie (Benefits) - Met Modern Design */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Waarom inzicht essentieel is
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Transformeer gut-feeling naar data-driven beslissingen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                className="group p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedBenefit(benefit)}
              >
                <div className={`h-14 w-14 ${benefit.colorClass} rounded-2xl flex items-center justify-center mb-6 text-current transition-transform duration-500 group-hover:rotate-6`}>
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {benefit.description}
                </p>
                <span className="inline-flex items-center text-sm font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                  Lees meer <ChevronDown className="ml-1 h-4 w-4 -rotate-90" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Domains Section (Modern Cards) */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Onze Aanpak</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              4 Domeinen van AI-Volwassenheid
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Een holistische benadering om elke laag van adoptie te meten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Note: Hardcoded to match ReadinessScan domains precisely */}
            {[
              {
                id: 0,
                title: "Basisbegrip",
                desc: "Fundamentele kennis van wat AI is en de mogelijkheden.",
                icon: HelpCircle,
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-900/10"
              },
              {
                id: 1,
                title: "Dagelijks Werk",
                desc: "Praktische toepassing in bestaande taken en processen.",
                icon: Zap,
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-900/10"
              },
              {
                id: 2,
                title: "Vaardigheden",
                desc: "Het vermogen om AI-tools effectief te besturen (prompting).",
                icon: Brain,
                color: "text-purple-600",
                bg: "bg-purple-50 dark:bg-purple-900/10"
              },
              {
                id: 3,
                title: "Bewustzijn",
                desc: "Begrip van ethiek, risico's en veiligheid.",
                icon: Shield,
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-900/10"
              },
            ].map((item, idx) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className={`h-16 w-16 mb-6 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                  {item.desc}
                </p>
                <Button
                  onClick={() => navigate("/assessment")}
                  variant="outline"
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Start domein
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {impactStats.map((stat, index) => (
              <div
                key={stat.label}
                className="group rounded-3xl border border-border/50 bg-white/90 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    {stat.icon ? (
                      <stat.icon className="h-5 w-5" />
                    ) : null}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Insight
                  </p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="text-4xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <span className="text-xs font-medium text-emerald-500">
                    {stat.trend}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rogers Adoption Curve Section */}
      <RogersAdoptionCurve />

      {/* Barriers Section */}
      <section ref={barriersRef} className="relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              De 6 grootste barrières
            </h2>
            <p className="text-lg text-muted-foreground">
              Klik op een barrière om dieper in te gaan op de uitdaging, met
              praktijkvoorbeelden en onderzoeksfeiten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {barriers.map((barrier, index) => (
              <div
                key={barrier.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BarrierCard
                  title={barrier.title}
                  icon={barrier.icon}
                  description={barrier.description}
                  stats={barrier.stats}
                  example={barrier.example}
                  color={barrier.color}
                  onClick={() => setSelectedBarrier(barrier)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section ref={strategiesRef} className="py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              5 strategieën om AI te omarmen
            </h2>
            <p className="text-lg text-muted-foreground">
              Leer van best practices en ontdek hoe toonaangevende marketingorganisaties AI succesvol integreren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {strategies.map((strategy, index) => (
              <div
                key={strategy.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StrategyCard
                  number={strategy.number}
                  title={strategy.title}
                  icon={strategy.icon}
                  description={strategy.description}
                  onClick={() => setSelectedStrategy(strategy)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Praktijkcases
            </h2>
            <p className="text-lg text-muted-foreground">
              Concrete voorbeelden van AI-implementaties in de marketingwereld.
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {cases.map((caseItem, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <CaseCard {...caseItem} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar om de volgende stap te zetten?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start vandaag nog met het transformeren van uw marketingorganisatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold"
              onClick={() => navigate("/assessment")}
            >
              Doe de Nulmeting
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              onClick={() => navigate("/auth")}
            >
              Maak een account aan
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Deel 1: Ethiek */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Ethiek & Privacy</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Dit platform houdt rekening met de privacy van medewerkers en een zorgvuldige omgang met data, in lijn met de basisprincipes van de AI Act.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Transparantie over wat er precies wordt gemeten</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Geen misbruik van data voor andere doeleinden</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Resultaten bedoeld voor ontwikkeling, niet voor straf</span>
                </li>
              </ul>
            </div>

            {/* Deel 2: Project Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Over dit project</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Dit platform is ontwikkeld in het kader van een Minor AI. Met als doel: bedrijven helpen om AI-vaardigheid van medewerkers in kaart te brengen.
              </p>
              <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
                <p className="text-sm font-semibold mb-2">Gebruikte technieken:</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="bg-background px-2 py-1 rounded-md border shadow-sm">HTML / CSS / TSX</span>
                  <span className="bg-background px-2 py-1 rounded-md border shadow-sm">React & Vite</span>
                  <span className="bg-background px-2 py-1 rounded-md border shadow-sm">GitHub Pages</span>
                  <span className="bg-background px-2 py-1 rounded-md border shadow-sm">Assisted by Antigravity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AI Adoptie Dashboard</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Marketing AI Adoptie Monitor. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>

      <BarrierDialog
        open={!!selectedBarrier}
        onOpenChange={(open) => !open && setSelectedBarrier(null)}
        title={selectedBarrier?.title ?? ""}
        description={selectedBarrier?.description ?? ""}
        icon={selectedBarrier?.icon ?? AlertCircle}
        example={selectedBarrier?.example}
        stats={selectedBarrier?.stats}
      />

      <StrategyDialog
        open={!!selectedStrategy}
        onOpenChange={(open) => !open && setSelectedStrategy(null)}
        number={selectedStrategy?.number ?? 0}
        title={selectedStrategy?.title ?? ""}
        description={selectedStrategy?.description ?? ""}
        icon={selectedStrategy?.icon ?? Lightbulb}
        actions={selectedStrategy?.actions}
        example={selectedStrategy?.example}
      />

      <BenefitDialog
        open={!!selectedBenefit}
        onOpenChange={(open) => !open && setSelectedBenefit(null)}
        title={selectedBenefit?.title ?? ""}
        description={selectedBenefit?.description ?? ""}
        icon={selectedBenefit?.icon}
        details={selectedBenefit?.details}
      />

      <Chatbot />
    </div>
  );
};

export default Index;
