import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, BarChart3, Brain, Zap, Shield, HelpCircle, ArrowRight } from "lucide-react";

export const ReadinessScan = () => {
    // ---- Data Definition ----
    const domains = [
        {
            id: 0,
            title: "Basisbegrip van AI",
            shortTitle: "Basis",
            icon: HelpCircle,
            color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20",
            barColor: "bg-blue-600",
            questions: [
                "Ik begrijp globaal wat AI is.",
                "Ik weet dat AI fouten of vooroordelen kan hebben.",
                "Ik weet dat AI gegevens nodig heeft om goed te werken."
            ]
        },
        {
            id: 1,
            title: "AI in mijn dagelijkse werk",
            shortTitle: "Werk",
            icon: Zap,
            color: "text-amber-600 bg-amber-100 dark:bg-amber-900/20",
            barColor: "bg-amber-600",
            questions: [
                "Ik gebruik wel eens AI-tools, zoals ChatGPT of Copilot.",
                "Ik herken taken waarbij AI mij tijd kan besparen.",
                "Ik weet ook bij welke taken AI minder goed werkt."
            ]
        },
        {
            id: 2,
            title: "Vaardigheden in gebruik",
            shortTitle: "Skills",
            icon: Brain,
            color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20",
            barColor: "bg-purple-600",
            questions: [
                "Ik kan een duidelijke vraag of opdracht formuleren voor een AI-tool.",
                "Ik kan AI gebruiken voor eenvoudige taken (schrijven, samenvatten).",
                "Ik voel me comfortabel om nieuwe AI-tools uit te proberen."
            ]
        },
        {
            id: 3,
            title: "Bewustzijn & Risico’s",
            shortTitle: "Risico's",
            icon: Shield,
            color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20",
            barColor: "bg-emerald-600",
            questions: [
                "Ik begrijp dat AI door mensen gecontroleerd moet worden.",
                "Ik weet dat organisaties regels hebben voor verantwoord AI-gebruik.",
                "Ik weet dat ik voorzichtig moet omgaan met gevoelige informatie."
            ]
        }
    ];

    // ---- State ----
    const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
    const [isInterimResult, setIsInterimResult] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    // Store answers as: { "domainIndex-questionIndex": value (1-5) }
    const [answers, setAnswers] = useState<Record<string, number>>({});

    // ---- Logic ----
    const handleOptionSelect = (qIdx: number, val: number) => {
        setAnswers(prev => ({ ...prev, [`${currentDomainIndex}-${qIdx}`]: val }));
    };

    const isDomainComplete = () => {
        const currentQs = domains[currentDomainIndex].questions;
        for (let i = 0; i < currentQs.length; i++) {
            if (!answers[`${currentDomainIndex}-${i}`]) return false;
        }
        return true;
    };

    const calculateDomainScore = (dIdx: number) => {
        let sum = 0;
        const count = domains[dIdx].questions.length;
        for (let i = 0; i < count; i++) {
            sum += (answers[`${dIdx}-${i}`] || 0);
        }
        return (sum / count).toFixed(1); // Returns string like "3.5"
    };

    const getInterpretation = (score: number) => {
        if (score < 2.5) return { label: "Beginner", desc: "Je hebt een basisintroductie nodig.", color: "text-amber-600" };
        if (score < 3.5) return { label: "Opkomend", desc: "Goed op weg, maar praktische begeleiding helpt.", color: "text-blue-600" };
        return { label: "Gevorderd", desc: "Je kunt AI zelfstandig toepassen!", color: "text-emerald-600" };
    };

    const handleNext = () => {
        if (!isInterimResult) {
            // Show result for this domain
            setIsInterimResult(true);
        } else {
            // Move to next domain or finish
            if (currentDomainIndex < domains.length - 1) {
                setCurrentDomainIndex(prev => prev + 1);
                setIsInterimResult(false);
                window.scrollTo(0, 0);
            } else {
                setIsFinished(true);
                window.scrollTo(0, 0);
            }
        }
    };

    // ---- Simple Charts Components (SVG) ----
    const CircularProgress = ({ score, color }: { score: number, color: string }) => {
        // score 1-5 mapped to 0-100
        const percentage = (score / 5) * 100;
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative h-32 w-32 flex items-center justify-center">
                <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-800" />
                    <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} className={`transition-all duration-1000 ${color}`} />
                </svg>
                <div className="absolute text-2xl font-bold">{score}</div>
            </div>
        );
    };

    const BarChart = ({ scores }: { scores: number[] }) => {
        const max = 5;
        return (
            <div className="flex items-end justify-between h-56 w-full gap-3 pt-6 px-2">
                {scores.map((s, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                        {/* Bar Container */}
                        <div className="relative w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden h-full flex items-end ring-1 ring-slate-200 dark:ring-slate-700">
                            {/* Fill */}
                            <div
                                className={`w-full transition-all duration-1000 ease-out rounded-full ${domains[idx].barColor}`}
                                style={{ height: `${(s / max) * 100}%` }}
                            />
                        </div>
                        {/* Score Badge */}
                        <div className="mt-[-12px] z-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-md px-2 py-0.5 text-xs font-bold mb-2">
                            {s}
                        </div>
                        {/* Label */}
                        <span className="text-xs text-center font-bold text-slate-500 uppercase tracking-wide">
                            {domains[idx].shortTitle}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    // ---- Render: Final Dashboard ----
    if (isFinished) {
        const domainScores = domains.map((d) => parseFloat(calculateDomainScore(d.id)));
        const totalAverage = (domainScores.reduce((a, b) => a + b, 0) / domains.length).toFixed(1);

        return (
            <section className="py-12 bg-slate-50 dark:bg-slate-950 min-h-[600px] animate-fade-in">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-full shadow-lg mb-6">
                            <CheckCircle2 className="h-12 w-12 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Assessment Compleet!</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">Hier is jouw persoonlijke AI-profiel.</p>
                    </div>

                    {/* Main Score Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 mb-12 border border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">Totale AI-Readiness Score</h3>
                                <div className="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                    {totalAverage} <span className="text-2xl text-slate-400">/ 5.0</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {Number(totalAverage) > 3.5
                                        ? "Geweldig! Je bent een voorloper. Je snapt AI en past het toe. Tijd om anderen te inspireren."
                                        : Number(totalAverage) > 2.5
                                            ? "Goed bezig. Je ziet de kansen, maar hebt nog wat gerichte oefening nodig om echt confident te worden."
                                            : "Je staat aan het begin. Geen zorgen, AI is een vaardigheid die je stap voor stap kunt leren."}
                                </p>
                            </div>
                            <div className="w-full md:w-1/3">
                                <h4 className="text-center font-bold mb-4 text-slate-500">Domein Scores</h4>
                                <BarChart scores={domainScores} />
                            </div>
                        </div>
                    </div>

                    {/* Detailed Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {domains.map((d, idx) => {
                            const score = domainScores[idx];
                            const inter = getInterpretation(score);
                            const Icon = d.icon;

                            return (
                                <div key={d.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-4 rounded-2xl ${d.color} bg-opacity-20`}>
                                            <Icon className="h-8 w-8" />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-3xl font-black text-slate-900 dark:text-white">{score}</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Score</div>
                                        </div>
                                    </div>

                                    <h4 className="font-bold text-xl mb-1 text-slate-900 dark:text-white">{d.title}</h4>
                                    <div className={`text-sm font-bold mb-6 ${inter.color} uppercase tracking-wide`}>{inter.label}</div>

                                    <div className="mt-auto">
                                        <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                                            <span>Beginner</span>
                                            <span>Expert</span>
                                        </div>
                                        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                            <div
                                                className={`h-full ${d.color.split(' ')[0].replace('text', 'bg')} transition-all duration-1000 ease-out relative`}
                                                style={{ width: `${(score / 5) * 100}%` }}
                                            >
                                                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white/50" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center">
                        <Button onClick={() => window.location.reload()} variant="outline" size="lg" className="rounded-xl">
                            Nogmaals doen
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    // ---- Render: Flow (Result or Question) ----
    const currentDomain = domains[currentDomainIndex];

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-950 min-h-[600px] transition-all duration-500">
            <div className="container mx-auto px-4 max-w-3xl">

                {/* Modern Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Voortgang</span>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Domein {currentDomainIndex + 1} van {domains.length}</h2>
                        </div>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {Math.round(((currentDomainIndex) / domains.length) * 100)}%
                        </span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${((currentDomainIndex) / domains.length) * 100 + (isInterimResult ? 25 : 0)}%` }}
                        />
                    </div>
                </div>

                {isInterimResult ? (
                    // ---- Interim Domain Result ----
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center shadow-xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
                        <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${currentDomain.color}`}>
                            <currentDomain.icon className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Domein Voltooid!</h2>
                        <h3 className="text-xl text-slate-500 mb-8">{currentDomain.title}</h3>

                        <div className="flex justify-center mb-8">
                            <CircularProgress score={parseFloat(calculateDomainScore(currentDomainIndex))} color={currentDomain.color.split(' ')[0]} />
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 mb-8 max-w-md mx-auto">
                            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                                {getInterpretation(parseFloat(calculateDomainScore(currentDomainIndex))).desc}
                            </p>
                        </div>

                        <Button onClick={handleNext} size="lg" className="rounded-xl px-8 h-12 text-lg">
                            {currentDomainIndex < domains.length - 1 ? "Verder naar volgend domein" : "Bekijk Eindrapport"}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                ) : (
                    // ---- Questions Form ----
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 animate-fade-in relative overflow-hidden">
                        {/* Header of Domain */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                            <div className={`p-4 rounded-2xl ${currentDomain.color}`}>
                                <currentDomain.icon className="h-8 w-8" />
                            </div>
                            <div>
                                <span className="uppercase tracking-wider text-xs font-bold text-slate-400">Domein {currentDomainIndex + 1}/{domains.length}</span>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{currentDomain.title}</h2>
                            </div>
                        </div>

                        {/* Questions List */}
                        <div className="space-y-8">
                            {currentDomain.questions.map((q, qIdx) => {
                                const val = answers[`${currentDomainIndex}-${qIdx}`];
                                return (
                                    <div key={qIdx} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl transition-all hover:shadow-md">
                                        <p className="font-semibold text-lg leading-relaxed text-slate-800 dark:text-slate-200 mb-6">
                                            {q}
                                        </p>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center gap-2">
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <button
                                                        key={num}
                                                        onClick={() => handleOptionSelect(qIdx, num)}
                                                        className={`
                                                            flex-1 h-12 md:h-14 rounded-xl font-bold text-lg transition-all duration-200 border-2
                                                            ${val === num
                                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105 transform'
                                                                : 'bg-white dark:bg-slate-900 border-transparent text-slate-400 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'}
                                                        `}
                                                    >
                                                        {num}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex justify-between text-xs font-medium text-slate-400 px-1 mt-2">
                                                <span>Helemaal oneens</span>
                                                <span>Helemaal eens</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 flex justify-end">
                            <Button
                                onClick={handleNext}
                                disabled={!isDomainComplete()}
                                size="lg"
                                className="px-8 h-12 text-lg rounded-xl shadow-lg shadow-primary/20"
                            >
                                Volgend
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
