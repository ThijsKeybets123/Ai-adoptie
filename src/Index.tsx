import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BarrierCard } from "@/components/BarrierCard";
import { StrategyCard } from "@/components/StrategyCard";
import { CaseCard } from "@/components/CaseCard";
import { BarrierDialog } from "@/components/BarrierDialog";
import { StrategyDialog } from "@/components/StrategyDialog";
import { Chatbot } from "@/components/Chatbot";
import { RogersAdoptionCurve } from "@/components/RogersAdoptionCurve";
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

const Index = () => {
  const [selectedBarrier, setSelectedBarrier] = useState<typeof barriers[0] | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<typeof strategies[0] | null>(null);
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
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              AI Adoptie Dashboard
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/")}
              size="sm"
              variant="ghost"
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            {user ? (
              <>
                <Button
                  onClick={() => navigate("/assessment")}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Brain className="h-4 w-4" />
                  Nulmeting
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="sm"
                  className="gap-2"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogIn className="h-4 w-4" />
                Inloggen
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent_55%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20 shadow-lg">
                <Brain className="h-4 w-4" />
                Exclusive Marketing Research
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-sm">
              Versnelde AI-adoptie voor Marketing
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto font-light">
              Ontdek de belangrijkste barrières die AI-adoptie in de
              marketingsector vertragen en leer welke strategieën succesvol
              zijn om deze obstakels te overwinnen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => scrollToSection(barriersRef)}
              >
                Ontdek de barrières
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => scrollToSection(strategiesRef)}
              >
                Bekijk strategieën
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80 cursor-pointer"
          onClick={() => scrollToSection(barriersRef)}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-widest opacity-80">
              Scroll
            </span>
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
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

      <Chatbot />
    </div>
  );
};

export default Index;
