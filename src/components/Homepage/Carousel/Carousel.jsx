import { useEffect, useState } from "react";
import axios from 'axios';

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [bannerImages, setBannerImages] = useState([]); // State for dynamic images
  const [loading, setLoading] = useState(true);

  // 1. Fetch Banners from Database
// Carousel.js mein isay check karein
// Carousel.jsx ka useEffect update karen
useEffect(() => {
  const fetchBanners = async () => {
    try {
      console.log("Fetching banners from API..."); // Debug Log
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/banners`);
      
      console.log("Data received from Backend:", data); // Is se pata chalega backend kya bhej raha hai

      if (Array.isArray(data) && data.length > 0) {
         setBannerImages(data);
      } else if (data && data.images) { // Agar object ke andar array hai
         setBannerImages(data.images);
      }
    } catch (error) {
      console.error("API Error while fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchBanners();
}, []);

  // 2. Auto Timer (Sirf tab chalay jab images mil jayen)
  useEffect(() => {
    if (bannerImages.length > 0) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % bannerImages.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [bannerImages]);

  const next = () => setIndex((index + 1) % bannerImages.length);
  const prev = () => setIndex(index === 0 ? bannerImages.length - 1 : index - 1);

  if (loading) return <div className="h-[80vh] flex items-center justify-center">Loading Banners...</div>;
  if (bannerImages.length === 0) return null; // Agar images na hon toh kuch na dikhaye

  return (
   <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden bg-gray-200">
  {/* Banner Image */}
  <img
    src={bannerImages[index]}
    alt={`Slide ${index + 1}`}
    className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
    key={index} // Key change hone se transition trigger hogi
  />

  {/* Left Arrow Button */}
  <button 
    onClick={prev} 
    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white 
               w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all active:scale-90"
  >
    <span className="text-xl sm:text-2xl">❮</span>
  </button>

  {/* Right Arrow Button */}
  <button 
    onClick={next} 
    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white 
               w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all active:scale-90"
  >
    <span className="text-xl sm:text-2xl">❯</span>
  </button>
  
  {/* Dots Indicator */}
  <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-3">
    {bannerImages.map((_, i) => (
      <div 
        key={i} 
        onClick={() => setIndex(i)} // Agar dots click-able banane hain
        className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full cursor-pointer 
                   ${i === index ? 'w-6 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/40'}`} 
      />
    ))}
  </div>
</div>
  );
}