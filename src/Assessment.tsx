import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, BarChart3, Home, Brain, ArrowRight, Building2, User } from "lucide-react";
import { ReadinessScan } from "@/components/ReadinessScan";

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
	const [assessmentType, setAssessmentType] = useState<'org' | 'employee' | null>(null);
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
		if (showResult && assessmentType === 'org') {
			const score = calculateScore();
			const level = getMaturityLevel(score);

			let rogersCategory = "Laggards";
			if (score < 30) rogersCategory = "Laggards";
			else if (score < 50) rogersCategory = "Late Majority";
			else if (score < 70) rogersCategory = "Early Majority";
			else if (score < 90) rogersCategory = "Early Adopters";
			else rogersCategory = "Innovators";

			localStorage.setItem("assessmentScore", score.toString());
			localStorage.setItem("assessmentLevel", level);
			localStorage.setItem("rogersCategory", rogersCategory);
		}
	}, [showResult, answers, assessmentType]);

	// 1. Choice Strategy
	if (!started && !assessmentType) {
		return (
			<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
				<div className="max-w-4xl w-full bg-card border border-border rounded-2xl shadow-xl p-8 text-center animate-fade-in-up">
					<div className="mb-6 flex justify-center">
						<div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
							<Brain className="h-10 w-10 text-primary" />
						</div>
					</div>
					<h1 className="text-3xl font-bold text-foreground mb-4">
						Kies uw Assessment
					</h1>
					<p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
						Selecteer het type nulmeting dat u wilt uitvoeren. We bieden specifieke scans voor zowel organisatorische volwassenheid als individuele medewerker-readiness.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						{/* Organization Option */}
						<div
							className="bg-card border-2 border-border hover:border-primary/50 hover:bg-accent/5 p-8 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center group"
							onClick={() => {
								setAssessmentType('org');
								setStarted(true);
							}}
						>
							<div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
								<Building2 className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-bold mb-3">Organisatie Scan</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Meet de AI-volwassenheid van de volledige organisatie. Focus op strategie, budget, data en ethiek.
							</p>
							<Button className="mt-6 w-full" variant="outline">Start Organisatie Scan</Button>
						</div>

						{/* Employee Option */}
						<div
							className="bg-card border-2 border-border hover:border-primary/50 hover:bg-accent/5 p-8 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center group"
							onClick={() => {
								setAssessmentType('employee');
								setStarted(true);
							}}
						>
							<div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
								<User className="h-8 w-8" />
							</div>
							<h3 className="text-xl font-bold mb-3">Medewerker Scan</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Test de individuele AI-readiness en vaardigheden. Focus op kennis, mindset en dagelijks gebruik.
							</p>
							<Button className="mt-6 w-full" variant="outline">Start Medewerker Scan</Button>
						</div>
					</div>

					<Button onClick={() => navigate("/")} variant="ghost" size="lg">
						<ArrowLeft className="mr-2 h-4 w-4" /> Terug naar Home
					</Button>
				</div>
			</div>
		);
	}

	// 2. Employee Scan
	if (assessmentType === 'employee') {
		return (
			<div className="min-h-screen bg-background flex flex-col">
				<div className="p-4 border-b border-border">
					<div className="container mx-auto flex items-center justify-between">
						<Button
							variant="ghost"
							onClick={() => {
								setAssessmentType(null);
								setStarted(false);
							}}
							className="gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Kies ander assessment
						</Button>
						<span className="font-semibold text-foreground">Medewerker Scan</span>
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
				<div className="-mt-20">
					{/* Negative margin to pull the section up slightly as ReadinessScan has lots of top padding */}
					<ReadinessScan />
				</div>
			</div>
		);
	}

	// 3. Org Scan Result
	if (showResult && assessmentType === 'org') {
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
								setStarted(false);
								setAssessmentType(null); // Return to choice
							}}
						>
							Volgend Assessment
						</Button>
					</div>
				</div>
			</div>
		);
	}

	// 4. Org Scan Questions (Default when started && assessmentType == 'org' && !showResult)
	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="p-4 border-b border-border">
				<div className="container mx-auto flex items-center justify-between">
					<div className="flex items-center">
						<Button
							variant="ghost"
							onClick={() => {
								setStarted(false);
								setAssessmentType(null);
							}}
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
									className={`font-medium flex-1 ${answers[currentQuestion] === index
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
