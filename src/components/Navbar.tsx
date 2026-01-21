import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, X, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logoImg from "@assets/1000284491_1768626562207.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/causes", label: "Causas" },
    { 
      label: "Sistemas", 
      submenu: [
        { href: "/sistema-3.5", label: "Sistema 3.5" },
        { href: "/sistema-2k", label: "Sistema 2K" },
      ]
    },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logoImg} alt="Microfondos RxR Logo" className="w-10 h-10 object-contain" />
              <span className="microfondos-rxr-logo hidden sm:block font-display font-bold text-slate-900">Microfondos RxR</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              link.submenu ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 outline-none ${
                        link.submenu.some(s => isActive(s.href)) ? "text-primary font-bold" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {link.submenu.map((sub) => (
                      <DropdownMenuItem key={sub.href} asChild>
                        <Link href={sub.href}>
                          <a className={`w-full cursor-pointer ${isActive(sub.href) ? "text-primary font-bold" : ""}`}>
                            {sub.label}
                          </a>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
               <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-gray-200">
                    {user?.profileImageUrl ? (
                      <img 
                        src={user.profileImageUrl} 
                        alt={user.firstName || "User"} 
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-5 w-5 text-gray-500" />
                    )}
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56" align="end" forceMount>
                 <DropdownMenuLabel className="font-normal">
                   <div className="flex flex-col space-y-1">
                     <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                     <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                   </div>
                 </DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                   <Link href="/dashboard" className="cursor-pointer">
                     <UserIcon className="mr-2 h-4 w-4" />
                     Dashboard
                   </Link>
                 </DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600 cursor-pointer">
                   <LogOut className="mr-2 h-4 w-4" />
                   Log out
                 </DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
            ) : (
              <Button asChild className="rounded-full font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
                <a href="/api/login">Ingresar</a>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="space-y-1 px-4 py-4">
            {links.map((link) => (
              link.submenu ? (
                <div key={link.label} className="space-y-1">
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {link.label}
                  </div>
                  {link.submenu.map((sub) => (
                    <Link 
                      key={sub.href} 
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(sub.href) 
                          ? "bg-primary/10 text-primary" 
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.href) 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              {isAuthenticated ? (
                 <div className="space-y-2">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <UserIcon className="mr-2 h-4 w-4" /> Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                    </Button>
                 </div>
              ) : (
                <Button asChild className="w-full rounded-full">
                  <a href="/api/login">Ingresar</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
