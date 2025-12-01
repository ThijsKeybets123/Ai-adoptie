import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, BarChart3, Home, Brain, ArrowRight } from "lucide-react";

const questions = [
	{
		id: 1,
		question: "Hoe hoog is de urgentie voor AI-adoptie binnen uw organisatie?",
		options: [
			"Geen urgentie, we zien het niet als noodzaak.",
			"Laag, het staat op de radar maar heeft geen prioriteit.",
			"Gemiddeld, we zien het belang maar wachten nog af.",
			"Hoog, het is een kritische prioriteit voor onze toekomst.",
		],
	},
	{
		id: 2,
		question: "Hoe zou u het huidige kennisniveau over AI binnen uw teams omschrijven?",
		options: [
			"Er is nauwelijks kennis aanwezig.",
			"Enkele individuen hebben basiskennis.",
			"Teams worden getraind, maar kennis is nog gefragmenteerd.",
			"Hoog kennisniveau en continue educatie voor iedereen.",
		],
	},
	{
		id: 3,
		question: "Is er sprake van weerstand of angst voor AI onder medewerkers?",
		options: [
			"Ja, er is veel angst voor baanverlies.",
			"Enige weerstand, vooral door onzekerheid.",
			"Neutraal, men wacht af wat het brengt.",
			"Nee, medewerkers zijn enthousiast en omarmen het.",
		],
	},
	{
		id: 4,
		question: "Is er een duidelijke, gedocumenteerde AI-strategie?",
		options: [
			"Nee, we doen alles ad-hoc.",
			"We hebben een visie, maar geen concreet plan.",
			"Er is een strategie in ontwikkeling.",
			"Ja, een volledige strategie gekoppeld aan business goals.",
		],
	},
	{
		id: 5,
		question: "In hoeverre zijn privacy- en datazorgen een obstakel?",
		options: [
			"Dit blokkeert momenteel alle initiatieven.",
			"Het vertraagt ons aanzienlijk.",
			"We hebben richtlijnen, maar het blijft een uitdaging.",
			"We hebben duidelijke governance en compliance op orde.",
		],
	},
	{
		id: 6,
		question: "Is er duidelijkheid over de ROI van AI-investeringen?",
		options: [
			"Totaal onduidelijk, we zien de business case niet.",
			"We vermoeden waarde, maar kunnen het niet meten.",
			"We meten resultaten van pilots.",
			"ROI is helder en drijft onze investeringsbeslissingen.",
		],
	},
	{
		id: 7,
		question: "Hoe is de kwaliteit en toegankelijkheid van data binnen uw organisatie?",
		options: [
			"Data is gefragmenteerd, van slechte kwaliteit en moeilijk toegankelijk.",
			"Er is data beschikbaar, maar vaak in silo's en ongestructureerd.",
			"Belangrijke datasets zijn schoon en toegankelijk voor analyse.",
			"We hebben een centraal data-platform met hoge kwaliteit en governance.",
		],
	},
	{
		id: 8,
		question: "Zijn er ethische richtlijnen opgesteld voor het gebruik van AI?",
		options: [
			"Nee, hier is nog niet over nagedacht.",
			"We zijn ons bewust van de risico's, maar hebben nog geen beleid.",
			"Er zijn basisprincipes opgesteld voor verantwoord gebruik.",
			"Ethische kaders zijn volledig geïntegreerd in het ontwikkelproces.",
		],
	},
	{
		id: 9,
		question: "Is er een specifiek budget vrijgemaakt voor AI-innovatie?",
		options: [
			"Nee, er is geen budget voor AI.",
			"We financieren initiatieven ad-hoc uit andere budgetten.",
			"Er is een jaarlijks budget voor pilots en experimenten.",
			"Er is een structureel investeringsbudget voor AI-implementatie en schaling.",
		],
	},
	{
		id: 10,
		question: "Werkt uw organisatie samen met externe AI-experts of partners?",
		options: [
			"Nee, we doen alles intern (of nog niets).",
			"We huren incidenteel expertise in.",
			"We hebben vaste partners voor specifieke projecten.",
			"We maken deel uit van een ecosysteem met kennisinstellingen en tech-partners.",
		],
	},
];

