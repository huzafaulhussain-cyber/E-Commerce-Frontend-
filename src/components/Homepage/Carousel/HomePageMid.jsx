import React, { useState, useEffect } from 'react';
import {
  Zap, Brain, ShoppingCart, RefreshCcw,
  BarChart3, Globe, Rocket, ShieldCheck,
  ArrowRight, Plus, Sparkles, PieChart,
  ChevronRight, ChevronLeft, Target, Stethoscope, HeartPulse, Activity
} from 'lucide-react';

const HomePageMid = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const mainGradient = {
    background: 'linear-gradient(to right, #248041, #34d399)',
  };

  const textGradient = {
    background: 'linear-gradient(to right, #248041, #34d399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  };

  const overlayGradient = {
    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 100%)'
  };

  return (
    <div className={`min-h-screen bg-white font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* 1. PRECISION INSTRUMENTS SECTION (Products) */}
      <section className="py-24 bg-white">
        <div className=" mx-auto px-26">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Precision Instruments</h3>
            <p className="mt-4 text-slate-500 font-medium">ISO Certified Surgical, Dental & Veterinary Tools</p>
            <div className="h-1.5 w-20 bg-[#248041] mt-6 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {[
              { t: "Surgical Scissors", r: "Premium Grade", img: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=600" },
              { t: "Dental Forceps", r: "German Stainless", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600" },
              { t: "Scalpel Handles", r: "High Precision", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600" },
              { t: "Needle Holders", r: "Ergonomic Design", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600" },
              { t: "Tweezers & Forceps", r: "Anti-Magnetic", img: "https://haqsurgical.com/uploads/images/medium/0c99f5bd47eadaccf70d69a7bfee9ce0.jpg" },
              { t: "Retractors", r: "Self-Retaining", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=600" },
              { t: "Orthopedic Drills", r: "Heavy Duty", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=600" },
              { t: "Diagnostic Sets", r: "Full Kit", img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600" }
            ].map((p, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500" style={{ aspectRatio: '4 / 5', backgroundColor: '#F8FAFC' }}>
                <img src={p.img} alt={p.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={overlayGradient}>
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-2xl font-black text-white mb-2">{p.t}</h4>
                    <p className="text-emerald-400 font-bold mb-6">{p.r}</p>
                    <button className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-white text-slate-900 shadow-xl hover:bg-[#248041] hover:text-white transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. QUALITY EXPERIENCE SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 bg-emerald-50 text-[#248041] rounded-lg"><ShieldCheck size={20} /></span>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Legacy of Trust</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
            Haq Surgical: Engineering <span style={textGradient}>Healthcare Excellence</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
            We don't just manufacture instruments; we provide the precision that empowers a surgeon's expertise.          </p>
          <button style={mainGradient} className="group relative px-10 py-5 rounded-full text-white font-black text-lg shadow-2xl shadow-emerald-200 hover:scale-105 active:scale-95 transition-all">
            Download Product Catalogue
          </button>
        </div>

        <div className="relative">
          <div style={{ background: 'radial-gradient(circle, rgba(36, 128, 65, 0.15) 0%, transparent 70%)' }} className="absolute -inset-20 blur-[100px] rounded-full"></div>
          <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 transform rotate-3 hover:rotate-0 transition-transform duration-700">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <div className="w-3 h-3 rounded-full bg-[#248041]"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-200"></div>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Standards: ISO 13485</div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center">
                <Activity className="text-[#248041] animate-pulse" size={40} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-[#248041] rounded-2xl p-4 text-white">
                  <div className="text-[10px] opacity-70 text-white/80">Quality Score</div>
                  <div className="text-2xl font-black">99.8%</div>
                </div>
                <div className="h-20 bg-slate-900 rounded-2xl p-4 text-white">
                  <div className="text-[10px] opacity-70 text-white/80">Exported to</div>
                  <div className="text-2xl font-black">45+ Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE EXPERTISE SNAPSHOT */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-black mb-20 tracking-tight text-slate-900">Why Global Hospitals Choose Haq Surgical</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "German Material", s: "J2 Stainless Steel", i: <ShieldCheck /> },
              { t: "Sterile Design", s: "Easy to Autoclave", i: <RefreshCcw /> },
              { t: "Custom Branding", s: "OEM/ODM Service", i: <Zap /> },
              { t: "Global Shipping", s: "Doorstep Delivery", i: <Globe /> },
              { t: "Precision Craft", s: "Hand-Finished", i: <Target /> },
              { t: "Expert Support", s: "Technical Guidance", i: <Brain /> },
              { t: "Warranty", s: "Replacement Policy", i: <ShieldCheck /> },
              { t: "Fast Lead Time", s: "Bulk Production", i: <Rocket /> }
            ].map((s, idx) => (
              <div key={idx} className="group relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="w-12 h-12 bg-emerald-50 text-[#248041] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#248041] group-hover:text-white transition-all">
                  {s.i}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{s.t}</h4>
                <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-[#248041] transition-all duration-500 opacity-0 group-hover:opacity-100 flex items-center justify-center p-4">
                  <p className="text-white font-black text-sm">{s.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MANUFACTURING LOOP */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Our Manufacturing Standards</h2>
            <p className="text-slate-500 font-medium italic">Forging quality that saves lives.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Forging", "Heat Treatment", "Polishing", "QC Testing"].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-xl transition-all duration-1000 group-hover:rotate-[360deg]"
                  style={mainGradient}>
                  {i + 1}
                </div>
                <h4 className="font-black text-slate-900 text-xl mb-2">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA (HAQ SURGICAL SPECIAL) */}
      <section className="py-24 px-6 mb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto rounded-[60px] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(36,128,65,0.4)] border border-white/10">
          <div className="absolute inset-0 bg-[#0a1a0f] animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a2a] via-[#248041] to-[#34d399] opacity-90"></div>
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#248041]/40 rounded-full blur-[120px]"></div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="mb-6 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-xs font-black uppercase tracking-[0.4em] backdrop-blur-md">
              Leading Surgical Manufacturer
            </span>

            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-white leading-[1.1]">
              Haq Surgical: Precision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-emerald-300/50">You Can Trust.</span>
            </h2>

            <p className="max-w-2xl text-lg md:text-xl text-emerald-50/70 font-medium leading-relaxed mb-12">
              From Sialkot to the World. Delivering high-grade surgical, dental, and orthopedic instruments crafted with German stainless steel.
            </p>

            <div className="group relative">
              <div className="absolute -inset-1 bg-emerald-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-all duration-700"></div>
              <button className="relative px-12 py-6 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full font-black text-xl text-white hover:border-emerald-400/50 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="flex items-center gap-3">
                  Request a Bulk Quote
                </span>
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 opacity-50">
              <p className="text-[10px] text-white font-black uppercase tracking-widest">ISO 13485 Certified</p>
              <div className="h-1 w-1 rounded-full bg-white"></div>
              <p className="text-[10px] text-white font-black uppercase tracking-widest">Global Export Quality</p>
              <div className="h-1 w-1 rounded-full bg-white"></div>
              <p className="text-[10px] text-white font-black uppercase tracking-widest">Premium German Grade</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePageMid;