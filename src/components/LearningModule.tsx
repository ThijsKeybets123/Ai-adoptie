import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    ExternalLink,
    Clock,
    Signal,
    CheckCircle2,
    Circle,
    PlayCircle,
    Building,
    Briefcase
} from "lucide-react";

type CourseStatus = 'not-started' | 'in-progress' | 'completed';

interface Course {
    id: string;
    title: string;
    provider: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    url: string;
    tags?: string[];
}

interface LearningPath {
    id: string;
    label: string;
    size: 'small' | 'medium' | 'large';
    description: string;
    courses: Course[];
    tracks?: {
        name: string;
        courses: Course[];
    }[];
}

const learningPaths: LearningPath[] = [
    {
        id: 'small',
        label: 'Klein Bedrijf (1-20)',
        size: 'small',
        description: 'Focus op basiskennis en directe praktische toepassing.',
        courses: [
            {
                id: 's1',
                title: 'Elements of AI',
                provider: 'University of Helsinki',
                description: 'Een gratis online cursus voor iedereen die wil begrijpen wat AI is, wat er mogelijk mee is en hoe het ons leven beïnvloedt.',
                level: 'Beginner',
                duration: '6 weken (30 uur)',
                url: 'https://www.elementsofai.com',
                tags: ['Gratis', 'Basiskennis']
            },
            {
                id: 's2',
                title: 'Generative AI & ChatGPT',
                provider: 'Udemy / LinkedIn',
                description: 'Leer hoe je tools zoals ChatGPT effectief inzet voor content creatie, e-mail en brainstorming.',
                level: 'Beginner',
                duration: '4 uur',
                url: 'https://www.udemy.com',
                tags: ['Praktisch', 'Prompting']
            }
        ]
    },
    {
        id: 'medium',
        label: 'Middelgroot (20-250)',
        size: 'medium',
        description: 'Uniforme basiskennis voor iedereen, plus specifieke verdieping per rol.',
        courses: [
            {
                id: 'm1',
                title: 'AI for Everyone',
                provider: 'Coursera (Andrew Ng)',
                description: 'Een niet-technische cursus om AI te begrijpen en te spotten waar je het in je bedrijf kunt toepassen.',
                level: 'Beginner',
                duration: '10 uur',
                url: 'https://www.coursera.org/learn/ai-for-everyone',
                tags: ['Management', 'Strategy']
            }
        ],
        tracks: [
            {
                name: 'Marketing & Sales',
                courses: [
                    {
                        id: 'm_mark1',
                        title: 'GenAI voor Marketing',
                        provider: 'LinkedIn Learning',
                        description: 'Creëer campagnes en content sneller met AI-tools.',
                        level: 'Intermediate',
                        duration: '2 uur',
                        url: 'https://www.linkedin.com/learning',
                    }
                ]
            },
            {
                name: 'Operations & Finance',
                courses: [
                    {
                        id: 'm_ops1',
                        title: 'AI Fundamentals & Automation',
                        provider: 'Microsoft Learn',
                        description: 'Automatiseer processen met Power Platform en AI Builder.',
                        level: 'Intermediate',
                        duration: '5 uur',
                        url: 'https://learn.microsoft.com/training',
                    }
                ]
            },
            {
                name: 'Management',
                courses: [
                    {
                        id: 'm_mgmt1',
                        title: 'AI Strategy & Business Impact',
                        provider: 'Coursera',
                        description: 'Leer strategische beslissingen nemen rondom AI-implementaties.',
                        level: 'Advanced',
                        duration: '12 uur',
                        url: 'https://www.coursera.org',
                    }
                ]
            }
        ]
    },
    {
        id: 'large',
        label: 'Groot Bedrijf (250+)',
        size: 'large',
        description: 'Schaalbare adoptie, governance en gespecialiseerde tracks.',
        courses: [
            {
                id: 'l1',
                title: 'AI for Everyone',
                provider: 'Coursera',
                description: 'De standaard voor organisatie-brede AI-geletterdheid.',
                level: 'Beginner',
                duration: '10 uur',
                url: 'https://www.coursera.org',
                tags: ['Basis', 'Must-do']
            },
            {
                id: 'l2',
                title: 'Microsoft AI Fundamentals',
                provider: 'Microsoft',
                description: 'Officiële certificering voor cloud- en AI-concepten.',
                level: 'Beginner',
                duration: '8 uur',
                url: 'https://learn.microsoft.com/training',
                tags: ['Certificering']
            }
        ],
        tracks: [
            {
                name: 'Business & Strategie',
                courses: [
                    { id: 'l_strat1', title: 'Leading in the Age of AI', provider: 'HBS Online', description: 'Strategisch leiderschap.', level: 'Advanced', duration: '20 uur', url: 'https://www.hbs.edu' }
                ]
            },
            {
                name: 'Data & IT',
                courses: [
                    { id: 'l_tech1', title: 'Machine Learning Specialization', provider: 'Coursera', description: 'Technische diepgang.', level: 'Advanced', duration: '3 maanden', url: 'https://www.coursera.org' }
                ]
            },
            {
                name: 'HR, Legal & Compliance',
                courses: [
                    { id: 'l_legal1', title: 'AI Ethics & Governance', provider: 'Udemy', description: 'Compliance met de EU AI Act.', level: 'Intermediate', duration: '5 uur', url: 'https://www.udemy.com' }
                ]
            }
        ]
    }
];

