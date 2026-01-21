import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, DollarSign, Link as LinkIcon, Target, Calculator, Trophy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const COMMISSION_PERCENTAGES: Record<number, number> = {
  1: 0.30,
  2: 0.20,
  3: 0.10,
  4: 0.05,
  5: 0.03,
  6: 0.015,
  7: 0.01,
  8: 0.005,
  9: 0.0025,
  10: 0.001
};

export default function Dashboard() {
  const [simulationAmount, setSimulationAmount] = useState<number>(1000);
  const [simulationLevel, setSimulationLevel] = useState<number>(1);

  const calculateCommission = (amount: number, level: number) => {
    const percentage = COMMISSION_PERCENTAGES[level] || 0;
    return amount * percentage;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-display font-bold mb-8 text-slate-900">Mi Dashboard</h1>
          
          <Tabs defaultValue="resumen" className="space-y-8">
            <TabsList className="bg-white border shadow-sm p-1 rounded-xl h-auto flex-wrap gap-1">
              <TabsTrigger value="resumen" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="red" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <Users className="h-4 w-4 mr-2" />
                Mi Red
              </TabsTrigger>
              <TabsTrigger value="ganancias" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <DollarSign className="h-4 w-4 mr-2" />
                Ganancias
              </TabsTrigger>
              <TabsTrigger value="referido" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <LinkIcon className="h-4 w-4 mr-2" />
                Link de Referido
              </TabsTrigger>
              <TabsTrigger value="metas" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <Target className="h-4 w-4 mr-2" />
                Metas
              </TabsTrigger>
              <TabsTrigger value="simulador" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <Calculator className="h-4 w-4 mr-2" />
                Simulador
              </TabsTrigger>
              <TabsTrigger value="ranking" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <Trophy className="h-4 w-4 mr-2" />
                Ranking
              </TabsTrigger>
              <TabsTrigger value="plan2k" className="rounded-lg py-2.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Plan 2K
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resumen">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Actividad Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">128</div>
                    <p className="text-xs text-green-500 mt-1">+12% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Impacto Generado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$12,450</div>
                    <p className="text-xs text-slate-500 mt-1">Donaciones gestionadas</p>
                  </CardContent>
                </Card>
                <Card className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Nivel Actual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">Plata</div>
                    <p className="text-xs text-primary mt-1">80% para nivel Oro</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="red">
              <Card>
                <CardHeader>
                  <CardTitle>Estructura de Mi Red</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg bg-slate-50/50">
                  <p className="text-slate-400 italic">Visualización de red en desarrollo</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ganancias">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Ganancias (Plan 3.5)</CardTitle>
                  <CardDescription>Comisiones basadas en tu red hasta el nivel 10.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border">
                        <div>
                          <p className="font-medium">Bono por Referido Nivel {i}</p>
                          <p className="text-xs text-slate-500">12 de Enero, 2026</p>
                        </div>
                        <span className="font-bold text-green-600">
                          +${(calculateCommission(1000, i)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="referido">
              <Card>
                <CardHeader>
                  <CardTitle>Tu Enlace Personal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <input 
                      readOnly 
                      value="https://microfondosrxr.com/ref/user123" 
                      className="flex-1 p-3 rounded-lg border bg-slate-100 text-sm font-mono"
                    />
                    <button className="bg-primary text-white px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      Copiar
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-slate-500">
                    Comparte este link para invitar a nuevos fundraisers a tu red.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metas">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Objetivos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Meta Mensual</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <p className="text-xs text-blue-600 font-bold uppercase mb-1">Próximo Hito</p>
                      <p className="font-bold">15 Donadores Nuevos</p>
                    </div>
                    <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
                      <p className="text-xs text-teal-600 font-bold uppercase mb-1">Premio</p>
                      <p className="font-bold">Bono Extra $1,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simulador">
              <Card>
                <CardHeader>
                  <CardTitle>Simulador de Ingresos (Plan 3.5)</CardTitle>
                  <CardDescription>Cálculo real basado en los 10 niveles de comisión.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="text-sm font-medium block mb-2">Monto de Donación (MXN)</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded-md" 
                        value={simulationAmount}
                        onChange={(e) => setSimulationAmount(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Nivel del Referido (1-10)</label>
                      <input 
                        type="range" 
                        className="w-full" 
                        min="1" 
                        max="10" 
                        step="1"
                        value={simulationLevel}
                        onChange={(e) => setSimulationLevel(Number(e.target.value))}
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Nivel 1 ({(COMMISSION_PERCENTAGES[1]*100).toFixed(0)}%)</span>
                        <span>Nivel 10 ({(COMMISSION_PERCENTAGES[10]*100).toFixed(1)}%)</span>
                      </div>
                      <p className="text-center font-bold text-primary mt-2">Nivel Seleccionado: {simulationLevel}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900 text-white text-center">
                      <p className="text-slate-400 text-sm">Tu Comisión Estimatda</p>
                      <p className="text-4xl font-bold mt-2">${(calculateCommission(simulationAmount, simulationLevel)).toFixed(2)}</p>
                      <p className="text-xs text-slate-500 mt-2">Porcentaje aplicado: {(COMMISSION_PERCENTAGES[simulationLevel]*100).toFixed(2)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ranking">
              <Card>
                <CardHeader>
                  <CardTitle>Top Fundraisers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: "Ana García", points: "2,450", rank: 1 },
                      { name: "Carlos Ruiz", points: "2,100", rank: 2 },
                      { name: "Tú", points: "1,850", rank: 3, current: true },
                      { name: "María López", points: "1,600", rank: 4 }
                    ].map((user) => (
                      <div key={user.rank} className={`flex justify-between items-center p-4 rounded-xl border ${user.current ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-white'}`}>
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${user.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100'}`}>
                            {user.rank}
                          </span>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <span className="font-bold">{user.points} pts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plan2k">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-display text-primary">Plan 2K - Sostenibilidad</CardTitle>
                  <CardDescription>Programa de fortalecimiento operativo mediante donación única.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-2xl bg-slate-900 text-white">
                    <h4 className="font-bold text-lg mb-4">¿Cómo funciona?</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      El Plan 2K consiste en una aportación única de $2,000 MXN. Este fondo se destina 100% a la operatividad de la fundación, permitiendo que las causas filantrópicas sigan recibiendo apoyo directo sin mermas administrativas.
                    </p>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>Fortalece el fondo operativo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>Apoyo logístico inmediato</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>Transparencia en el uso de fondos</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-2">Estado de tu Plan 2K</h4>
                    <div className="flex items-center gap-3 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <Target className="h-5 w-5" />
                      <span className="text-sm font-medium">Pendiente de activación</span>
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                      Realiza tu aportación y sube el comprobante para activar los beneficios del Plan 2K.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
