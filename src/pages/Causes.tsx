import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCauses } from "@/hooks/use-causes";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

import img1 from "@assets/image_1768803280337.png";
import img2 from "@assets/image_1768803339914.png";
import img3 from "@assets/image_1768803439866.png";
import img4 from "@assets/image_1768803465259.png";
import img5 from "@assets/image_1768803502385.png";
import img6 from "@assets/ert_1768804240439.png";
import img7 from "@assets/image_1768804415703.png";
import img8 from "@assets/image_1768804543131.png";
import img9 from "@assets/esa_1768804725556.png";
import img10 from "@assets/aweu_1768804846894.png";
import img11 from "@assets/dfgj_1768805015710.png";
import img12 from "@assets/zx_1768805099044.png";
import img13 from "@assets/qwe_1768805179617.png";
import img14 from "@assets/uy_1768805280078.png";
import img15 from "@assets/jy_1768805356821.png";
import img16 from "@assets/image_1768805385682.png";
import img17 from "@assets/azs_1768805479657.png";
import img18 from "@assets/image_1768806347018.png";
import img19 from "@assets/image_1768806528347.png";
import img20 from "@assets/image_1768806570835.png";

export default function Causes() {
  const { data: causes, isLoading } = useCauses();

  const galleryImages = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="bg-primary py-16 text-white text-center">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-bold mb-4">Causas Activas</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Explora los proyectos que estamos apoyando actualmente. Tu contribución hace posible que estas historias tengan un final feliz.
          </p>
        </div>
      </div>

      <div className="container-custom py-16 flex-grow">
        {/* Foundation Info Section */}
        <div className="mb-20 space-y-24">
          <div className="text-center mb-16">
            <div className="text-lg text-slate-600 max-w-4xl mx-auto space-y-6 text-left">
              <p className="font-bold text-xl text-center text-slate-900">Fundación Amor y Servicio AC</p>
              <p>
                Desde 1950 nos hemos dedicado a ayudar a niños en situación de abandono u orfandad, también a personas de escasos recursos que así lo requerían. Nuestra visión de amor y servicio a los que más lo necesitan, continua en esta labor altruista y filantrópica en favor de la sociedad, extendiéndola a más personas y familias en la ciudad de Guadalajara Jalisco México.
              </p>
              <p>
                Posteriormente, el 25 de Enero de 1999 se estableció en la ciudad de Guadalajara Jalisco México la Fundación Amor y Servicio A.C. institución dedicada hasta la actualidad a ayudar a los niños huérfanos o abandonados, a las mujeres viudas ancianas, a estudiantes sin recursos y las familias que viven en comunidades marginadas y en pobreza extrema, además de ayudar en casos de catástrofes naturales.
              </p>
              <p>
                Hoy la Fundación Amor y Servicio A.C. tiene la visión global de difundir esta visión de servicio a la humanidad, comenzada hace mas de 70 años que redundará en beneficio de millones de personas en la humanidad entera, y trascenderá en el cambio del destino de niños y familias completas alrededor de generaciones, que serán impactadas por esa onda expansiva que primeramente Dios, jamás se detendrá.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" 
                alt="Misión" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-display font-bold text-primary mb-6">Nuestra Misión</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Empoderar comunidades vulnerables mediante un sistema de microfondos transparente, ágil y directo. Eliminamos la burocracia de la caridad tradicional para conectar donantes directamente con necesidades urgentes.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed italic">
                "Creemos en la dignidad de quien recibe y en la confianza de quien da."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold text-primary mb-6">Nuestra Visión</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Ser la plataforma de referencia en Latinoamérica para la micro-filantropía, donde cualquier persona pueda ver el impacto tangible de su generosidad.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800" 
                alt="Visión" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-16 bg-gradient-to-br from-yellow-100 via-fuchsia-100 to-blue-100 -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-3xl mb-16 pb-16">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 pt-12">
              <h2 className="text-3xl font-display font-bold text-center md:text-left">Nuestras Causas Activas</h2>
              <Button asChild variant="outline" className="rounded-full shadow-sm hover:shadow-md transition-all gap-2 bg-white/50 backdrop-blur-sm border-white/20">
                <a href="/attached_assets/PROYECTO_FASAC_NORM_(1)_1768878347870.pdf" download="Proyecto_Microfondos_RxR.pdf">
                  <FileDown className="h-4 w-4" />
                  Descargar Proyecto PDF
                </a>
              </Button>
            </div>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 flex gap-6 animate-pulse">
                    <div className="w-48 h-32 bg-slate-200 rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-slate-200 rounded w-1/3" />
                      <div className="h-4 bg-slate-200 rounded w-full" />
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl mx-auto">
                {causes?.map((cause) => (
                  <div key={cause.id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/40 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-32">
                    <div className="w-full sm:w-40 h-32 sm:h-full shrink-0 overflow-hidden">
                      <img 
                        src={cause.imageUrl} 
                        alt={cause.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 mb-1 truncate">{cause.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 sm:line-clamp-2">{cause.description}</p>
                    </div>
                  </div>
                ))}
                
                {causes?.length === 0 && (
                  <div className="text-center py-12 bg-white/30 rounded-2xl border border-dashed border-white/50">
                    <p className="text-slate-500 text-sm">No hay causas activas en este momento.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="border-t border-slate-200 pt-16">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Galería de Impacto</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={img} 
                    alt={`Ayuda entregada ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
