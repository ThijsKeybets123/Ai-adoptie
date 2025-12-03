import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { RogersAdoptionCurve } from "@/components/RogersAdoptionCurve";

const stages = [
  {
    label: "Innovators (2.5%)",
    description:
      "De eerste groep die nieuwe technologieën omarmt. Ze zijn risicobereid, technisch onderlegd en vaak jonger. In marketing zijn dit de teams die direct experimenteren met de nieuwste AI-tools zodra ze uitkomen.",
    color: "bg-indigo-500",
  },
  {
    label: "Early Adopters (13.5%)",
    description:
      "Visionairs die de potentie zien. Ze wachten iets langer dan innovators maar zijn opinieleiders. Ze integreren AI als ze zien dat het strategisch voordeel oplevert.",
    color: "bg-blue-500",
  },
  {
    label: "Early Majority (34%)",
    description:
      "Pragmatici die bewijs willen zien. Ze adopteren AI pas als de kinderziektes eruit zijn en er bewezen use cases zijn. Dit is de grote groep die nu begint met AI-contentcreatie.",
    color: "bg-cyan-500",
  },
  {
    label: "Late Majority (34%)",
    description:
      "Conservatieven die sceptisch zijn. Ze gaan pas overstag als de meerderheid het gebruikt of als het noodzakelijk is om competitief te blijven.",
    color: "bg-emerald-500",
  },
  {
    label: "Laggards (16%)",
    description:
      "De laatste groep, vaak traditioneel ingesteld. Ze hebben een aversie tegen verandering en adopteren technologie alleen als het niet anders kan.",
    color: "bg-orange-500",
  },
];

const RogersCurveExplanation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            Rogers Adoption Curve Uitleg
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold">Wat is de Rogers Adoption Curve?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              De Diffusion of Innovations theorie, ontwikkeld door Everett Rogers,
              verklaart hoe, waarom en met welke snelheid nieuwe ideeën en
              technologieën zich verspreiden. Voor AI in marketing is dit model
              cruciaal om te begrijpen waar jouw team of organisatie staat en
              welke strategie nodig is om naar de volgende fase te gaan.
            </p>
          </section>

          {/* We tonen de curve hier opnieuw, maar misschien zonder de click handler om oneindige loops/verwarring te voorkomen, 
              of we laten hem gewoon zien als visuele referentie. De component zelf heeft nu een click handler, 
              dus misschien is het beter om hier een statische versie of gewoon de uitleg te doen. 
              Laten we voor nu de uitleg focussen op de tekstblokken. */}
          
          <div className="grid gap-6 md:grid-cols-1">
            {stages.map((stage) => (
              <div
                key={stage.label}
                className="flex gap-4 p-6 rounded-xl border border-border bg-card shadow-sm"
              >
                <div className={`w-2 h-full min-h-[80px] rounded-full ${stage.color} shrink-0`} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{stage.label}</h3>
                  <p className="text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="bg-muted/30 p-6 rounded-xl border border-border/50 mt-8">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Waarom is dit belangrijk?</h3>
                <p className="text-muted-foreground">
                  Het herkennen van de fase waarin je organisatie zich bevindt, helpt bij het kiezen van de juiste aanpak. 
                  Bij <strong>Innovators</strong> kun je focussen op technische features en experimenten. 
                  Bij de <strong>Early Majority</strong> moet je juist focussen op gebruiksgemak, bewezen resultaten en ROI.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RogersCurveExplanation;
