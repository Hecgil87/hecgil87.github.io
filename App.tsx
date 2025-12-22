/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BioScene } from './components/QuantumScene';
import { BMICalculator, ServiceCard, TestimonialCard } from './components/Diagrams';
import { Menu, X, Phone, Calendar, MapPin, Mail, ArrowRight, ArrowLeft, Activity, Stethoscope, Microscope, UserCheck, CheckCircle2, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURACIÓN DE IMÁGENES ---
const IMAGE_PATHS = {
    LOGO: "./assets/logo.png",
    DOCTOR: "./assets/doctor.jpg", 
    CASE_1: "./assets/caso1.jpg", 
    CASE_2: "./assets/caso2.jpg",
    CASE_3: "./assets/caso3.jpg"
};

// URL de respaldo en caso de que las imágenes no existan
const FALLBACK_IMAGE = "https://placehold.co/600x400/e2e8f0/0f172a?text=Imagen+No+Encontrada";
const LOGO_FALLBACK = "https://placehold.co/100x100/0ea5e9/ffffff?text=CEGAM";

// --- CONFIGURACIÓN DE REDES SOCIALES ---
const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/drjosephdmm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook: "https://www.facebook.com/share/1FjwSZCpP2/?mibextid=wwXIfr",
    email: "mailto:drJosephdmendozam@gmail.com",
    whatsapp: "https://wa.me/584247010090"
};

// --- DATOS DE CONTENIDO ---
const SERVICES_DATA = [
    {
        id: 'balon',
        title: "Balón Gástrico",
        description: "Procedimiento no quirúrgico para la pérdida de peso efectiva. Ideal para pacientes que buscan resultados sin cirugía bariátrica invasiva.",
        fullDescription: "El balón gástrico es una solución innovadora y mínimamente invasiva para el control de peso. Consiste en la introducción de un balón de silicona suave en el estómago mediante endoscopia. Este balón ocupa espacio, induciendo una sensación de saciedad temprana y ayudando al paciente a reducir la ingesta de alimentos.",
        benefits: ["Sin incisiones ni cicatrices", "Procedimiento ambulatorio (regresas a casa el mismo día)", "Pérdida de peso significativa en 6-12 meses", "Acompañamiento nutricional continuo"],
        icon: <Activity />
    },
    {
        id: 'colonoscopia',
        title: "Colonoscopia Total",
        description: "Examen fundamental para la prevención del cáncer de colon. Diagnóstico preciso de pólipos y otras anomalías.",
        fullDescription: "La colonoscopia es el 'Gold Standard' para la detección temprana de cáncer colorrectal. Utilizando un tubo flexible con cámara de alta definición, examinamos el revestimiento del colon y el recto. Este procedimiento no solo es diagnóstico, sino terapéutico, permitiendo la extirpación de pólipos antes de que se vuelvan malignos.",
        benefits: ["Detección temprana de cáncer", "Extirpación de pólipos en el mismo procedimiento", "Sedación completa para confort del paciente", "Resultados inmediatos preliminares"],
        icon: <Microscope />
    },
    {
        id: 'endoscopia',
        title: "Endoscopia Digestiva",
        description: "Evaluación del esófago, estómago y duodeno para diagnosticar gastritis, reflujo, úlceras y otras patologías.",
        fullDescription: "La endoscopia digestiva alta (video gastroscopia) permite visualizar el tracto digestivo superior. Es esencial para investigar síntomas como dolor abdominal persistente, náuseas, vómitos, dificultad para tragar o acidez estomacal crónica.",
        benefits: ["Diagnóstico preciso de gastritis y Helicobacter Pylori", "Tratamiento de úlceras sangrantes", "Dilatación de estenosis esofágicas", "Toma de biopsias"],
        icon: <Stethoscope />
    },
    {
        id: 'obesidad',
        title: "Control de Obesidad",
        description: "Programas integrales de nutrición y acompañamiento médico para lograr un peso saludable y sostenible.",
        fullDescription: "La obesidad es una enfermedad crónica y compleja. En CEGAM abordamos el control de peso desde una perspectiva médica multidisciplinaria, combinando nutrición, psicología y, cuando es necesario, farmacología o procedimientos endoscópicos.",
        benefits: ["Planes nutricionales personalizados", "Monitoreo médico continuo", "Manejo de comorbilidades (diabetes, hipertensión)", "Enfoque en cambios de hábitos a largo plazo"],
        icon: <UserCheck />
    },
    {
        id: 'test-aliento',
        title: "Test de Aliento",
        description: "Detección no invasiva de Helicobacter Pylori y sobrecrecimiento bacteriano (SIBO).",
        fullDescription: "Utilizamos pruebas de aliento de última generación para detectar infecciones bacterianas sin necesidad de procedimientos invasivos. Es una herramienta rápida y eficaz para diagnosticar las causas de hinchazón abdominal, gases y malestar digestivo.",
        benefits: ["No invasivo y sin dolor", "Resultados rápidos", "Alta sensibilidad y especificidad", "Ideal para seguimiento post-tratamiento"],
        icon: <Activity />
    },
    {
        id: 'consulta',
        title: "Consulta Especializada",
        description: "Evaluación clínica completa para dolor abdominal, trastornos digestivos funcionales y enfermedades hepáticas.",
        fullDescription: "Una consulta detallada es la base de un buen diagnóstico. El Dr. Mendoza dedica el tiempo necesario para escuchar sus síntomas, revisar su historial médico y realizar un examen físico exhaustivo para determinar el mejor plan de acción.",
        benefits: ["Atención personalizada del Dr. Mendoza", "Enfoque integral de la salud", "Revisión detallada de estudios previos", "Plan de tratamiento claro"],
        icon: <Calendar />
    }
];

