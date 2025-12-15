import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Send } from "lucide-react";

export const ReadinessScan = () => {
    const [submitted, setSubmitted] = useState(false);

    // Placeholder for future logic
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hier kan later de score-berekening komen
        setSubmitted(true);
    };

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
                            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                                <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2 className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Bedankt voor het invullen!</h3>
                                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                                    In de volledige versie van ons platform krijg je hier direct je persoonlijke AI-readiness score, inclusief een advies op maat en aanbevolen trainingen.
                                </p>
                                <Button
                                    onClick={() => setSubmitted(false)}
                                    variant="outline"
                                >
                                    Scan opnieuw doen
                                </Button>
                            </div>
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
        </section>
    );
};
