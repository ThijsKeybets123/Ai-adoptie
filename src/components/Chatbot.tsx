import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const predefinedResponses: Record<string, string> = {
  'hallo': "Hallo! Ik ben je AI-coach voor FMCG-innovatie. Waar kan ik je mee helpen?",
  'hoi': "Hoi! Leuk dat je er bent. Heb je vragen over AI in FMCG?",
  'barriere': "De belangrijkste barrières zijn gebrek aan urgentie, kennistekort, angst, strategie, privacy en ROI. Welke speelt bij jullie?",
  'strategie': "We adviseren 5 strategieën: Top-down visie, Training, Communicatie, Quick wins en Procesintegratie.",
  'roi': "ROI is vaak lastig vooraf te bepalen. Begin klein, meet tijdsbesparing en kwaliteit, en schaal dan op.",
  'privacy': "Privacy is cruciaal. Zorg voor duidelijke richtlijnen en gebruik enterprise-versies van tools die data niet gebruiken voor training.",
  'pilot': "Een pilot starten is een goed idee! Kies een proces met lage complexiteit maar hoge impact. Hulp nodig bij de selectie?",
  'default': "Interessante vraag. Ik ben gespecialiseerd in AI-adoptie binnen FMCG. Kun je je vraag iets specifieker stellen over barrières, strategieën of cases?"
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hallo! Ik ben de AI Adoptie Coach. Heb je vragen over hoe je AI kunt implementeren in jouw FMCG-organisatie?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('hallo') || lowerInput.includes('hoi')) return predefinedResponses['hallo']
    if (lowerInput.includes('barriere') || lowerInput.includes('probleem') || lowerInput.includes('lastig')) return predefinedResponses['barriere']
    if (lowerInput.includes('strategie') || lowerInput.includes('aanpak') || lowerInput.includes('hoe')) return predefinedResponses['strategie']
    if (lowerInput.includes('roi') || lowerInput.includes('geld') || lowerInput.includes('kosten') || lowerInput.includes('baten')) return predefinedResponses['roi']
    if (lowerInput.includes('privacy') || lowerInput.includes('data') || lowerInput.includes('veiligheid')) return predefinedResponses['privacy']
    if (lowerInput.includes('pilot') || lowerInput.includes('starten') || lowerInput.includes('beginnen')) return predefinedResponses['pilot']
    
    return predefinedResponses['default']
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate network delay
    setTimeout(() => {
      const botResponseText = getBotResponse(userMessage.text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {!isOpen && (
        <div className="animate-fade-in rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur border border-slate-200">
          Hulp nodig? Praat met onze AI coach 👋
        </div>
      )}
      
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-4 text-base font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-indigo-500/25"
        >
          <MessageCircle className="h-6 w-6" />
          <span>Start chat</span>
        </button>
      ) : (
        <div className="flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Adoptie Coach</h3>
                <p className="text-xs text-white/80">Online • Antwoordt direct</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 bg-white p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Stel je vraag..."
                className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
              />
              <Button 
                onClick={handleSend}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 px-3"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
