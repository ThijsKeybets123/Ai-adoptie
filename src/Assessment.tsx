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
			<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
				{/* Decorative background elements */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
					<div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
					<div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
					<div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
				</div>

				<div className="max-w-5xl w-full relative z-10">
					<div className="text-center mb-16 space-y-4">
						<div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mb-6 ring-1 ring-slate-900/5">
							<Brain className="h-12 w-12 text-primary" />
						</div>
						<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
							Kies uw Assessment
						</h1>
						<p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
							Selecteer het type nulmeting dat aansluit bij uw doel. <br className="hidden md:block" /> Wij bieden inzichten voor de hele organisatie én het individu.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 px-4">
						{/* Organization Option */}
						<div
							className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
							onClick={() => {
								setAssessmentType('org');
								setStarted(true);
							}}
						>
							<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

							<div className="flex items-start justify-between mb-8">
								<div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
									<Building2 className="h-8 w-8" />
								</div>
								<div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
									<ChevronRight className="h-5 w-5 text-slate-400" />
								</div>
							</div>

							<h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Organisatie Scan</h3>
							<p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
								Meet de AI-volwassenheid van de volledige organisatie. Focus op strategie, budget, data en ethiek.
							</p>
							<Button className="w-full bg-slate-900 text-white hover:bg-blue-600 transition-colors h-12 text-lg font-medium shadow-lg shadow-blue-900/5">
								Start Organisatie Scan
							</Button>
						</div>

						{/* Employee Option */}
						<div
							className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
							onClick={() => {
								setAssessmentType('employee');
								setStarted(true);
							}}
						>
							<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

							<div className="flex items-start justify-between mb-8">
								<div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
									<User className="h-8 w-8" />
								</div>
								<div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
									<ChevronRight className="h-5 w-5 text-slate-400" />
								</div>
							</div>

							<h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Medewerker Scan</h3>
							<p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
								Test de individuele AI-readiness en vaardigheden. Focus op kennis, mindset en dagelijks gebruik.
							</p>
							<Button className="w-full bg-slate-900 text-white hover:bg-emerald-600 transition-colors h-12 text-lg font-medium shadow-lg shadow-emerald-900/5">
								Start Medewerker Scan
							</Button>
						</div>
					</div>

					<div className="flex justify-center">
						<Button onClick={() => navigate("/")} variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-transparent -mt-4">
							<ArrowLeft className="mr-2 h-4 w-4" /> Terug naar Home
						</Button>
					</div>
				</div>
			</div>
		);
	}

	// 2. Employee Scan
	if (assessmentType === 'employee') {
		return (
			<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-500">
				{/* Header for Employee Scan */}
				<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
					<div className="container mx-auto px-4 h-16 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								onClick={() => {
									setAssessmentType(null);
									setStarted(false);
								}}
								className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white"
							>
								<ArrowLeft className="h-4 w-4" />
								<span className="hidden sm:inline">Kies ander assessment</span>
							</Button>
							<div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>
							<div className="flex items-center gap-3">
								<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
									<User className="h-4 w-4" />
								</span>
								<span className="font-bold text-slate-900 dark:text-white">
									Medewerker Scan
								</span>
							</div>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => navigate("/")}
							className="gap-2 text-slate-600 hover:text-primary hover:bg-primary/5"
						>
							<Home className="h-4 w-4" />
							<span className="hidden sm:inline">Home</span>
						</Button>
					</div>
				</div>

				<div className="container mx-auto px-4 py-8">
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
			<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
				{/* Decorative background elements */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
					<div className="absolute top-[10%] left-[30%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
				</div>

				<div className="max-w-3xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 p-12 md:p-16 text-center animate-fade-in-up relative z-10">
					<div className="mb-8 flex justify-center">
						<div className="h-24 w-24 bg-gradient-to-tr from-primary to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform rotate-3">
							<BarChart3 className="h-12 w-12 text-white" />
						</div>
					</div>

					<h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
						Resultaat Nulmeting
					</h1>
					<p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
						Uw organisatie scoort <strong className="text-slate-900 dark:text-white">{score}%</strong> op de AI-volwassenheidsschaal.
						<br />Dit plaatst u in de categorie:
					</p>

					<div className="mb-12 relative inline-block">
						<div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
						<div className="relative text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent pb-4">
							{level}
						</div>
					</div>

					<div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-8 md:p-10 mb-12 text-left border border-slate-100 dark:border-slate-800 relative overflow-hidden">
						<div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
						<h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
							<Brain className="h-5 w-5 text-blue-500" />
							Strategisch Advies:
						</h3>
						<p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
							{level === "Beginner" &&
								"Focus op het creëren van bewustzijn en het identificeren van de eerste eenvoudige use cases. Start met educatie en inspiratiesessies."}
							{level === "Explorer" &&
								"Begin met gestructureerde experimenten (pilots) en werk aan een basis datastrategie. Zoek interne ambassadeurs die de kar kunnen trekken."}
							{level === "Adopter" &&
								"Schaal succesvolle pilots op naar productie. Formaliseer governance, richtlijnen en investeer in geavanceerde training voor specifieke rollen."}
							{level === "Leader" &&
								"Blijf innoveren en zoek naar disruptieve mogelijkheden. Deel kennis, optimaliseer processen volledig met AI en fungeer als voorbeeld in de industrie."}
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button onClick={() => navigate("/")} variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 gap-2">
							<Home className="h-5 w-5" />
							Terug naar Home
						</Button>
						<Button
							onClick={() => {
								setShowResult(false);
								setCurrentQuestion(0);
								setAnswers(new Array(questions.length).fill(-1));
								setStarted(false);
								setAssessmentType(null); // Return to choice
							}}
							size="lg"
							className="h-14 px-8 text-lg rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10"
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
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-500">
			{/* Header */}
			<div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							onClick={() => {
								setStarted(false);
								setAssessmentType(null);
							}}
							className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white"
						>
							<ArrowLeft className="h-4 w-4" />
							<span className="hidden sm:inline">Terug</span>
						</Button>
						<div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>
						<div className="flex items-center gap-3">
							<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<Building2 className="h-4 w-4" />
							</span>
							<span className="font-bold text-slate-900 dark:text-white">
								Organisatie Scan
							</span>
						</div>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => navigate("/")}
						className="gap-2 text-slate-600 hover:text-primary hover:bg-primary/5"
					>
						<Home className="h-4 w-4" />
						<span className="hidden sm:inline">Home</span>
					</Button>
				</div>

				{/* Slim progress line at very top of content */}
				<div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
					<div
						className="h-full bg-primary transition-all duration-700 ease-in-out"
						style={{
							width: `${((currentQuestion + 1) / questions.length) * 100}%`,
						}}
					/>
				</div>
			</div>

			<div className="flex-1 container mx-auto p-4 max-w-4xl flex flex-col justify-center py-12 md:py-20">
				<div className="mb-8 md:mb-12">
					<div className="flex items-end justify-between mb-4">
						<div className="space-y-1">
							<span className="text-sm font-semibold tracking-wider text-primary uppercase">
								Vraag {currentQuestion + 1}
							</span>
							<h2 className="text-sm text-slate-500 font-medium">
								Van de {questions.length}
							</h2>
						</div>
						<span className="text-4xl font-black text-slate-200 dark:text-slate-800 tabular-nums leading-none">
							0{currentQuestion + 1}
						</span>
					</div>
				</div>

				<div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 p-8 md:p-12 animate-fade-in relative overflow-hidden">
					{/* Decorative subtle background inside card */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-slate-800/50 rounded-bl-full -mr-16 -mt-16 -z-0 pointer-events-none transition-colors duration-500"></div>

					<div className="mb-10 relative z-10">
						<h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
							{questions[currentQuestion].question}
						</h2>
					</div>

					<div className="grid grid-cols-1 gap-4 relative z-10">
						{questions[currentQuestion].options.map((option, index) => {
							const isSelected = answers[currentQuestion] === index;

							return (
								<button
									key={index}
									onClick={() => handleOptionSelect(index)}
									className={`
                                    group w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden
                                    ${isSelected
											? "border-primary bg-primary/5 shadow-md shadow-primary/10"
											: "border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
										}
                                `}
								>
									<div className="flex items-center gap-6">
										<div
											className={`
                                        flex-shrink-0 h-10 w-10 rounded-xl border flex items-center justify-center text-sm font-bold transition-all duration-300
                                        ${isSelected
													? "border-primary bg-primary text-white scale-110 shadow-lg shadow-primary/20"
													: "border-slate-200 dark:border-slate-700 text-slate-400 bg-white dark:bg-slate-950 group-hover:border-blue-300 group-hover:text-blue-500"
												}
                                        `}
										>
											{String.fromCharCode(65 + index)}
										</div>

										<span
											className={`font-medium text-lg flex-1 transition-colors duration-300 ${isSelected
												? "text-primary font-semibold"
												: "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
												}`}
										>
											{option}
										</span>

										<div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-primary' : 'border-slate-200 dark:border-slate-700 group-hover:border-blue-300'}`}>
											<div className={`w-3 h-3 rounded-full bg-primary transition-transform duration-300 ${isSelected ? 'scale-100' : 'scale-0'}`} />
										</div>
									</div>
								</button>
							)
						})}
					</div>

					<div className="mt-12 flex justify-end items-center gap-4 relative z-10">
						{currentQuestion > 0 && (
							<Button
								variant="ghost"
								onClick={() => setCurrentQuestion(prev => prev - 1)}
								className="text-slate-500 hover:text-slate-900"
							>
								Vorige
							</Button>
						)}
						<Button
							onClick={handleNext}
							disabled={answers[currentQuestion] === -1}
							className="gap-2 px-8 h-12 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
							size="lg"
						>
							{currentQuestion === questions.length - 1
								? "Afronden"
								: "Volgende Vraag"}
							<ChevronRight className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Assessment;
