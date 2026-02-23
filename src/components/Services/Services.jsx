import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  RefreshCcw,
  Zap,
  Globe,
  Settings,
  Microscope,
  Users,
  Search,
  CheckCircle2,
  LifeBuoy,
  ArrowRight,
  Smartphone,
  Trophy,
  Award,
  FlaskConical,
  Stethoscope,Box
} from 'lucide-react';

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const themeColor = "#248041"; 

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Professional Font Style
  const fontStyle = { fontFamily: "'Outfit', sans-serif" };

  const services = [
    {
      id: 1,
      title: "Custom Instrument Forging",
      desc: "We specialize in manufacturing bespoke surgical tools tailored to specific procedural requirements and surgeon preferences.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      id: 2,
      title: "OEM & White Labeling",
      desc: "Expand your medical brand with our premium quality instruments, manufactured under your own label with global standards.",
      icon: <Award className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Material Grade Optimization",
      desc: "Expert selection of AISI 420, 440, and Titanium alloys to ensure the perfect balance of hardness and corrosion resistance.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Precision Heat Treatment",
      desc: "Advanced vacuum tempering processes to achieve the ideal Rockwell hardness for long-lasting edge retention.",
      icon: <FlaskConical className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Surface Finishing & Coating",
      desc: "Offering Ceramic, Plasma, and Gold coatings for enhanced durability, reduced glare, and superior aesthetic appeal.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Bulk Institutional Supplies",
      desc: "Streamlined supply chain solutions for hospitals and clinics, ensuring consistent quality across large-scale orders.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 7,
      title: "Customized Kit Assembly",
      desc: "Developing complete surgical, dental, and orthopedic sets tailored for specific medical departments.",
      icon: <Stethoscope className="w-6 h-6" />
    },
    {
      id: 8,
      title: "Quality Assurance Testing",
      desc: "Rigorous ISO-standard testing including boil tests and performance checks for 100% reliability.",
      icon: <Microscope className="w-6 h-6" />
    }
  ];

  return (
    <div style={fontStyle} className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* 1. HERO SECTION - Ultra Bold Typography */}
      <section className="relative pt-40 pb-32 bg-[#0a1a0f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(36,128,65,0.1)_0%,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[11px] uppercase tracking-[0.3em] mb-10 backdrop-blur-md">
            World-Class Manufacturing
          </div>
          <h1 className="text-7xl  text-white tracking-[-0.04em] mb-10  ">
            Precision Engineering <br />
            <span style={{ color: themeColor }}>For Global Healthcare</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
            Haq Surgical provides end-to-end manufacturing solutions for premium medical instruments, forged with precision and certified for international excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              style={{ backgroundColor: themeColor }}
              className="w-full sm:w-auto text-white px-10 py-5 rounded-2xl font-[900] text-lg hover:scale-105 transition-all shadow-2xl shadow-emerald-900/40"
            >
              Request a Custom Quote
            </button>
            <button className="w-full sm:w-auto bg-transparent text-white border border-white/20 px-10 py-5 rounded-2xl font-[900] text-lg hover:bg-white/5 transition-all">
              Download Catalog
            </button>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES GRID */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-20">
             <h2 className="text-5xl font-[900] text-slate-900 tracking-tight mb-4">Manufacturing Expertise.</h2>
             <div className="h-1.5 w-24 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.id} className="group p-10 bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-3">
              <div 
                style={{ color: themeColor }}
                className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm"
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-snug">{service.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MANUFACTURING PROCESS */}
      <section className="py-32 bg-[#0a1a0f] rounded-[60px] mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl md:text-7xl font-[900] text-white mb-24 tracking-tighter">Our Precision Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {[
              { t: "Material Sourcing", d: "Selecting the finest German-grade stainless steel alloys." },
              { t: "Die-Forging", d: "High-pressure forging for superior structural integrity." },
              { t: "Artisanal Finishing", d: "Hand-finished by master craftsmen for surgical precision." },
              { t: "Certified QC", d: "Exacting quality checks under ISO & CE standards." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div 
                  className="w-20 h-20 rounded-[2.5rem] bg-emerald-500 text-white flex items-center justify-center text-3xl font-black mb-8 mx-auto shadow-[0_15px_30px_-5px_rgba(16,185,129,0.4)] transition-all group-hover:rotate-12"
                >
                  {i + 1}
                </div>
                <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{step.t}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed px-4">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY PARTNER WITH HAQ SURGICAL */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-6xl font-[900] text-slate-900 tracking-tighter mb-10 leading-[0.9]">Why Professionals <br /> Choose Us?</h2>
          <div className="space-y-4">
            {[
              { t: "ISO 13485 & CE Compliance", i: <CheckCircle2 className="text-emerald-500" /> },
              { t: "Custom OEM/ODM Manufacturing", i: <CheckCircle2 className="text-emerald-500" /> },
              { t: "Sialkot's Master Craftsmanship", i: <CheckCircle2 className="text-emerald-500" /> },
              { t: "Rigorous Post-Production Testing", i: <CheckCircle2 className="text-emerald-500" /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 p-6 rounded-3xl border border-slate-50 hover:bg-slate-50 transition-all group">
                <div className="shrink-0 group-hover:scale-125 transition-transform">{item.i}</div>
                <span className="font-black text-slate-800 tracking-tight">{item.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <Trophy size={40} className="text-emerald-600" />
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Legacy of Quality</h4>
              </div>
              <p className="text-slate-500 font-medium leading-loose mb-8">
                With a commitment to surgical excellence, Haq Surgical has established itself as a reliable partner for medical professionals globally. Every instrument that leaves our facility carries the promise of precision and life-long durability.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl">
                    <p className="text-3xl font-black text-slate-900">45+</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Countries</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl">
                    <p className="text-3xl font-black text-slate-900">100%</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Inspection</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* 6. FINAL CTA - HAQ SURGICAL SPECIAL */}
       <section className="max-w-7xl mx-auto px-6 mb-24 mt-24">
  <div 
    className="relative rounded-[4rem]  p-12 md:p-24 text-center overflow-hidden shadow-[0_50px_100px_-15px_rgba(36,128,65,0.3)] border border-emerald-500/20" 
    style={{ 
      background: 'radial-gradient(circle at top left, #1a4a2a 0%, #0a1a0f 50%, #248041 100%)' 
    }}
  >
    {/* Decorative Elements for Attraction */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full -mr-20 -mt-20"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 blur-[100px] rounded-full -ml-20 -mb-20"></div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>

    <div className="relative z-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-[10px] font-black uppercase tracking-[0.4em] mb-10 backdrop-blur-md">
        <Globe size={14} className="animate-spin-slow" /> Global Alliances 2026
      </div>

      <h2 className="text-5xl md:text-8xl font-[900] text-white mb-8 tracking-tighter  ">
        Forge Future <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Medical Alliances.</span>
      </h2>

      <p className="text-emerald-100/60 mb-14 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
        Become a global partner. We empower distributors and medical brands with superior, ISO-certified surgical instruments for international markets.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button className="group relative px-12 py-6 bg-emerald-500 text-white font-black text-xl rounded-2xl hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] flex items-center gap-3">
          Start Partnership <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
        </button>
        
        <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black text-xl rounded-2xl hover:bg-white/10 backdrop-blur-xl transition-all">
          B2B Solutions
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="flex items-center gap-2 text-white font-bold text-xs tracking-widest uppercase">
          <ShieldCheck size={16} /> ISO 13485 Certified
        </div>
        <div className="flex items-center gap-2 text-white font-bold text-xs tracking-widest uppercase">
          <Award size={16} /> CE Accredited
        </div>
        <div className="flex items-center gap-2 text-white font-bold text-xs tracking-widest uppercase">
          <Box size={16} /> OEM/ODM Ready
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Services;