export const LearningModule = () => {
    const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('small');
    const [progress, setProgress] = useState<Record<string, CourseStatus>>({});

    // Load progress from local storage
    useEffect(() => {
        const stored = localStorage.getItem('learningProgress');
        if (stored) {
            setProgress(JSON.parse(stored));
        }
    }, []);

    const updateStatus = (courseId: string, status: CourseStatus) => {
        const newProgress = { ...progress, [courseId]: status };
        setProgress(newProgress);
        localStorage.setItem('learningProgress', JSON.stringify(newProgress));
    };

    const getStatusIcon = (status: CourseStatus) => {
        if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
        if (status === 'in-progress') return <PlayCircle className="h-5 w-5 text-blue-500" />;
        return <Circle className="h-5 w-5 text-slate-300" />;
    };

    const currentPath = learningPaths.find(p => p.size === selectedSize)!;

    const CourseCard = ({ course }: { course: Course }) => {
        const status = progress[course.id] || 'not-started';

        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
                        {course.provider}
                    </span>
                    <div className="flex gap-2">
                        {/* Status Selector (Simulated) */}
                        <select
                            value={status}
                            onChange={(e) => updateStatus(course.id, e.target.value as CourseStatus)}
                            className="text-xs border-none bg-transparent text-slate-500 focus:ring-0 cursor-pointer"
                        >
                            <option value="not-started">Niet gestart</option>
                            <option value="in-progress">Bezig</option>
                            <option value="completed">Afgerond</option>
                        </select>
                        {getStatusIcon(status)}
                    </div>
                </div>

                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
                    {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Signal className="h-3 w-3" />
                        {course.level}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full gap-2 border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    onClick={() => window.open(course.url, '_blank')}
                >
                    Start Cursus
                    <ExternalLink className="h-3 w-3" />
                </Button>
            </div>
        );
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Learning & Development</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
                        Aanbevolen leerpaden om jouw AI-kennis en die van je organisatie te vergroten.
                    </p>
                </div>

                {/* Size Selector */}
                <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 flex">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`
                                px-4 py-2 text-sm font-medium rounded-md transition-all
                                ${selectedSize === size
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'}
                            `}
                        >
                            {size === 'small' && 'Klein (1-20)'}
                            {size === 'medium' && 'Middel (20-250)'}
                            {size === 'large' && 'Groot (250+)'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="animate-fade-in">
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 w-fit px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Building className="h-4 w-4 text-slate-400" />
                    {currentPath.description}
                </div>

                <div className="space-y-8">
                    {/* Core Courses */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-indigo-500" />
                            Basisopleidingen
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentPath.courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>

                    {/* Tracks (if any) */}
                    {currentPath.tracks && (
                        <div>
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 mt-8">
                                <Briefcase className="h-5 w-5 text-emerald-500" />
                                Verdieping per rol
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {currentPath.tracks.map((track, idx) => (
                                    <div key={idx} className="bg-white/50 dark:bg-slate-900/50 rounded-xl p-4 border border-dashed border-slate-300 dark:border-slate-700">
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">{track.name}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {track.courses.map((course) => (
                                                <CourseCard key={course.id} course={course} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 text-center">
                <Button variant="ghost" className="text-sm text-slate-500">
                    + Voeg interne training toe (Demo)
                </Button>
            </div>
        </div>
    );
};

// Simple helper icon component
const GraduationCap = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);
