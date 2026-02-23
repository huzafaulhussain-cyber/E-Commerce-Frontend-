import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubscribe = async (e) => {
    if (e) e.preventDefault();

    if (!email) {
      setMessage({ text: 'Please enter an email!', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/subscribers`, { email });
      setMessage({ text: response.data.message || 'Subscribed successfully! 🎉', type: 'success' });
      setEmail('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong. Try again.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  };

  const footerBgStyle = {
    background: 'linear-gradient(to bottom, #0f172a, #0f172a, #000000)'
  };

  const blueBlurStyle = {
    background: '#3b82f6',
    filter: 'blur(160px)',
    opacity: 0.08
  };

  const purpleBlurStyle = {
    background: '#a855f7',
    filter: 'blur(160px)',
    opacity: 0.08
  };

  const buttonGradient = {
    background: 'linear-gradient(to right, #248041, #34d399)' // Dark Green to Emerald Green
  };

  return (
    <footer className="relative text-gray-100" style={footerBgStyle}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full" style={blueBlurStyle}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full" style={purpleBlurStyle}></div>
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Grid updated to 4 columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">

                <span className="text-xl font-bold text-white">Haq Surgical</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Street 1 Butter Road near Rescue 1122 Daburgi Malian,
                postal code 51310, SIALKOT PAKISTAN.
              </p>

              <div className="flex gap-4">
                {[
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                  { Icon: Twitter, label: 'Twitter' },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    className="group w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-700"
                    aria-label={label}
                  >
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative pb-2 group cursor-default">
                Quick Links
                {/* Aapka Manga hua Gradient + Animation */}
                <span
                  className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 w-8 group-hover:w-16"
                  style={buttonGradient}
                ></span>
              </h3>

              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Services', path: '/services' },
                  { name: 'Portfolio', path: '/Portfolio' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      className="group relative text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block pb-1"
                    >
                      {link.name}
                      {/* Link ke neeche wali line bhi gradient mein */}
                      <span
                        className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                        style={buttonGradient}
                      ></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative pb-2">
                Contact Info
                <span
                  className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 w-8 group-hover:w-16"
                  style={buttonGradient}
                ></span>
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-[#248041] flex items-center justify-center transition-all duration-300 ">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <a href="mailto:support@premium.com" className="text-sm text-gray-300 ">masoodhqsurgicals@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-[#248041] flex items-center justify-center transition-all duration-300 ">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <a href="mailto:support@premium.com" className="text-sm text-gray-300 ">Info@haqsurgical.com</a>
                  </div>
                </div>

                <div className="flex gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-[#248041] flex items-center justify-center transition-all duration-300  ">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Phone</p>
                    <a href="tel:+1234567890" className="text-sm text-gray-300 ">+92 321 117 2335</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative pb-2">
                Newsletter
                <span
                  className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 w-8 group-hover:w-16"
                  style={buttonGradient}
                ></span>              </h3>
              <p className="text-gray-400 text-sm mb-4"> Sign up for the newsletter and receive a 10% discount on your next order.

              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-500 transition-all focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group disabled:opacity-50"
                  style={buttonGradient}
                >
                  <span>{loading ? 'Sending...' : 'Subscribe'}</span>
                  {!loading && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>

                {message.text && (
                  <p className={`text-sm text-center mt-2 animate-bounce ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {message.text}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">© Copy Rights 2020 Haq Surgical Private Limited.</p>
              <div className="flex gap-6">
                <a href="/about" className="text-gray-500 hover:text-[#248041] text-sm">About Us</a>
                <a href="/contact" className="text-gray-500 hover:text-[#248041] text-sm">Contact</a>
                <a href="#" className="text-gray-500 hover:text-[#248041] text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-[#248041] text-sm">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}