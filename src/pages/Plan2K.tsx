import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Sistema2K() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Número de cuenta copiado al portapapeles",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="container-custom text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent font-bold text-sm mb-4 border border-accent/20">Únete al cambio</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Sistema 2K</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Una iniciativa comunitaria simple pero poderosa. Con el Donativo único, nos ayudas a apoyar múltiples causas.
          </p>
        </div>
      </div>

      <div className="container-custom py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg border-0 bg-primary text-white">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">¿Listo para unirte?</h3>
                  <p className="text-primary-foreground/90">Envía tu comprobante a nuestro contacto una vez realizado tu Donativo.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bank Details Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-accent/20 h-full relative overflow-hidden">
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                  <span>💡</span> DATOS BANCARIOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Monto</p>
                    <p className="font-bold text-lg text-slate-800">$2,000 MXN</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 group cursor-pointer hover:border-primary/30 transition-colors" onClick={() => copyToClipboard("012320001198874909")}>
                    <div className="flex justify-between items-start">
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">CLABE</p>
                      <Copy className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                    </div>
                    <p className="font-mono text-lg text-slate-800 break-all">012320001198874909</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Beneficiario</p>
                    <p className="font-bold text-lg text-slate-800">Fundación Amor y Servicio AC</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span>📝</span> En CONCEPTO/REFERENCIA:
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <p className="font-bold text-slate-800 text-lg">DONATIVO TU_CODIGO</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-2">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">IMPORTANTE:</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Para que tu cuenta se active correctamente: Asegúrate de escribir en el CONCEPTO de tu transferencia tal y como se muestra arriba. Sin este dato no podremos vincular tu pago con tu cuenta.
                  </p>
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm font-bold text-primary italic">No olvides enviar tu comprobante</p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
