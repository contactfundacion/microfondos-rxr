import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Heart, Users, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCauses } from "@/hooks/use-causes";

import heroImg from "@assets/169134227_111647004358971_2116221860719181508_n_1768633776723.jpg";
import foundationLogo from "@assets/Diseño_sin_título_(7)_(1)_1768800453474.png";
import foundationNameImg from "@assets/funda_(1)_1768802544239.png";

export default function Home() {
  const { data: causes, isLoading } = useCauses();

  return (
    <div className="min-h-screen flex flex-col font-body relative overflow-hidden">
      {/* Logo Watermarks */}
      <div className="absolute top-[15%] left-[5%] opacity-[0.03] pointer-events-none z-0 rotate-12">
        <img src={foundationLogo} alt="" className="w-48 h-48 object-contain" />
      </div>
      <div className="absolute top-[45%] right-[8%] opacity-[0.03] pointer-events-none z-0 -rotate-12">
        <img src={foundationLogo} alt="" className="w-56 h-56 object-contain" />
      </div>
      <div className="absolute bottom-[20%] left-[10%] opacity-[0.03] pointer-events-none z-0 rotate-45">
        <img src={foundationLogo} alt="" className="w-40 h-40 object-contain" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-white/50 z-0"></div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent skew-x-12 transform origin-top-right z-0 pointer-events-none"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-slate-900 font-bold text-sm border border-accent/20">
                <Heart className="h-4 w-4 fill-accent text-accent" />
                <span>Únete al movimiento solidario</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-extrabold leading-[1.1] text-slate-900">
                Buenas Causas, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">
                  Buenos Efectos
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Microfondos RxR conecta corazones generosos con causas que transforman vidas. Tu aportación directa marca la diferencia hoy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/plan-2k">
                  <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                    Unirse al Plan 2K
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span>100% Transparente</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span>Impacto Directo</span>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700 fade-in delay-200">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl transform rotate-3 scale-105 z-0"></div>
              {/* helping hands image */}
              <img 
                src={heroImg} 
                alt="Community Support" 
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white object-cover h-[500px] w-full"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-float">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Comunidad</p>
                    <p className="text-2xl font-bold text-slate-900">+500 Miembros</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Causes Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-4 mb-12">
              <span className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">
                Microfondos RxR es la plataforma donde puedes trabajar como Fundraiser y a su vez ayudas a las causas altruistas y filantrópicas de la
              </span>
              <div className="inline-flex items-center gap-4">
                <img src={foundationLogo} alt="Logo" className="h-20 w-20 md:h-24 md:w-24 object-contain" />
                <img src={foundationNameImg} alt="Fundación Amor y Servicio AC" className="h-24 md:h-40 object-contain" />
              </div>
            </div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Nuestras Causas</span>
            <h2 className="text-3xl md:text-4xl mt-3 mb-6">Apoya proyectos que importan</h2>
            <p className="text-slate-600">
              Cada causa es verificada y seleccionada para maximizar el impacto social en nuestra comunidad.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-white rounded-2xl shadow-sm animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {causes?.slice(0, 3).map((cause) => (
                <div key={cause.id}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                      <img 
                        src={cause.imageUrl} 
                        alt={cause.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                        Activa
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{cause.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">{cause.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/causes">
              <Button variant="outline" className="rounded-full px-8">Ver todas las causas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
        <div className="container-custom relative z-10 text-center text-white">
          <ShieldCheck className="h-16 w-16 mx-auto mb-6 text-accent" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Transparencia Total</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/90">
            Actualizaciones cada mes de los avances en los proyectos de la Fundación Amor y Servicio AC y entregas de donativos. Solo ayuda real llegando a quien lo necesita.
          </p>
          <Link href="/plan-2k">
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 rounded-full text-lg px-10 shadow-lg border-0">
              Conoce el Plan 2K
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
