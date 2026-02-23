import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Theme Color Constant
  const themeColor = "#248041";

  // Input change handle karne ka function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit logic (Backend Connection)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend API call
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contacts`, formData);

      setSubmitted(true);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Maaf kijiye! Message nahi bheja ja saka.");
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: "Email Us", detail: "masoodhqsurgicals@gmail.com", sub: "24/7 support reply" },
    { icon: <Phone size={20} />, title: "Call Us", detail: " +92 321 117 2335", sub: "Mon-Fri, 09:00 AM - 09:00 PM" },
    { icon: <MapPin size={20} />, title: "Our Office", detail: "Street 1 Butter Road near Rescue 1122 Daburgi Malian.", sub: "postal code 51310, SIALKOT PAKISTAN" },
    { icon: <Clock size={20} />, title: "Working Hours", detail: "09:00 AM - 06:00 PM", sub: "Weekend Closed" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans">

      {/* 1. Header Section */}
      <section className="bg-white border-b border-slate-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div
            style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Contact Our Team
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Let's Start a <span style={{ color: themeColor }}>Conversation</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium">
            Whether you have a question or a project to discuss, our team is always ready to assist you
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* 2. Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
            {submitted ? (
              <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                <div
                  style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Message Sent!</h2>
                <p className="text-slate-500">Shukriya! Hum bohot jald aapse rabta karenge.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 transition-all text-slate-900 placeholder:text-slate-400"
                      style={{ "--tw-ring-color": themeColor }} // Focus ring color
                      placeholder="Enter Your Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 transition-all text-slate-900 placeholder:text-slate-400"
                      style={{ "--tw-ring-color": themeColor }}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 transition-all text-slate-900 placeholder:text-slate-400"
                    style={{ "--tw-ring-color": themeColor }}
                    placeholder="How can we help?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                    style={{ "--tw-ring-color": themeColor }}
                    placeholder="Tell us about your problem..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: themeColor }}
                  className="w-full py-5 hover:opacity-90 text-white rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"} <Send size={20} />
                </button>
              </form>
            )}
          </div>

          {/* 3. Info Cards Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="group p-6 rounded-3xl bg-white border border-slate-100 hover:border-[#24804150] hover:shadow-xl transition-all duration-300 flex items-center gap-6">
                  <div
                    style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-[#248041] group-hover:text-white transition-all duration-300"
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-black tracking-tight">{info.title}</h4>
                    <p style={{ color: themeColor }} className="font-bold text-sm">{info.detail}</p>
                    <p className="text-slate-400 text-xs mt-1 font-medium">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. Map Section */}
        <div className="mt-8 overflow-hidden border border-slate-100 shadow-lg h-[400px] grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;