import React, { useState, useEffect } from 'react';
import { Users, Heart, GraduationCap, Home, AlertCircle, DollarSign, TrendingUp, Award, LogIn, LogOut, Target, BarChart3, Share2, TreePine, Calendar, Trophy, Lightbulb, Eye, EyeOff, Copy, Check } from 'lucide-react';
import * as emailjs from '@emailjs/browser';
import { TEXTOS } from './textos';
import { BRANDING } from './branding';

// CONFIG GLOBAL
const CONFIG = {
  DONATION_AMOUNT: 350,
  PLAN_2K_AMOUNT: 2000,
  ADMIN_PASSWORD: 'MICROFOND437#',
  BANK_CLABE: '012320001198874909',
  BANK_BENEFICIARY: 'Fundación Amor y Servicio AC',
  ADMIN_EMAIL: 'amoryserviciocontact@gmail.com',
  EMAILJS_SERVICE_ID: 'service_xxx',
  EMAILJS_TEMPLATE_WELCOME: 'template_welcome',
  EMAILJS_TEMPLATE_ACTIVATED: 'template_activated',
  EMAILJS_TEMPLATE_NEW_RECEIPT: 'template_new_receipt',
  EMAILJS_PUBLIC_KEY: 'xxx'
};

const MicroFondosRxR = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentUser, setCurrentUser] = useState(null);
  const [fundraisers, setFundraisers] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ code: '', password: '' });
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', referralCode: '', password: ''
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [dashboardTab, setDashboardTab] = useState('resumen');
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptStatus, setReceiptStatus] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    loadData();
    const saved = localStorage.getItem('currentUser');
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  const loadData = async () => {
    try {
      const result = await window.storage.get('fundraisers-data');
      if (result) {
        const data = JSON.parse(result.value);
        setFundraisers(data);
      } else {
        const initialData = [{
          code: 'FASAC437',
          name: 'Fundación Amor y Servicio AC',
          email: 'contacto@fasac.org',
          level: 0,
          referredBy: null,
          active: true,
          weeklyDonation: CONFIG.DONATION_AMOUNT,
          plan2kActive: false,
          downline: [],
          passwordHash: await bcrypt.hash('fasac2026', 10),
          registeredAt: new Date().toISOString(),
          donations: [],
          plan2kDonations: []
        }];
        await window.storage.set('fundraisers-data', JSON.stringify(initialData));
        setFundraisers(initialData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    const user = fundraisers.find(f => f.code === loginData.code.toUpperCase());
    if (user && bcrypt.compareSync(loginData.password, user.passwordHash)) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsLoggingIn(false);
      setLoginData({ code: '', password: '' });
      setActiveTab('dashboard');
    } else {
      alert('Código o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveTab('inicio');
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const newCode = generateUniqueCode(formData.name);
    const passwordHash = bcrypt.hashSync(formData.password, 10);

    const newFundraiser = {
      code: newCode,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      passwordHash,
      referredBy: formData.referralCode.toUpperCase() || 'FASAC437',
      active: false,
      weeklyDonation: 0,
      plan2kActive: false,
      registeredAt: new Date().toISOString(),
      downline: [],
      donations: [],
      plan2kDonations: []
    };

    const updated = [...fundraisers, newFundraiser];
    await window.storage.set('fundraisers-data', JSON.stringify(updated));
    setFundraisers(updated);

    sendEmail(formData.email, 'Bienvenido a MicroFondos RxR', `Tu código es: ${newCode}. Ahora sube tu comprobante para activar tu cuenta.`);

    setIsRegistering(false);
    setFormData({ name: '', email: '', phone: '', referralCode: '', password: '' });
    setActiveTab('registro-exitoso');
    setTimeout(() => setActiveTab('inicio'), 10000);
  };

  const generateUniqueCode = (name) => {
    const base = name.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '');
    let code = `${base}234`;
    let counter = 1;
    while (fundraisers.find(f => f.code === code)) {
      code = `${base}${234 + counter}`;
      counter++;
    }
    return code;
  };

  const sendEmail = (to, subject, body) => {
    if (!CONFIG.EMAILJS_SERVICE_ID.includes('xxx')) {
      emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_WELCOME, {
        to_email: to,
        subject,
        message: body
      }, CONFIG.EMAILJS_PUBLIC_KEY);
    }
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const updated = fundraisers.map(f => {
        if (f.code === currentUser.code) {
          return { ...f, receipt: reader.result, receiptStatus: 'pendiente' };
        }
        return f;
      });
      await window.storage.set('fundraisers-data', JSON.stringify(updated));
      setFundraisers(updated);
      setReceiptStatus('pendiente');
      sendEmail(CONFIG.ADMIN_EMAIL, 'Nuevo comprobante', `El usuario ${currentUser.code} ha subido un comprobante.`);
      alert('Comprobante subido – en revisión');
    };
    reader.readAsDataURL(file);
  };

  const handlePlan2KUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const updated = fundraisers.map(f => {
        if (f.code === currentUser.code) {
          return { ...f, plan2kReceipt: reader.result, plan2kStatus: 'pendiente' };
        }
        return f;
      });
      await window.storage.set('fundraisers-data', JSON.stringify(updated));
      setFundraisers(updated);
      alert('Comprobante de Plan 2K subido – en revisión');
      sendEmail(CONFIG.ADMIN_EMAIL, 'Nuevo Plan 2K', `El usuario ${currentUser.code} ha subido comprobante de $2000.`);
    };
    reader.readAsDataURL(file);
  };

  const activatePlan2K = async (code) => {
    const user = fundraisers.find(f => f.code === code);
    if (!user) return;

    const chain = [];
    let current = user;
    for (let i = 0; i < 4; i++) {
      if (!current.referredBy) break;
      const sponsor = fundraisers.find(f => f.code === current.referredBy);
      if (!sponsor) break;
      chain.push(sponsor);
      current = sponsor;
    }

    const updated = fundraisers.map(f => {
      if (f.code === code) {
        return { ...f, plan2kActive: true, plan2kStatus: 'activo' };
      }
      return f;
    });

    chain.forEach((sponsor, idx) => {
      const amount = 500;
      const updatedSponsor = updated.find(f => f.code === sponsor.code);
      if (updatedSponsor) {
        updatedSponsor.plan2kEarnings = (updatedSponsor.plan2kEarnings || 0) + amount;
        updatedSponsor.plan2kDonations.push({
          from: code,
          amount,
          date: new Date().toISOString()
        });
      }
    });

    await window.storage.set('fundraisers-data', JSON.stringify(updated));
    setFundraisers(updated);
    sendEmail(user.email, '¡Plan 2K activado!', 'Tu donativo de $2000 ha sido confirmado y la cadena de apoyo ha sido beneficiada.');
    alert('Plan 2K activado');
  };

  const activateFromAdmin = async (code) => {
    const updated = fundraisers.map(f => {
      if (f.code === code) {
        const newDonations = [...(f.donations || []), {
          amount: CONFIG.DONATION_AMOUNT,
          date: new Date().toISOString(),
          week: `Semana ${(f.donations?.length || 0) + 1}`
        }];
        return { ...f, active: true, weeklyDonation: CONFIG.DONATION_AMOUNT, donations: newDonations, receiptStatus: 'activo' };
      }
      return f;
    });
    await window.storage.set('fundraisers-data', JSON.stringify(updated));
    setFundraisers(updated);
    const user = updated.find(f => f.code === code);
    sendEmail(user.email, '¡Cuenta activada!', 'Tu cuenta ya está activa y puedes comenzar a ganar regalías.');
    alert('Usuario activado');
  };

  const AdminPanel = () => {
    const pending = fundraisers.filter(f => f.receipt && f.receiptStatus === 'pendiente');
    const pending2k = fundraisers.filter(f => f.plan2kReceipt && f.plan2kStatus === 'pendiente');
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Panel de Admin</h2>

        <h3 className="text-xl font-bold mt-6">Comprobantes Plan 350</h3>
        <div className="grid gap-4">
          {pending.map(f => (
            <div key={f.code} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-bold">{f.name} ({f.code})</p>
                <img src={f.receipt} alt="Comprobante" className="w-64 mt-2 border rounded" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => activateFromAdmin(f.code)} className="bg-green-600 text-white px-4 py-2 rounded">Activar</button>
                <button onClick={() => alert('Rechazado')} className="bg-red-600 text-white px-4 py-2 rounded">Rechazar</button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mt-6">Comprobantes Plan 2K</h3>
        <div className="grid gap-4">
          {pending2k.map(f => (
            <div key={f.code} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-bold">{f.name} ({f.code})</p>
                <img src={f.plan2kReceipt} alt="Comprobante 2K" className="w-64 mt-2 border rounded" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => activatePlan2K(f.code)} className="bg-green-600 text-white px-4 py-2 rounded">Activar 2K</button>
                <button onClick={() => alert('Rechazado')} className="bg-red-600 text-white px-4 py-2 rounded">Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RegistroExitoso = () => {
    const concepto = `DONATIVO ${currentUser?.code || 'TU_CODIGO'}`;
    const copyToClipboard = () => {
      navigator.clipboard.writeText(concepto);
      setCopySuccess(true);
      alert('Copiado al portapapeles');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¡Registro exitoso!</h2>
          <p className="text-lg mb-6">Para activar tu cuenta, realiza tu <strong>primer donativo</strong> de <strong>${CONFIG.DONATION_AMOUNT}</strong> con estos datos:</p>

          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p><strong>Monto:</strong> ${CONFIG.DONATION_AMOUNT}</p>
            <p><strong>CLABE:</strong> {CONFIG.BANK_CLABE}</p>
            <p><strong>Beneficiario:</strong> {CONFIG.BANK_BENEFICIARY}</p>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="font-bold mb-2">📝 En CONCEPTO/REFERENCIA:</p>
            <div className="bg-white p-2 rounded border font-mono text-center flex justify-between items-center">
              <span>{concepto}</span>
              <button onClick={copyToClipboard} className="ml-2 text-blue-600 hover:underline flex items-center gap-1">
                <Copy className="w-4 h-4" /> {copySuccess ? <Check className="w-4 h-4 text-green-600" /> : 'Copiar'}
              </button>
            </div>
            <p className="text-sm mt-2">⚠️ Sin este dato no podremos vincular tu pago.</p>
          </div>

          <p className="text-sm text-gray-600 mb-4">Una vez hecho el depósito, sube tu comprobante desde tu dashboard.</p>
          <button onClick={() => setActiveTab('dashboard')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">Ir a mi dashboard</button>
        </div>
      </div>
    );
  };

  const renderInicio = () => (
    <div className="space-y-12">
      <div className="text-center py-16 rounded-lg" style={{ background: `linear-gradient(to right, ${BRANDING.colores.primario}, ${BRANDING.colores.secundario})`, color: BRANDING.colores.blanco }}>
        <h1 className="text-5xl font-bold mb-4">MicroFondos RxR</h1>
        <p className="text-2xl mb-6">{TEXTOS.tituloInicio}</p>
        {!currentUser && (
          <div className="mt-8 flex gap-4 justify-center">
            <button onClick={() => setIsLoggingIn(true)} className="px-8 py-3 rounded-lg text-lg font-bold flex items-center gap-2" style={{ backgroundColor: BRANDING.colores.blanco, color: BRANDING.colores.primario }}><LogIn /> Iniciar Sesión</button>
            <button onClick={() => setIsRegistering(true)} className="px-8 py-3 rounded-lg text-lg font-bold" style={{ backgroundColor: BRANDING.colores.secundario, color: BRANDING.colores.texto }}>¡Regístrate Gratis!</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderCausas = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nuestras Causas Sociales</h1>
        <p className="text-xl text-gray-600">{TEXTOS.causasSubtitulo}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4" style={{ borderColor: BRANDING.colores.primario }}>
          <Home className="w-16 h-16 mb-4" style={{ color: BRANDING.colores.primario }} />
          <h2 className="text-2xl font-bold mb-3">Creación de Orfanatorios</h2>
          <p className="text-gray-700 text-lg">
            Construimos y mantenemos hogares seguros para niños sin familia, brindándoles educación, alimentación y un ambiente de amor y cuidado.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4" style={{ borderColor: BRANDING.colores.secundario }}>
          <Heart className="w-16 h-16 mb-4" style={{ color: BRANDING.colores.secundario }} />
          <h2 className="text-2xl font-bold mb-3">Ayuda a Mujeres Viudas de la Tercera Edad</h2>
          <p className="text-gray-700 text-lg">
            Apoyamos a mujeres viudas adultas mayores con despensas, atención médica y compañía, asegurando su dignidad y bienestar en esta etapa de vida.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4" style={{ borderColor: BRANDING.colores.acento }}>
          <GraduationCap className="w-16 h-16 mb-4" style={{ color: BRANDING.colores.acento }} />
          <h2 className="text-2xl font-bold mb-3">Apoyo a Jóvenes Estudiantes sin Recursos</h2>
          <p className="text-gray-700 text-lg">
            Otorgamos becas, útiles escolares y uniformes a jóvenes talentosos que no tienen los recursos económicos para continuar sus estudios.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
          <AlertCircle className="w-16 h-16 text-orange-500 mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ayuda en Colonias Marginadas y Desastres Naturales</h2>
          <p className="text-gray-700 text-lg">
            Llevamos ayuda humanitaria a comunidades vulnerables y respondemos rápidamente ante desastres naturales con alimentos, agua y medicinas.
          </p>
        </div>
      </div>
    </div>
  );

  const renderRecaudadores = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Recaudadores</h1>
        <p className="text-xl text-gray-600">{TEXTOS.subtituloRecaudadores}</p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-2xl font-bold mb-4">Total de Fundraisers: {fundraisers.length}</h3>
        <p className="text-lg text-gray-700">
          Activos: {fundraisers.filter(f => f.active).length} | 
          Pendientes de activación: {fundraisers.filter(f => !f.active).length}
        </p>
      </div>

      <div className="grid gap-4">
        {fundraisers.map((fundraiser) => (
          <div key={fundraiser.code} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-blue-600">{fundraiser.code}</h3>
                <p className="text-lg">{fundraiser.name}</p>
                <p className="text-gray-600">{fundraiser.email}</p>
                {fundraiser.referredBy && (
                  <p className="text-sm text-gray-500 mt-2">
                    Referido por: {fundraiser.referredBy}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  fundraiser.active 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {fundraiser.active ? 'ACTIVO' : 'INACTIVO'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFundacion = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{TEXTOS.fundacionTitulo}</h1>
        <p className="text-2xl font-bold" style={{ color: BRANDING.colores.primario }}>{TEXTOS.fundacionSubtitulo}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          Transformar vidas a través del servicio social comprometido. Trabajamos incansablemente para brindar oportunidades, dignidad y esperanza a los sectores más vulnerables de nuestra sociedad.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Award className="w-12 h-12 mb-4" style={{ color: BRANDING.colores.primario }} />
          <h3 className="text-2xl font-bold mb-4">Transparencia</h3>
          <p className="text-gray-700">
            Todos los donativos son utilizados exclusivamente para las causas sociales. Publicamos reportes trimestrales de actividades y uso de recursos.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Users className="w-12 h-12 mb-4" style={{ color: BRANDING.colores.secundario }} />
          <h3 className="text-2xl font-bold mb-4">Compromiso</h3>
          <p className="text-gray-700">
            Nuestro equipo de voluntarios y personal está dedicado 100% a maximizar el impacto de cada peso donado en las comunidades que servimos.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Información de Contacto</h3>
        <div className="space-y-2 text-lg">
          <p><strong>Email:</strong> contacto@fasac.org</p>
          <p><strong>Código de Fundación:</strong> FASAC437</p>
          <p><strong>Registro:</strong> Asociación Civil legalmente constituida</p>
        </div>
      </div>
    </div>
  );

  const renderPlan2K = () => (
    <div className="space-y-8">
      <div className="text-center py-16 rounded-lg" style={{ background: `linear-gradient(to right, ${BRANDING.colores.acento}, ${BRANDING.colores.primario})`, color: BRANDING.colores.blanco }}>
        <h1 className="text-5xl font-bold mb-4">{TEXTOS.plan2kTitulo}</h1>
        <p className="text-2xl mb-6">{TEXTOS.plan2kSubtitulo}</p>
        {!currentUser && (
          <div className="mt-8 flex gap-4 justify-center">
            <button onClick={() => setIsLoggingIn(true)} className="px-8 py-3 rounded-lg text-lg font-bold flex items-center gap-2" style={{ backgroundColor: BRANDING.colores.blanco, color: BRANDING.colores.acento }}><LogIn /> Iniciar Sesión</button>
            <button onClick={() => setIsRegistering(true)} className="px-8 py-3 rounded-lg text-lg font-bold" style={{ backgroundColor: BRANDING.colores.secundario, color: BRANDING.colores.texto }}>¡Regístrate Gratis!</button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">¿Cómo funciona el Plan 2K?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>Haces una <strong>única aportación de $2000</strong>.</li>
          <li>El 25% ($500) apoya a la persona que te invitó.</li>
          <li>El resto se destina a la <strong>Fundación Amor y Servicio AC</strong>.</li>
          <li>Solo se benefician hasta <strong>4 personas arriba de ti</strong>.</li>
          <li>No hay más niveles. Es una <strong>cadena de apoyo limitada</strong>.</li>
        </ul>
      </div>

      {currentUser && (
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
          <h3 className="text-xl font-bold mb-2">¿Ya hiciste tu aportación?</h3>
          <p className="mb-4">Sube tu comprobante de $2000 y activa tu cadena de apoyo:</p>
          <input type="file" accept="image/*,.pdf" onChange={handlePlan2KUpload} className="mb-2" />
          {currentUser.plan2kStatus === 'pendiente' && <p className="text-sm text-yellow-700">⏳ En revisión</p>}
          {currentUser.plan2kStatus === 'activo' && <p className="text-sm text-green-700">✅ Aportación confirmada</p>}
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Datos bancarios</h3>
        <p><strong>Monto:</strong> $2000</p>
        <p><strong>CLABE:</strong> {CONFIG.BANK_CLABE}</p>
        <p><strong>Beneficiario:</strong> {CONFIG.BANK_BENEFICIARY}</p>
        <p className="text-sm text-gray-600 mt-2">En concepto: <strong>DONATIVO {currentUser?.code || 'TU_CODIGO'}</strong></p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Dashboard de {currentUser.name}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Donaciones</h3>
          <p className="text-2xl font-bold text-blue-600">{currentUser.donations?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Plan 2K</h3>
          <p className="text-2xl font-bold text-green-600">{currentUser.plan2kActive ? 'Activo' : 'Inactivo'}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Ganancias</h3>
          <p className="text-2xl font-bold text-purple-600">${currentUser.plan2kEarnings || 0}</p>
        </div>
      </div>
    </div>
  );

   return (
    <div className="min-h-screen" style={{ backgroundColor: BRANDING.colores.fondo }}>
      <nav className="shadow-lg" style={{ backgroundColor: BRANDING.colores.blanco }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <img src={BRANDING.logo} alt="Logo" className="h-10" />
              <div className="text-2xl font-bold" style={{ color: BRANDING.colores.primario }}>MicroFondos RxR</div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setActiveTab('inicio')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'inicio' ? 'text-white' : ''}`} style={activeTab === 'inicio' ? { backgroundColor: BRANDING.colores.primario } : { color: BRANDING.colores.texto }}>Inicio</button>
              <button onClick={() => setActiveTab('causas')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'causas' ? 'text-white' : ''}`} style={activeTab === 'causas' ? { backgroundColor: BRANDING.colores.primario } : { color: BRANDING.colores.texto }}>Causas</button>
              <button onClick={() => setActiveTab('recaudadores')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'recaudadores' ? 'text-white' : ''}`} style={activeTab === 'recaudadores' ? { backgroundColor: BRANDING.colores.primario } : { color: BRANDING.colores.texto }}>Recaudadores</button>
              <button onClick={() => setActiveTab('fundacion')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'fundacion' ? 'text-white' : ''}`} style={activeTab === 'fundacion' ? { backgroundColor: BRANDING.colores.primario } : { color: BRANDING.colores.texto }}>Fundación</button>
              <>
                <button onClick={() => setActiveTab('plan2k')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'plan2k' ? 'text-white' : ''}`} style={activeTab === 'plan2k' ? { backgroundColor: BRANDING.colores.acento } : { color: BRANDING.colores.texto }}>Plan 2K</button>
                {currentUser && <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'dashboard' ? 'text-white' : ''}`} style={activeTab === 'dashboard' ? { backgroundColor: BRANDING.colores.primario } : { color: BRANDING.colores.texto }}>Dashboard</button>}
              </>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'inicio' && renderInicio()}
        {activeTab === 'causas' && renderCausas()}
        {activeTab === 'recaudadores' && renderRecaudadores()}
        {activeTab === 'fundacion' && renderFundacion()}
        {activeTab === 'plan2k' && renderPlan2K()}
        {activeTab === 'dashboard' && renderDashboard()}
      </main>

      <>
        <footer className="py-8 mt-16" style={{ backgroundColor: BRANDING.colores.texto, color: BRANDING.colores.blanco }}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-lg">© 2026 MicroFondos RxR - Fundación Amor y Servicio AC</p>
            <p className="mt-2" style={{ color: BRANDING.colores.fondo }}>{TEXTOS.footer}</p>
          </div>
        </footer>
      </>
    </div>
  );
  );
  }
export default MicroFondosRxR;
