import React from 'react'
import { X } from 'lucide-react'

export const BarrierDialog: React.FC<{
  open: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  icon?: any
  description: string
  example?: string
  stats?: string
}> = ({ open, onOpenChange, title, icon: Icon, description, example, stats }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange?.(false)}>
      <div 
        className="relative z-50 w-full max-w-lg gap-4 border bg-card p-6 shadow-lg sm:rounded-lg animate-in fade-in-0 zoom-in-95" 
        onClick={(e)=>e.stopPropagation()}
      >
        <button 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => onOpenChange?.(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <div className="flex items-center gap-2 font-semibold leading-none tracking-tight text-lg">
            {Icon ? <Icon className="h-5 w-5 text-primary" /> : null}
            {title}
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{description}</p>
          
          {example && (
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm font-medium mb-1">Voorbeeld:</p>
              <p className="text-sm text-muted-foreground">{example}</p>
            </div>
          )}
          
          {stats && (
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <span>📊</span>
              {stats}
            </div>
          )}
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
          <button 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            onClick={() => onOpenChange?.(false)}
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  )
}

export default BarrierDialog