const Assessment = () => {
	console.log("Assessment component rendered");
	const navigate = useNavigate();
	const [started, setStarted] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
	const [showResult, setShowResult] = useState(false);

	const handleOptionSelect = (optionIndex: number) => {
		const newAnswers = [...answers];
		newAnswers[currentQuestion] = optionIndex;
		setAnswers(newAnswers);
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			setShowResult(true);
		}
	};

	const calculateScore = () => {
		const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
		const maxScore = questions.length * 3; // 0 to 3 per question
		return Math.round((totalScore / maxScore) * 100);
	};

	const getMaturityLevel = (score: number) => {
		if (score < 25) return "Beginner";
		if (score < 50) return "Explorer";
		if (score < 75) return "Adopter";
		return "Leader";
	};

	useEffect(() => {
		if (showResult) {
			const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
			const maxScore = questions.length * 3;
			const score = Math.round((totalScore / maxScore) * 100);

			let level = "Beginner";
			if (score >= 25) level = "Explorer";
			if (score >= 50) level = "Adopter";
			if (score >= 75) level = "Leader";

			let rogersCategory = "Laggards";
			if (level === "Beginner") rogersCategory = "Laggards";
			if (level === "Explorer") rogersCategory = "Late Majority"; // Adjusted mapping
			if (level === "Adopter") rogersCategory = "Early Majority";
			if (level === "Leader") rogersCategory = "Innovators"; // Or Early Adopters depending on strictness

			// Let's refine the mapping to match the 5 categories better
			// 0-16% -> Laggards
			// 16-50% -> Late Majority
			// 50-84% -> Early Majority
			// 84-97.5% -> Early Adopters
			// 97.5-100% -> Innovators

			// Simplified for this context:
			if (score < 30) rogersCategory = "Laggards";
			else if (score < 50) rogersCategory = "Late Majority";
			else if (score < 70) rogersCategory = "Early Majority";
			else if (score < 90) rogersCategory = "Early Adopters";
			else rogersCategory = "Innovators";

			localStorage.setItem("assessmentScore", score.toString());
			localStorage.setItem("assessmentLevel", level);
			localStorage.setItem("rogersCategory", rogersCategory);
		}
	}, [showResult, answers]);

	if (!started) {
		return (
			<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
				<div className="max-w-2xl w-full bg-card border border-border rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
					<div className="mb-6 flex justify-center">
						<div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
							<Brain className="h-10 w-10 text-primary" />
						</div>
					</div>
					<h1 className="text-3xl font-bold text-foreground mb-4">
						Welkom bij de AI Nulmeting - Start Nu
					</h1>
					<p className="text-lg text-muted-foreground mb-8">
						Ontdek waar uw organisatie staat op het gebied van AI-adoptie. Deze korte
						assessment van 6 vragen geeft u direct inzicht in uw huidige
						volwassenheidsniveau en biedt concrete aanbevelingen voor de volgende
						stappen.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
						<div className="bg-muted/30 p-4 rounded-lg">
							<div className="font-semibold mb-1 flex items-center gap-2">
								<span className="bg-primary/10 p-1 rounded text-primary">⏱️</span> 2
								minuten
							</div>
							<p className="text-sm text-muted-foreground">
								Korte, krachtige vragenlijst
							</p>
						</div>
						<div className="bg-muted/30 p-4 rounded-lg">
							<div className="font-semibold mb-1 flex items-center gap-2">
								<span className="bg-primary/10 p-1 rounded text-primary">📊</span>{" "}
								Direct inzicht
							</div>
							<p className="text-sm text-muted-foreground">
								Ontvang meteen uw score
							</p>
						</div>
						<div className="bg-muted/30 p-4 rounded-lg">
							<div className="font-semibold mb-1 flex items-center gap-2">
								<span className="bg-primary/10 p-1 rounded text-primary">🚀</span>{" "}
								Advies op maat
							</div>
							<p className="text-sm text-muted-foreground">
								Concrete vervolgstappen
							</p>
						</div>
					</div>

					<div className="flex gap-4 justify-center">
						<Button onClick={() => navigate("/")} variant="outline" size="lg">
							Terug naar Home
						</Button>
						<Button
							onClick={() => setStarted(true)}
							size="lg"
							className="gap-2"
						>
							Start Nulmeting
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		);
	}

	if (showResult) {
		const score = calculateScore();
		const level = getMaturityLevel(score);

		return (
			<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
				<div className="max-w-2xl w-full bg-card border border-border rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
					<div className="mb-6 flex justify-center">
						<div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
							<BarChart3 className="h-10 w-10 text-primary" />
						</div>
					</div>
					<h1 className="text-3xl font-bold text-foreground mb-2">
						Resultaat Nulmeting
					</h1>
					<p className="text-muted-foreground mb-8">
						Hier is uw AI-volwassenheidsscore op basis van uw antwoorden.
					</p>

					<div className="mb-8">
						<div className="text-5xl font-bold text-primary mb-2">{score}%</div>
						<div className="text-xl font-medium text-foreground">
							Niveau: {level}
						</div>
					</div>

					<div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
						<h3 className="font-semibold mb-2">Advies voor {level}:</h3>
						<p className="text-sm text-muted-foreground">
							{level === "Beginner" &&
								"Focus op het creëren van bewustzijn en het identificeren van de eerste eenvoudige use cases. Start met educatie."}
							{level === "Explorer" &&
								"Begin met gestructureerde experimenten (pilots) en werk aan een basis datastrategie. Zoek interne ambassadeurs."}
							{level === "Adopter" &&
								"Schaal succesvolle pilots op naar productie. Formaliseer governance en investeer in geavanceerde training."}
							{level === "Leader" &&
								"Blijf innoveren en zoek naar disruptieve mogelijkheden. Deel kennis en fungeer als voorbeeld in de industrie."}
						</p>
					</div>

					<div className="flex gap-4 justify-center">
						<Button onClick={() => navigate("/")} variant="outline">
							Terug naar Dashboard
						</Button>
						<Button
							onClick={() => {
								setShowResult(false);
								setCurrentQuestion(0);
								setAnswers(new Array(questions.length).fill(-1));
							}}
						>
							Opnieuw doen
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="p-4 border-b border-border">
				<div className="container mx-auto flex items-center justify-between">
					<div className="flex items-center">
						<Button
							variant="ghost"
							onClick={() => navigate("/")}
							className="gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Terug
						</Button>
						<span className="ml-4 font-semibold text-foreground">
							AI Nulmeting
						</span>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => navigate("/")}
						className="gap-2"
					>
						<Home className="h-4 w-4" />
						Home
					</Button>
				</div>
			</div>

			<div className="flex-1 container mx-auto p-4 max-w-3xl flex flex-col justify-center">
				<div className="mb-8">
					<div className="flex justify-between text-sm text-muted-foreground mb-2">
						<span>
							Vraag {currentQuestion + 1} van {questions.length}
						</span>
						<span>
							{Math.round(((currentQuestion + 1) / questions.length) * 100)}%
						</span>
					</div>
					<div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
						<div
							className="h-full bg-primary transition-all duration-300 ease-out"
							style={{
								width: `${((currentQuestion + 1) / questions.length) * 100}%`,
							}}
						/>
					</div>
				</div>

				<div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-10 animate-fade-in">
					<div className="mb-6">
						<span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
							Vraag {currentQuestion + 1}
						</span>
						<h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
							{questions[currentQuestion].question}
						</h2>
					</div>

					<div className="space-y-3">
						{questions[currentQuestion].options.map((option, index) => (
							<div
								key={index}
								onClick={() => handleOptionSelect(index)}
								className={`
                  group p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4
                  ${answers[currentQuestion] === index
										? "border-primary bg-primary/5 shadow-sm"
										: "border-border hover:border-primary/50 hover:bg-accent hover:shadow-sm"
									}
                `}
							>
								<div
									className={`
                  flex-shrink-0 h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors
                  ${answers[currentQuestion] === index
											? "border-primary bg-primary text-primary-foreground"
											: "border-muted-foreground/30 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary"
										}
                `}
								>
									{String.fromCharCode(65 + index)}
								</div>
								<span
									className={`font-medium flex-1 ${
										answers[currentQuestion] === index
											? "text-primary"
											: "text-foreground"
									}`}
								>
									{option}
								</span>
								{answers[currentQuestion] === index && (
									<CheckCircle2 className="h-6 w-6 text-primary animate-in zoom-in duration-200" />
								)}
							</div>
						))}
					</div>

					<div className="mt-8 flex justify-end">
						<Button
							onClick={handleNext}
							disabled={answers[currentQuestion] === -1}
							className="gap-2"
							size="lg"
						>
							{currentQuestion === questions.length - 1
								? "Afronden"
								: "Volgende"}
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Assessment;