const BLOG_DATA = [
    {
        id: 'caso-maria',
        category: "Caso de Éxito",
        date: "Hace 2 meses",
        title: "Recuperando mi vida con el Balón Gástrico",
        excerpt: "María bajó 18kg en 4 meses. 'La decisión de acudir a CEGAM cambió mi movilidad y mi autoestima por completo'.",
        image: IMAGE_PATHS.CASE_1,
        content: `
            <p>María llegó a nuestra consulta con un IMC de 32 y múltiples intentos fallidos de dieta. Sufría de dolor articular y fatiga crónica. Tras una evaluación exhaustiva, determinamos que era la candidata ideal para el Balón Gástrico Ingerible.</p>
            <br/>
            <h4 class="font-bold text-lg text-slate-900">El Proceso</h4>
            <p>El procedimiento duró menos de 20 minutos y no requirió anestesia general. Durante los siguientes 4 meses, María siguió nuestro programa nutricional acompañado.</p>
            <br/>
            <h4 class="font-bold text-lg text-slate-900">Los Resultados</h4>
            <p>Al finalizar el tratamiento, María había perdido 18 kilogramos. Sus dolores articulares desaparecieron y recuperó la energía para volver a practicar deporte. "Lo mejor no fue solo bajar de peso, sino aprender a comer de nuevo", nos cuenta María.</p>
        `
    },
    {
        id: 'colonoscopia-info',
        category: "Artículo Médico",
        date: "Publicado hoy",
        title: "La importancia de la Colonoscopia después de los 45",
        excerpt: "El Dr. Mendoza explica por qué la prevención es la mejor cura y cómo este examen salva vidas detectando pólipos a tiempo.",
        image: IMAGE_PATHS.CASE_2,
        content: `
            <p>El cáncer colorrectal es uno de los más comunes, pero también uno de los más prevenibles. La clave está en la detección temprana.</p>
            <br/>
            <h4 class="font-bold text-lg text-slate-900">¿Por qué a los 45 años?</h4>
            <p>Las guías internacionales han actualizado la edad de inicio del tamizaje debido al aumento de casos en adultos jóvenes. A partir de los 45 años, el riesgo aumenta significativamente.</p>
            <br/>
            <h4 class="font-bold text-lg text-slate-900">¿Qué buscamos?</h4>
            <p>Buscamos pólipos: pequeños crecimientos en el revestimiento del colon que, con el tiempo, pueden transformarse en cáncer. Al encontrarlos y extirparlos durante la colonoscopia, interrumpimos la cadena que lleva a la enfermedad.</p>
        `
    },
    {
        id: 'nutricion-reflujo',
        category: "Nutrición",
        date: "Hace 1 semana",
        title: "Hábitos alimenticios para evitar el reflujo",
        excerpt: "Consejos prácticos para mejorar tu digestión diaria y evitar la acidez estomacal constante sin depender de medicamentos.",
        image: IMAGE_PATHS.CASE_3,
        content: `
            <p>El reflujo gastroesofágico afecta a millones de personas. Si bien la medicación ayuda, el cambio de hábitos es fundamental para una solución a largo plazo.</p>
            <br/>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Evita comer justo antes de dormir:</strong> Cena al menos 3 horas antes de acostarte.</li>
                <li><strong>Reduce irritantes:</strong> Café, alcohol, picantes y chocolate pueden relajar el esfínter esofágico.</li>
                <li><strong>Controla las porciones:</strong> Comidas muy copiosas aumentan la presión en el estómago.</li>
                <li><strong>Duerme elevado:</strong> Elevar la cabecera de la cama puede ayudar a prevenir el reflujo nocturno por gravedad.</li>
            </ul>
        `
    }
];

