import React from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface BenefitDialogProps {
    open: boolean
    onOpenChange?: (open: boolean) => void
    title: string
    icon?: any
    description: string
    details?: string[]
}

export const BenefitDialog: React.FC<BenefitDialogProps> = ({
    open,
    onOpenChange,
    title,
    icon: Icon,
    description,
    details
}) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => onOpenChange?.(false)}>
            <div
                className="relative z-50 w-full max-w-lg gap-4 border bg-card p-6 shadow-lg rounded-xl animate-in fade-in-0 zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={() => onOpenChange?.(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

                <div className="flex flex-col space-y-4 sm:text-left mb-4">
                    <div className="flex items-center gap-3 font-semibold leading-none tracking-tight text-xl">
                        <div className={`p-3 rounded-xl bg-primary/10 text-primary`}>
                            {Icon ? <Icon className="h-6 w-6" /> : null}
                        </div>
                        {title}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-muted-foreground text-base leading-relaxed">{description}</p>

                    {details && details.length > 0 && (
                        <div className="pt-2 space-y-3">
                            <h4 className="font-medium text-foreground">Wat levert dit op?</h4>
                            <ul className="grid gap-2">
                                {details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-8">
                    <Button
                        variant="primary"
                        onClick={() => onOpenChange?.(false)}
                    >
                        Begrepen
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BenefitDialog
