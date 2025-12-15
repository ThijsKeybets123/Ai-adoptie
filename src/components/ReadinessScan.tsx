import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Send, Home } from "lucide-react";

export const ReadinessScan = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const questions = [
        {
            id: 1,
            question: "Hoe vaak gebruik je nu AI-tools (zoals ChatGPT) in je werk?",
            options: ["Dagelijks", "Wekelijks", "Zelden", "Nooit"]
        },
        {
            id: 2,
            question: "Hoe comfortabel voel je je met nieuwe technologie?",
            options: ["Zeer comfortabel", "Comfortabel", "Neutraal", "Ongemakkelijk"]
        },
        {
            id: 3,
            question: "In hoeverre begrijp je de basisprincipes van AI?",
            options: ["Ik kan het uitleggen aan anderen", "Ik snap de grote lijnen", "Ik heb er vaag van gehoord", "Geen idee"]
        },
        {
            id: 4,
            question: "Zie je AI-kansen in je eigen werkproces?",
            options: ["Volop, ik heb al ideeën", "Ik zie enkele mogelijkheden", "Nauwelijks", "Ik weet niet waar ik moet kijken"]
        },
        {
            id: 5,
            question: "Ben je bereid tijd te investeren om met AI te leren werken?",
            options: ["Ja, graag!", "Als mijn baas het vraagt", "Liever niet", "Ik heb hier echt geen tijd voor"]
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleOptionChange = (questionId: number, optionIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const calculateScore = () => {
        let totalScore = 0;
        const maxScore = questions.length * 3;

        // Optie 0 = 3 punten, Optie 1 = 2 punten, etc.
        Object.values(answers).forEach((val) => {
            totalScore += (3 - val);
        });

        return Math.round((totalScore / maxScore) * 100);
    };

    const getPersona = (score: number) => {
        if (score >= 80) return { title: "AI Ambassadeur", color: "text-emerald-600", desc: "Je bent helemaal klaar om AI te leiden en anderen te inspireren!" };
        if (score >= 60) return { title: "AI Enthusiast", color: "text-blue-600", desc: "Je ziet de waarde en hebt een goede basis. Tijd voor verdieping." };
        if (score >= 40) return { title: "AI Explorer", color: "text-amber-600", desc: "Je bent nieuwsgierig maar hebt nog wat begeleiding nodig." };
        return { title: "AI Starter", color: "text-slate-600", desc: "AI is nieuw voor je. Begin met de basis en ontdek wat het kan doen." };
    };

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Doe de AI Readiness Scan
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Ontdek binnen 1 minuut waar je staat.
                        </p>
                    </div>

                    <div className="bg-card border border-border/50 rounded-2xl shadow-sm p-8 md:p-10">
                        {submitted ? (
                            (() => {
                                const score = calculateScore();
                                const persona = getPersona(score);
                                return (
                                    <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                                        <div className="mb-8 relative inline-block">
                                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                                            <div className="relative h-32 w-32 rounded-full border-8 border-primary/20 flex items-center justify-center mx-auto bg-background">
                                                <span className="text-3xl font-black text-primary">{score}%</span>
                                            </div>
                                        </div>

                                        <h3 className={`text-3xl font-bold mb-2 ${persona.color}`}>{persona.title}</h3>
                                        <p className="text-xl text-foreground font-medium mb-6">Jouw AI Readiness Score</p>

                                        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
                                            {persona.desc}
                                        </p>

                                        <div className="bg-muted/50 p-6 rounded-xl mb-8">
                                            <h4 className="font-semibold mb-2 text-foreground">Aanbevolen Training:</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {score < 50 ? "Start met onze basismodule 'AI Fundamentals' om vertrouwd te raken." : "Bekijk onze 'Advanced Prompting' sessies om je skills naar een hoger niveau te tillen."}
                                            </p>
                                        </div>

                                        <Button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setAnswers({});
                                            }}
                                            variant="outline"
                                            size="lg"
                                        >
                                            Scan opnieuw doen
                                        </Button>
                                    </div>
                                );
                            })()
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {questions.map((q) => (
                                    <div key={q.id} className="space-y-3">
                                        <label className="text-lg font-medium text-foreground block">
                                            {q.id}. {q.question}
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {q.options.map((option, idx) => (
                                                <div key={idx} className="relative">
                                                    <input
                                                        type="radio"
                                                        name={`question-${q.id}`}
                                                        id={`q${q.id}-opt${idx}`}
                                                        className="peer sr-only"
                                                        required
                                                        onChange={() => handleOptionChange(q.id, idx)}
                                                        checked={answers[q.id] === idx}
                                                    />
                                                    <label
                                                        htmlFor={`q${q.id}-opt${idx}`}
                                                        className="flex items-center justify-between p-4 rounded-xl border border-input bg-background hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary cursor-pointer transition-all duration-200"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        className="w-full md:w-auto text-lg px-8 py-6"
                                        size="lg"
                                    >
                                        Bekijk je score
                                        <Send className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );
};
