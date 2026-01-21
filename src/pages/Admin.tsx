import { Navbar } from "@/components/Navbar";

export default function Admin() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-slate-400">Panel de Administrador</h1>
        <p className="text-slate-500">Esta área estará disponible próximamente para gestionar causas y donaciones.</p>
      </div>
    </div>
  );
}
