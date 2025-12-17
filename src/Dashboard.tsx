import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  FileText,
  CheckCircle2,
  Home,
  Users,
  Building2
} from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [score, setScore] = useState(42);
  const [level, setLevel] = useState("Explorer");
  const [userCategory, setUserCategory] = useState("Late Majority");
  const [employeeScore, setEmployeeScore] = useState<string | null>(null);

  useEffect(() => {
    const storedScore = localStorage.getItem("assessmentScore");
    const storedLevel = localStorage.getItem("assessmentLevel");
    const storedCategory = localStorage.getItem("rogersCategory");
    const storedEmployeeScore = localStorage.getItem("employeeAssessmentScore");

    if (storedScore) setScore(parseInt(storedScore));
    if (storedLevel) setLevel(storedLevel);
    if (storedCategory) setUserCategory(storedCategory);
    if (storedEmployeeScore) setEmployeeScore(storedEmployeeScore);
  }, []);

  const rogersCategories = [
    { name: "Innovators", width: "2.5%", color: "bg-indigo-400", description: "Visionairs (2.5%)" },
    { name: "Early Adopters", width: "13.5%", color: "bg-blue-400", description: "Opinieleiders (13.5%)" },
    { name: "Early Majority", width: "34%", color: "bg-cyan-400", description: "Pragmatici (34%)" },
    { name: "Late Majority", width: "34%", color: "bg-emerald-500", description: "Sceptici (34%)" },
    { name: "Laggards", width: "16%", color: "bg-orange-400", description: "Traditionalisten (16%)" },
  ];



  // Mock data for dashboard
  const recentActivity = [
    { id: 1, action: "Nulmeting afgerond", date: "2 dagen geleden", icon: FileText },
    { id: 2, action: "Strategie document gedownload", date: "1 week geleden", icon: Award },
    { id: 3, action: "Ingelogd", date: "Zojuist", icon: Clock },
  ];



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Mijn Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
            <span className="text-sm text-muted-foreground">
              Ingelogd als <span className="font-medium text-foreground">{user?.name || user?.email}</span>
            </span>
            <Button variant="outline" size="sm" onClick={() => {
              logout();
              navigate("/");
            }}>
              Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Welcome Section */}
          <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white shadow-lg animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-2">Welkom terug, {user?.name?.split(' ')[0] || 'Gebruiker'}!</h2>
            <p className="text-blue-100 max-w-2xl mb-6">
              Je bent goed op weg met de AI-transformatie. Bekijk je voortgang en de volgende stappen om je organisatie naar het volgende niveau te tillen.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => navigate('/assessment')}>
                Nieuwe nulmeting
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => navigate('/')}>
                Bekijk strategieën
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">AI Volwassenheid</h3>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{level}</div>
            <p className="text-sm text-muted-foreground">Laatste score: {score}%</p>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-1000 ease-out" style={{ width: `${score}%` }} />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Voltooide Acties</h3>
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">3/8</div>
            <p className="text-sm text-muted-foreground">Je ligt op schema</p>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[37%]" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Rogers Categorie</h3>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {hoveredCategory ? hoveredCategory : userCategory}
            </div>
            <p className="text-sm text-muted-foreground h-5">
              {hoveredCategory
                ? rogersCategories.find(c => c.name === hoveredCategory)?.description
                : (
                  <span>
                    {rogersCategories.find(c => c.name === userCategory)?.description}
                    <span className="text-xs opacity-70 ml-2">(Uw score)</span>
                  </span>
                )
              }
            </p>
            <div
              className="mt-4 flex gap-1 h-6 rounded-full overflow-hidden bg-secondary cursor-help"
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {rogersCategories.map((category) => (
                <div
                  key={category.name}
                  className={`h-full ${category.color} transition-all duration-200 ${hoveredCategory === category.name || (!hoveredCategory && userCategory === category.name)
                    ? "opacity-100 scale-105"
                    : "opacity-30 hover:opacity-80"
                    }`}
                  style={{ width: category.width }}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  title={category.description}
                />
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Certificaten</h3>
              <Award className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">1</div>
            <p className="text-sm text-muted-foreground">AI Basics behaald</p>
            <Button variant="ghost" size="sm" className="mt-2 -ml-2 text-primary h-auto p-2">
              Bekijk certificaat <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-1 lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Recente Activiteit</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Results Overview */}
          <div className="md:col-span-1 lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Mijn Resultaten</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Organization Scan Result */}
              <div className="border border-border rounded-xl p-4 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Organisatie Scan</h4>
                    <p className="text-xs text-muted-foreground">Strategische AI-volwassenheid</p>
                  </div>
                </div>

                {score ? (
                  <div className="mt-2">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-black text-blue-600">{score}%</span>
                      <span className="text-sm font-medium text-foreground">{level}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-center">
                    <p className="text-sm text-muted-foreground mb-3">Nog niet afgerond</p>
                    <Button variant="outline" size="sm" onClick={() => navigate('/assessment')} className="w-full">
                      Start Scan
                    </Button>
                  </div>
                )}
              </div>

              {/* Employee Scan Result */}
              <div className="border border-border rounded-xl p-4 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Medewerker Scan</h4>
                    <p className="text-xs text-muted-foreground">Persoonlijke AI-vaardigheden</p>
                  </div>
                </div>

                {employeeScore ? (
                  <div className="mt-2">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-black text-emerald-600">{employeeScore}</span>
                      <span className="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                    <div className="flex gap-1 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`flex-1 transition-colors ${parseFloat(employeeScore) >= s ? 'bg-emerald-500' : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-center">
                    <p className="text-sm text-muted-foreground mb-3">Nog niet afgerond</p>
                    <Button variant="outline" size="sm" onClick={() => navigate('/assessment')} className="w-full">
                      Start Scan
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
