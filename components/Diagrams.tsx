/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Calculator, AlertCircle, CheckCircle } from 'lucide-react';

// --- BMI CALCULATOR ---
export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to meters
    
    if (w > 0 && h > 0) {
        const val = w / (h * h);
        setBmi(parseFloat(val.toFixed(1)));
    }
  };

  const getStatus = (val: number) => {
      if (val < 18.5) return { label: "Bajo Peso", color: "text-blue-500", bg: "bg-blue-500" };
      if (val < 25) return { label: "Peso Saludable", color: "text-green-500", bg: "bg-green-500" };
      if (val < 30) return { label: "Sobrepeso", color: "text-orange-500", bg: "bg-orange-500" };
      return { label: "Obesidad", color: "text-red-500", bg: "bg-red-500" };
  };

  const status = bmi ? getStatus(bmi) : null;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
        <div className="flex items-center gap-2 mb-6 text-medical-primary">
            <Calculator />
            <h3 className="text-xl font-bold font-serif text-slate-800">Calculadora IMC</h3>
        </div>
        
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Peso (kg)</label>
                <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent outline-none transition-all text-slate-800"
                    placeholder="Ej. 70"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Altura (cm)</label>
                <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent outline-none transition-all text-slate-800"
                    placeholder="Ej. 175"
                />
            </div>
            <button 
                onClick={calculateBMI}
                className="w-full py-3 bg-medical-primary text-white rounded-lg font-bold hover:bg-sky-600 transition-colors shadow-md mt-2"
            >
                Calcular
            </button>
        </div>

        {bmi && status && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-500">Tu IMC es:</span>
                    <span className="text-3xl font-bold text-slate-800">{bmi}</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-2">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className={`h-full ${status.bg}`}
                    />
                </div>
                <p className={`font-bold text-center ${status.color}`}>
                    {status.label}
                </p>
                <p className="text-xs text-center text-slate-400 mt-2">
                    *Este resultado es referencial. Consulta al doctor para un diagnóstico preciso.
                </p>
            </motion.div>
        )}
    </div>
  );
};

// --- SERVICE CARD ---
export const ServiceCard: React.FC<{ title: string, description: string, icon: React.ReactNode, highlight?: boolean, onClick?: () => void }> = ({ title, description, icon, highlight = false, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={`p-8 rounded-xl border transition-all duration-300 group hover:-translate-y-1 cursor-pointer ${highlight ? 'bg-white border-medical-primary shadow-lg ring-1 ring-medical-primary/20' : 'bg-white border-slate-100 hover:shadow-lg hover:border-slate-200'}`}
        >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ${highlight ? 'bg-medical-primary text-white' : 'bg-blue-50 text-medical-primary group-hover:bg-medical-primary group-hover:text-white'}`}>
                {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">{title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">{description}</p>
            <span className="inline-flex items-center text-sm font-bold text-medical-primary hover:text-sky-700 transition-colors">
                Más información <ChevronRight size={16} />
            </span>
        </div>
    )
}

// --- TESTIMONIAL/BLOG CARD ---
export const TestimonialCard: React.FC<{ category: string, date: string, title: string, excerpt: string, image: string, onClick?: () => void }> = ({ category, date, title, excerpt, image, onClick }) => {
    return (
        <div onClick={onClick} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col">
            <div className="h-48 overflow-hidden relative shrink-0">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-medical-primary uppercase tracking-wider">
                    {category}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-slate-400 mb-3 font-medium">{date}</div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-medical-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {excerpt}
                </p>
                <div className="flex items-center gap-2 text-medical-primary font-bold text-sm mt-auto">
                    Leer Historia <ArrowRight size={14} />
                </div>
            </div>
        </div>
    )
}

// Remove unused exports
export const SurfaceCodeDiagram = () => null;
export const TransformerDecoderDiagram = () => null;
export const PerformanceMetricDiagram = () => null;