// --- COMPONENTE SPINNER DE CARGA ---
const LoadingScreen = () => (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-4">
            {/* Anillo exterior estático */}
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            {/* Anillo giratorio */}
            <div className="absolute inset-0 border-4 border-medical-primary rounded-full border-t-transparent animate-spin"></div>
            {/* Icono central pulsante */}
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <Activity className="text-medical-primary w-8 h-8" />
            </div>
        </div>
        <div className="flex flex-col items-center gap-1 animate-pulse">
            <h2 className="text-2xl font-serif font-bold text-slate-800">CEGAM</h2>
            <p className="text-xs tracking-[0.2em] text-medical-primary uppercase font-bold">Cargando...</p>
        </div>
    </div>
);

// --- COMPONENTE BOTÓN FLOTANTE WHATSAPP (EXPANDIBLE) ---
const WhatsAppButton = () => (
    <a 
        href={SOCIAL_LINKS.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-300 flex items-center group overflow-hidden"
        aria-label="Contactar por WhatsApp"
    >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:scale-110 transition-transform shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-in-out font-bold text-sm tracking-wide whitespace-nowrap overflow-hidden">
            Contáctanos
        </span>
    </a>
);

// --- COMPONENTES DE VISTA ---

const ServiceDetailView = ({ service, onBack }: { service: any, onBack: () => void }) => (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
            <button onClick={onBack} className="mb-8 flex items-center text-slate-500 hover:text-medical-primary transition-colors font-medium">
                <ArrowLeft className="mr-2" size={20} /> Volver a Servicios
            </button>
            
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-medical-primary/5 p-12 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-medical-primary shadow-md shrink-0">
                        {React.cloneElement(service.icon, { size: 48 })}
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">{service.title}</h1>
                        <p className="text-xl text-slate-600 leading-relaxed">{service.description}</p>
                    </div>
                </div>
                
                <div className="p-8 md:p-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Activity className="text-medical-accent" size={20}/> Descripción del Procedimiento
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg mb-12">
                        {service.fullDescription}
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="text-medical-accent" size={20}/> Beneficios Clave
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {service.benefits.map((benefit: string, idx: number) => (
                            <div key={idx} className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="w-2 h-2 mt-2 rounded-full bg-medical-primary mr-3 shrink-0" />
                                <span className="text-slate-700 font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-medical-dark rounded-2xl p-8 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-bold mb-4">¿Interesado en este tratamiento?</h3>
                            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                Agende una evaluación con el Dr. Mendoza para determinar si este es el procedimiento adecuado para usted.
                            </p>
                            <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block px-8 py-4 bg-medical-primary hover:bg-sky-500 text-white rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1">
                                Agendar Cita Ahora
                            </a>
                        </div>
                        {/* Decorative bg */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-medical-primary opacity-10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const BlogDetailView = ({ post, onBack }: { post: any, onBack: () => void }) => (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
            <button onClick={onBack} className="mb-8 flex items-center text-slate-500 hover:text-medical-primary transition-colors font-medium">
                <ArrowLeft className="mr-2" size={20} /> Volver
            </button>

            <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="h-64 md:h-96 w-full relative">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Previene bucles infinitos
                            target.src = FALLBACK_IMAGE;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                        <span className="bg-medical-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">{post.title}</h1>
                        <p className="mt-2 text-slate-200 font-medium">{post.date}</p>
                    </div>
                </div>
                
                <div className="p-8 md:p-12 text-slate-600 text-lg leading-relaxed blog-content">
                     {/* Using dangerouslySetInnerHTML for the demo content structure */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                             <img 
                                src={IMAGE_PATHS.DOCTOR} 
                                alt="Dr. Mendoza" 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = FALLBACK_IMAGE;
                                }}
                             />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Dr. Joseph Mendoza</p>
                            <p className="text-xs text-slate-500">Autor / Especialista en Patologías Digestivas</p>
                        </div>
                    </div>
                    <button className="text-medical-primary font-bold text-sm hover:underline">
                        Compartir Artículo
                    </button>
                </div>
            </article>
        </div>
    </div>
);


const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'service-detail' | 'blog-detail'>('home');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulación de carga inicial de recursos (imágenes, escena 3D)
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 2000); // 2 segundos de pantalla de carga para asegurar que los estilos/3D carguen
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    
    // Si estamos en una vista de detalle, volvemos al home primero
    if (currentView !== 'home') {
        setCurrentView('home');
        // Aumentamos el timeout a 500ms para asegurar que la animación de salida (300ms)
        // haya terminado y el DOM de la página de inicio esté completamente montado
        // antes de intentar hacer scroll.
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }, 500);
    } else {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }
  };

  const handleServiceClick = (service: any) => {
      setSelectedItem(service);
      setCurrentView('service-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogClick = (post: any) => {
      setSelectedItem(post);
      setCurrentView('blog-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
      setCurrentView('home');
      setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-medical-primary selection:text-white">
      
      {/* PANTALLA DE CARGA (SPINNER) */}
      <AnimatePresence>
        {isLoading && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[60]"
            >
                <LoadingScreen />
            </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <WhatsAppButton />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        {/* CAMBIO 1: Se añade este div envoltorio con 'px-4' para separar el logo del borde de la pantalla */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                {/* CAMBIO 2: Estructura del Brand corregida */}
              <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                {/* Se eliminó 'absolute' de aquí para que el icono y el texto no se encimen */}
                <div className="h-10 md:h-12 relative flex items-center justify-center">
                <img 
                    src={IMAGE_PATHS.LOGO} 
                    alt="CEGAM Logo" 
                    className="h-full w-auto object-contain" // h-full ocupa el 100% de la altura. Cambia 'w-auto' por 'w-32' o similar para un ancho fijo.
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = LOGO_FALLBACK;
                    }}
                />
            </div> 
                </div>

            {/* CAMBIO 4: El menú ahora se mantiene a la derecha gracias al flex-justify-between del padre */}
            <div className="hidden md:flex items-center space-x-8">
                <div className="flex space-x-6 text-sm font-bold text-gray-600">
                    <a href="#inicio" className="hover:text-[#0092bc] transition-colors">INICIO</a>
                    <a href="#doctor" className="hover:text-[#0092bc] transition-colors">EL DOCTOR</a>
                    <a href="#servicios" className="hover:text-[#0092bc] transition-colors">SERVICIOS</a>
                    <a href="#casos" className="hover:text-[#0092bc] transition-colors">BLOG</a>
                </div>
        
                <div className="flex items-center space-x-4">
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors"><Instagram size={18} /></a>
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors"><Facebook size={18} /></a>
                    <a href={SOCIAL_LINKS.email} className="text-slate-400 hover:text-medical-primary transition-colors"><Mail size={18} /></a>
                </div>

                <a
                    href="#contacto" 
                    onClick={scrollToSection('contacto')}
                    className="px-6 py-2.5 bg-gradient-to-r from-medical-primary to-medical-accent text-white rounded-full hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-bold shadow-md flex items-center gap-2"
                >
                    <Calendar size={16} />
                    Agendar Cita
                </a>
            </div>
        </div>
    </div>
</nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in text-slate-800">
            <a href="#inicio" onClick={scrollToSection('inicio')} className="hover:text-medical-primary transition-colors">Inicio</a>
            <a href="#doctor" onClick={scrollToSection('doctor')} className="hover:text-medical-primary transition-colors">El Doctor</a>
            <a href="#servicios" onClick={scrollToSection('servicios')} className="hover:text-medical-primary transition-colors">Servicios</a>
            <a href="#casos" onClick={scrollToSection('casos')} className="hover:text-medical-primary transition-colors">Casos de ÉXITO</a>
            
            {/* Social Icons Mobile */}
            <div className="flex items-center gap-6 mt-4">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors p-2 bg-slate-50 rounded-full"><Instagram size={24} /></a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors p-2 bg-slate-50 rounded-full"><Facebook size={24} /></a>
                <a href={SOCIAL_LINKS.email} className="text-slate-400 hover:text-medical-primary transition-colors p-2 bg-slate-50 rounded-full"><Mail size={24} /></a>
            </div>

            <a href="#contacto" onClick={scrollToSection('contacto')} className="px-8 py-3 bg-medical-primary text-white rounded-full shadow-lg">Agendar Cita</a>
        </div>
      )}

      {/* VIEW CONTROLLER */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
            <motion.div 
                key="home"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Hero Section */}
                <header id="inicio" className="relative min-h-[70vh] flex items-center pt-16 pb-12 lg:pt-20 lg:pb-16 overflow-hidden bg-white">
                    <BioScene />
                    
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-transparent" />

                    <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="max-w-xl mb-12 lg:mb-0">
                        <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 text-medical-primary text-xs tracking-widest uppercase font-bold rounded-full">
                        Centro de Gastroenterología Mendoza
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 text-slate-900 drop-shadow-sm">
                            Tu salud digestiva <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-primary to-medical-accent">
                                en manos expertas
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
                        Especialistas en prevención de obesidad, balón gástrico y salud gastrointestinal integral. Transformamos vidas a través de la medicina avanzada.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#contacto" onClick={scrollToSection('contacto')} className="px-8 py-4 bg-medical-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-sky-600 transition-all text-center flex items-center justify-center gap-2">
                            Agendar Consulta <ArrowRight size={18} />
                        </a>
                        <a href="#servicios" onClick={scrollToSection('servicios')} className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold shadow-sm hover:border-medical-primary hover:text-medical-primary transition-all text-center">
                            Ver Tratamientos
                        </a>
                        </div>
                    </div>
                    </div>
                </header>

                <main>
                    {/* About Doctor */}
                    <section id="doctor" className="py-24 bg-white relative pt-12 overflow-hidden">
                    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-slate-200 relative z-10">
                                {/* USANDO LA RUTA DE IMAGEN DEFINIDA ARRIBA */}
                                <img 
                                    src={IMAGE_PATHS.DOCTOR} 
                                    alt="Dr. Joseph Mendoza" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = FALLBACK_IMAGE;
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-8 text-white">
                                    <h3 className="text-2xl font-serif font-bold">Dr. Joseph Mendoza Monterola</h3>
                                    <p className="text-sky-300 font-medium">Gastroenterólogo Especialista</p>
                                </div>
                            </div>
                            {/* Decorative element behind image */}
                            <div className="absolute top-10 -right-10 w-full h-full border-2 border-medical-primary/20 rounded-2xl z-0 hidden lg:block"></div>
                        </div>
                        
                        <div>
                        <div className="flex items-center gap-2 text-medical-primary mb-4">
                            <Stethoscope size={20} />
                            <span className="text-sm font-bold tracking-widest uppercase">Sobre el Especialista</span>
                        </div>
                        <h2 className="font-serif text-4xl mb-6 text-slate-900 font-bold">Experiencia y Compromiso con tu Salud</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                            Bienvenido a CEGAM. Soy el <strong>Dr. Joseph Mendoza Monterola</strong>, dedicado a proporcionar un cuidado digestivo de la más alta calidad. Mi enfoque combina la tecnología médica más avanzada con un trato humano y personalizado.
                            </p>
                            <p>
                            Nos especializamos en combatir la epidemia moderna de la obesidad y las enfermedades gastrointestinales, utilizando métodos mínimamente invasivos como el <strong>Balón Gástrico</strong> y realizando diagnósticos precisos mediante endoscopía y colonoscopía de alta definición.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                {['Certificado en Balón Gástrico', 'Prevención de Cáncer de Colon', 'Miembro Sociedad de Gastroenterología', 'Atención Personalizada'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                            <UserCheck size={14} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                    </section>

                    {/* Services */}
                    <section id="servicios" className="py-24 pt-12 bg-slate-50">
                        <div className="container mx-auto px-6">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <span className="text-medical-primary font-bold tracking-widest uppercase text-sm">Nuestros Procedimientos</span>
                                <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-6 text-slate-900 font-bold">Servicios Médicos Integrales</h2>
                                <p className="text-slate-600 text-lg">
                                    Ofrecemos soluciones avanzadas para el diagnóstico y tratamiento de enfermedades digestivas y control de peso.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {SERVICES_DATA.map((service) => (
                                    <div key={service.id} onClick={() => handleServiceClick(service)}>
                                        <ServiceCard 
                                            title={service.title}
                                            description={service.description}
                                            icon={service.icon}
                                            highlight={service.id === 'balon'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* BMI Calculator & Prevention */}
                    <section className="py-24 bg-medical-dark text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-medical-primary opacity-20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-accent opacity-20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

                        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="font-serif text-4xl mb-6 font-bold">¿Conoces tu estado de salud actual?</h2>
                                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                    El Índice de Masa Corporal (IMC) es una herramienta clave para identificar riesgos de salud asociados al peso. Un IMC elevado puede ser un factor de riesgo para enfermedades cardiovasculares, diabetes y problemas digestivos.
                                </p>
                                <p className="text-slate-300 text-lg mb-8">
                                    En CEGAM, te ayudamos a interpretar estos resultados y diseñamos un plan a tu medida, ya sea mediante cambios nutricionales o procedimientos como el Balón Gástrico.
                                </p>
                                <div className="flex gap-4">
                                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                                        <div className="text-3xl font-bold text-medical-accent mb-1">500+</div>
                                        <div className="text-xs uppercase tracking-wider text-slate-400">Pacientes Atendidos</div>
                                    </div>
                                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                                        <div className="text-3xl font-bold text-medical-accent mb-1">98%</div>
                                        <div className="text-xs uppercase tracking-wider text-slate-400">Casos Exitosos</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <BMICalculator />
                            </div>
                        </div>
                    </section>

                    {/* Blog & Success Stories */}
                    <section id="casos" className="py-24 pt-10 pt-10 mb-0 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                                <div>
                                    <span className="text-medical-primary font-bold tracking-widest uppercase text-sm">Blog y Testimonios</span>
                                    <h2 className="font-serif text-4xl mt-3 text-slate-900 font-bold">Historias de Transformación</h2>
                                </div>
                                <button className="px-6 py-2 border-2 border-slate-200 rounded-full font-bold text-slate-600 hover:border-medical-primary hover:text-medical-primary transition-colors">
                                    Ver todas las publicaciones
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {BLOG_DATA.map((post) => (
                                    <div key={post.id} onClick={() => handleBlogClick(post)}>
                                        <TestimonialCard 
                                            category={post.category}
                                            date={post.date}
                                            title={post.title}
                                            excerpt={post.excerpt}
                                            image={post.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact Footer */}
                    <section id="contacto" className="bg-slate-900 text-slate-300 py-20 border-t border-slate-800 pt-8">
                        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            
                            <div className="lg:col-span-2">
                                <div className="font-serif text-2xl font-bold">CEGAM
                                </div>
                                <p className="mb-8 text-slate-400 max-w-sm leading-relaxed">
                                    Centro de Gastroenterología Mendoza. Dedicados a mejorar tu calidad de vida a través de la salud digestiva y el control de peso con los más altos estándares médicos.
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-medical-primary hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-medical-primary hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.409-.06 3.809-.06zM12 5.917a6.084 6.084 0 100 12.168 6.084 6.084 0 000-12.168zm0 2.158a3.926 3.926 0 110 7.852 3.926 3.926 0 010-7.852zm9.196-4.706a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" clipRule="evenodd" /></svg>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-6">Información de Contacto</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <MapPin className="text-medical-primary shrink-0 mt-1" size={20} />
                                        <span>El Vigía, 6-59 Av 17, Clínica San Juan<br/>Mérida, Venezuela</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Phone className="text-medical-primary shrink-0" size={20} />
                                        <span>+584247010090 +584147304262</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Mail className="text-medical-primary shrink-0" size={20} />
                                        <span>drJosephdmendozam@gmail.com</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-6">Horarios</h3>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span>Lunes - Viernes</span>
                                        <span className="text-white">9:00 - 18:00</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Sábados</span>
                                        <span className="text-white">9:00 - 13:00</span>
                                    </li>
                                    <li className="flex justify-between text-slate-500">
                                        <span>Domingos</span>
                                        <span>Cerrado</span>
                                    </li>
                                </ul>
                                <a href="https://maps.app.goo.gl/5duTAmXfnejNTD7d6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 block w-full text-center py-2 border border-slate-600 rounded-lg hover:border-medical-primary hover:text-medical-primary transition-colors">
                                    Ver Ubicación en Mapa
                                </a>
                            </div>

                        </div>
                        <div className="mt-4 mb-0 pt-2 border-t border-slate-200 text-center text-sm text-slate-500 pb-0">
                            &copy; 2024 CEGAM - Dr. Joseph Mendoza Monterola. Todos los derechos reservados.
                        </div>
                    </section>
                </main>
            </motion.div>
        )}

        {currentView === 'service-detail' && selectedItem && (
             <motion.div 
                key="service"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
            >
                <ServiceDetailView service={selectedItem} onBack={goBack} />
             </motion.div>
        )}

        {currentView === 'blog-detail' && selectedItem && (
            <motion.div 
                key="blog"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
            >
                <BlogDetailView post={selectedItem} onBack={goBack} />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;