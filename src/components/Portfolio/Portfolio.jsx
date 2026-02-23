import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, Star, CheckCircle2, Globe, ShieldCheck, Microscope, Thermometer, Briefcase } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Haq Surgical Related Categories
  const categories = ['All', 'Surgical', 'Dental', 'Orthopedic', 'Veterinary'];

  const projects = [
    {
      id: 1,
      title: "German Grade Scissors",
      category: "Surgical",
      image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=800",
      description: "Ultra-sharp precision cutting tools for delicate procedures."
    },
    {
      id: 2,
      title: "Titanium Dental Kit",
      category: "Dental",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800",
      description: "Corrosion-resistant forceps and elevators for modern dentistry."
    },
    {
      id: 3,
      title: "Bone Compression Set",
      category: "Orthopedic",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800",
      description: "High-strength implants and instruments for bone surgery."
    },
    {
      id: 4,
      title: "Retractor Systems",
      category: "Surgical",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800",
      description: "Self-retaining systems for maximum visibility during operations."
    },
    {
      id: 5,
      title: "Equine Dental Tools",
      category: "Veterinary",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446f8a?q=80&w=800",
      description: "Heavy-duty specialized tools for veterinary professionals."
    },
    {
      id: 6,
      title: "Diagnostic Scope",
      category: "Surgical",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800",
      description: "High-clarity diagnostic instruments for clinical accuracy."
    }
  ];

  // Inline Style Objects (Updated to #248041)
  const heroGradient = {
    background: 'linear-gradient(135deg, rgba(36, 128, 65, 0.1) 0%, rgba(52, 211, 153, 0.1) 50%, transparent 100%)'
  };

  const textGradient = {
    background: 'linear-gradient(to right, #248041, #34d399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const activeTabGradient = {
    background: 'linear-gradient(to right, #248041, #34d399)'
  };

  const overlayGradient = {
    background: 'linear-gradient(to top, #0a1a0f 0%, rgba(36, 128, 65, 0.4) 60%, transparent 100%)'
  };

  const statNumberGradient = {
    background: 'linear-gradient(to right, #248041, #34d399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const ctaGradient = {
    background: 'linear-gradient(to right, #1a4a2a, #248041)'
  };

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className={`min-h-screen bg-[#F8FAFC] font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-28 overflow-hidden bg-[#0a1a0f]">
        <div className="absolute inset-0" style={heroGradient}></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-5xl   text-white tracking-tighter mb-8 leading-tight">
            We don't just manufacture instruments; we provide the precision that empowers a surgeon's expertise.
            {/* <span style={textGradient} className="italic">Excellence</span> */}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Haq Surgical delivers world-class instruments that empower medical professionals across 45+ countries.
          </p>
        </div>
      </section>

      {/* 2. FILTER SYSTEM */}
      <section className="sticky top-0 z-30 py-8 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={filter === cat ? activeTabGradient : {}}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:scale-95 ${filter === cat
                ? 'text-white shadow-lg shadow-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PORTFOLIO GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
              <div style={{ aspectRatio: '4 / 5' }} className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" style={overlayGradient}>
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-slate-300 text-sm mb-6 line-clamp-2">{project.description}</p>
                  <button className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl hover:bg-[#248041] transition-all">
                    View Specifications <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { num: "15k+", label: "Instruments Produced" },
              { num: "45+", label: "Countries Reached" },
              { num: "25+", label: "Years of Legacy" },
              { num: "ISO", label: "Certified Quality" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-black" style={statNumberGradient}>
                  {stat.num}
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Trusted by Surgeons Worldwide</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Dr. Arshad Khan", role: "Senior Surgeon", text: "Haq Surgical tools have an incredible grip and balance. The German stainless steel quality is evident in every procedure." },
            { name: "Dr. Sarah Miller", role: "Orthopedic Specialist", text: "The precision of their orthopedic drill bits is unmatched. Fast delivery and exceptional customer service every time." },
            { name: "Prof. Ahmed Ali", role: "Dental Clinic Director", text: "We have been sourcing our dental forceps for 10 years. Their durability and sterilization resistance are top-notch." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
              <div className="flex gap-1 text-[#248041] mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-700 font-medium mb-8 leading-relaxed italic">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-[#248041] font-bold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-6 mb-20 mt-20">
        <div className="relative rounded-[4rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-emerald-900/20" style={ctaGradient}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              Start Your Custom <br /> Manufacturing Project
            </h2>
            <p className="text-emerald-100/70 mb-10 max-w-xl mx-auto font-medium">
              We specialize in OEM and ODM services for global medical brands. Let's discuss your requirements.
            </p>
            <button className="bg-white text-[#248041] px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 hover:scale-105 transition-all active:scale-95 shadow-xl">
              Get A Free Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;