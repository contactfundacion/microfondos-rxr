import { Link } from "wouter";
import { Facebook, Instagram, Mail, Heart } from "lucide-react";
import rxrLogo from "@assets/1000284491_1768626562207.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-blue-100 to-fuchsia-300 text-slate-800 pt-16 pb-8 border-t border-slate-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <img src={rxrLogo} alt="Microfondos RxR Logo" className="h-10 w-10 object-contain" />
              <span className="font-display font-bold text-xl text-slate-900">Microfondos RxR</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Transformando vidas a través de la solidaridad comunitaria. Tu apoyo hace posible un futuro mejor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/causes" className="hover:text-primary transition-colors">Causas</Link></li>
              <li><Link href="/fundraisers" className="hover:text-primary transition-colors">Plan 3.5</Link></li>
              <li><Link href="/plan-2k" className="hover:text-primary transition-colors">Plan 2K</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-lg">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contacto@microfondosrxr.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-lg">Síguenos</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/FundacionAmoryServAC" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:bg-primary hover:text-white transition-all border border-slate-100">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/fundacion.amoryservicio.ac/" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:bg-primary hover:text-white transition-all border border-slate-100">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Microfondos RxR. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>para la comunidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
