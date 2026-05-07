/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Star,
  X,
  Calendar,
  Users,
  MessageSquare,
  Send,
  Menu
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import MenuPage from './MenuPage';
import ContactPage from './ContactPage';
import OrderPage from './OrderPage';
import { MapView } from './MapComponent';

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-2">{subtitle}</p>}
    <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">{children}</h2>
  </div>
);

function Home({ openModal }: { openModal: () => void }) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=2000" 
            alt="Atmospheric cafe interior" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-zinc-400 uppercase tracking-[0.4em] text-sm mb-6">Your Daily Ritual</p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-8 leading-none">
              Katina's <span className="italic text-zinc-500 font-extralight block md:inline">Kafé</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              A cozy café in Kigali serving expertly roasted coffee and fresh artisan pastries. The perfect setting to connect, relax, and recharge.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link 
                id="cta_hero_primary"
                to="/order"
                className="w-full md:w-auto px-10 py-4 bg-white text-black font-medium text-sm lg:text-base uppercase tracking-widest hover:bg-zinc-200 transition-colors text-center"
              >
                Order Ahead
              </Link>
              <Link 
                id="cta_hero_secondary"
                to="/menu"
                className="w-full md:w-auto px-10 py-4 border border-zinc-500 text-white font-medium text-sm lg:text-base uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all text-center"
              >
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>


      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-4 md:col-span-8 xl:col-span-6"
          >
            <SectionHeading subtitle="Our Story">A Space for Connection</SectionHeading>
            <div className="space-y-6 text-zinc-400 text-lg font-light leading-relaxed">
              <p>
                <span className="text-white">Katina’s Kafé</span> is a cozy café in Kigali with a strong social mission. Known for its welcoming atmosphere, good coffee, and community events, the café also empowers the deaf community by employing deaf baristas and promoting inclusion through sign language.
              </p>
              <p>
                It’s more than just a coffee spot — it’s a space for connection, awareness, and impact.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-4 md:col-span-8 xl:col-span-6 xl:col-start-7 aspect-[4/3] relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200" 
              alt="Warm cafe seating" 
              className="w-full h-full object-cover rounded-sm grayscale-[0.3]"
              referrerPolicy="no-referrer"
            />

          </motion.div>
        </div>
      </section>

      {/* Menu Section Highlights */}
      <section id="menu" className="py-24 md:py-32 bg-zinc-950 border-y border-zinc-900 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mb-4">Curated Taste</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-zinc-800"></div>
              <div className="w-1.5 h-1.5 rotate-45 border border-zinc-600 bg-zinc-900"></div>
              <div className="w-8 h-px bg-zinc-800"></div>
            </div>
            <h2 className="text-4xl font-light tracking-wide text-white">Selection</h2>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-8 mt-8">
            {[
              { 
                name: 'Coffee & Tea', 
                subtitle: 'AROMATIC BREWS', 
                img: 'https://res.cloudinary.com/dul9fo9cv/image/upload/v1776855894/download_6_im6mjn.jpg', 
                span: 'col-span-4 md:col-span-8 xl:col-span-8',
                showLink: false
              },
              { 
                name: 'Breakfast & Brunch', 
                subtitle: 'MORNING CLASSICS', 
                img: 'https://res.cloudinary.com/dul9fo9cv/image/upload/v1776853092/download_5_o0htca.jpg', 
                span: 'col-span-4 md:col-span-4 xl:col-span-4',
                showLink: false
              },
              { 
                name: 'Cocktails & Shots', 
                subtitle: 'EVENING SPIRITS', 
                img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', 
                span: 'col-span-4 md:col-span-4 xl:col-span-4',
                showLink: false
              },
              { 
                name: "Katina's Tapas", 
                subtitle: 'SOCIAL PLATES', 
                img: 'https://res.cloudinary.com/dul9fo9cv/image/upload/v1778164589/Spicy_Chicken_Fry_Recipe_Crispy_Kababs_-_Cubes_N_Juliennes_lvt13j.jpg', 
                span: 'col-span-4 md:col-span-8 xl:col-span-8',
                showLink: true
              },
            ].map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`${cat.span} h-64 md:h-[340px]`}
              >
                <Link to="/menu" className="group block relative w-full h-full overflow-hidden bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                      <p className="text-zinc-400 text-[10px] font-medium tracking-[0.2em] uppercase mb-2">
                        {cat.subtitle}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-serif font-light text-white tracking-wide">
                        {cat.name}
                      </h3>
                      {cat.showLink && (
                        <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <span className="text-white text-[10px] font-medium tracking-widest uppercase">VIEW MENU</span>
                          <span className="text-white text-xs">→</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center relative z-10">
            <Link to="/menu" className="text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-white px-8 py-4 border border-zinc-800 hover:border-white transition-all inline-block bg-zinc-950">
              Explore Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Ambiance Gallery */}
      <section id="gallery" className="py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Ambiance">The Visuals</SectionHeading>
          
          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-8 auto-rows-[300px]">
            <div className="col-span-4 md:col-span-4 xl:col-span-6 row-span-2 relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200" alt="Espresso machine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2]" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] border border-white px-4 py-2 text-white">View Larger</span>
              </div>
            </div>
            
            <div className="col-span-4 md:col-span-4 xl:col-span-6 relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200" alt="Latte art pouring" className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] border border-white px-4 py-2 text-white">View Larger</span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-2 xl:col-span-3 relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200" alt="Coffee shop seating" className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] border border-white px-4 py-2 text-white">View Larger</span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-2 xl:col-span-3 relative group overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1509365465994-3e21ba3e18a0?auto=format&fit=crop&q=80&w=1200" alt="Fresh pastries" className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] border border-white px-4 py-2 text-white">View Larger</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-950 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-8 h-8 text-white mx-auto mb-10 opacity-30" />
          <div className="relative">
            <p className="text-2xl md:text-3xl font-light italic text-white leading-relaxed mb-8">
              “An absolute masterclass in atmosphere and specialty coffee.”
            </p>
            <div className="flex flex-col items-center">
              <span className="text-zinc-500 text-xs uppercase tracking-widest">— Culinary Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-24 md:py-32 px-8 md:px-16 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-8 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-4 md:col-span-8 xl:col-span-5"
            >
              <p className="text-zinc-500 uppercase tracking-widest text-[10px] mb-4">Feedback</p>
              <h2 className="text-4xl font-light text-white mb-6 tracking-tight">Share Your Experience</h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Your thoughts matter to us. Whether you had a wonderful dinner or have suggestions on how we can improve, we'd love to hear it.
              </p>
              <div className="flex items-center gap-4 text-zinc-500 text-xs uppercase tracking-widest">
                <MessageSquare className="w-4 h-4" />
                <span>Private & Confidential</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-4 md:col-span-8 xl:col-span-7"
            >
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900/50 border border-zinc-800 p-12 text-center rounded-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4">Thank You!</h3>
                  <p className="text-zinc-400 font-light max-w-sm mx-auto">
                    Your feedback has been received. We appreciate you taking the time to share your review with us.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Send another review
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500">Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors font-light"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500">Email (Optional)</label>
                      <input 
                        type="email" 
                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors font-light"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">Overall Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform active:scale-95"
                        >
                          <Star 
                            className={`w-6 h-6 transition-colors ${
                              star <= (hoveredRating || rating) 
                                ? 'fill-white text-white' 
                                : 'text-zinc-800'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500">Your Experience</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors resize-none font-light"
                      placeholder="Tell us about your visit..."
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500">Suggestions for us</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors resize-none font-light"
                      placeholder="How can we make your next visit even better?"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-white hover:text-zinc-400 transition-colors"
                  >
                    Submit Review
                    <div className="w-12 h-px bg-zinc-800 group-hover:bg-white transition-colors"></div>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info/Map Section */}
      <section id="contact" className="py-24 md:py-32 px-8 md:px-16 border-t border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-8 items-center">
          
          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-4 md:col-span-8 xl:col-span-6 xl:col-start-7 h-[400px] lg:h-[600px] rounded-lg overflow-hidden border border-zinc-800 lg:order-2 order-2"
          >
            <MapView />
          </motion.div>

          {/* Details Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-4 md:col-span-8 xl:col-span-5 xl:col-start-1 lg:order-1 order-1 space-y-16"
          >
            <div>
              <SectionHeading subtitle="Visit Us">Come Say Hello</SectionHeading>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {/* Location */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-zinc-500">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest">Our Location</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-light text-white leading-tight">
                    Katina's Kafé<br />
                    31 KG 8 Ave, Kigali
                  </p>
                  <a href="https://www.google.com/maps/search/?api=1&query=Katina's+Kafé+31+KG+8+Ave+Kigali" target="_blank" rel="noopener noreferrer" className="inline-block text-zinc-500 text-xs underline underline-offset-4 hover:text-white transition-colors pt-2 font-medium uppercase tracking-widest cursor-pointer">
                    Get Directions
                  </a>
                </div>
              </motion.div>

              {/* Times */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-zinc-500">
                  <Clock className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest">Opening Hours</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-400 text-sm">Sun — Tue</span>
                    <span className="text-white text-sm">07:00 — 22:00</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-400 text-sm">Wed — Thu</span>
                    <span className="text-white text-sm">07:00 — 00:00</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-400 text-sm">Fri — Sat</span>
                    <span className="text-white text-sm">07:00 — 02:00</span>
                  </div>
                </div>
              </motion.div>

              {/* Contact Phone & Email */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-zinc-500">
                  <Phone className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest">Connect</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-lg text-white font-light">0795465276</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg text-white font-light underline underline-offset-4">hello@katina.cafe</p>
                  </div>
                </div>
              </motion.div>

              {/* Socials & Link */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-zinc-500">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest">Social & More</span>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Instagram className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                    <Facebook className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link to="/contact" className="inline-block text-[10px] uppercase tracking-widest text-zinc-400 border border-zinc-800 hover:border-white hover:text-white px-6 py-4 transition-colors text-center w-full sm:w-auto">
                      Detailed Contact Form
                    </Link>
                    <Link to="/#feedback" className="inline-block text-[10px] uppercase tracking-widest text-white border border-white/10 hover:border-white px-6 py-4 transition-colors text-center w-full sm:w-auto bg-white/5 font-semibold">
                      Leave Feedback
                    </Link>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function AppLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  // Handle Hash Scrolling since React Router blocks default cross-page anchor behavior easily
  useEffect(() => {
    // Also close mobile menu on route change
    setIsMobileMenuOpen(false);

    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between ${
          isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-900 py-4 shadow-2xl' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://res.cloudinary.com/dul9fo9cv/image/upload/v1778161434/katina_kafe_oqrqmj.png" 
            alt="Katina's Kafé Logo" 
            className="w-10 h-10 object-contain" 
            referrerPolicy="no-referrer"
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
          <Link to="/#about" className="hover:text-white transition-colors">About</Link>
          <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
          <Link to="/#gallery" className="hover:text-white transition-colors">Gallery</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link to="/order" className="hover:text-white transition-colors">Order Online</Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            id="cta_book_nav"
            onClick={() => setIsModalOpen(true)}
            className="hidden md:inline-block px-6 py-2 border border-zinc-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs uppercase tracking-widest"
          >
            Book a Table
          </button>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-8 pb-8 flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-8 text-sm uppercase tracking-widest font-medium mt-8 text-zinc-400">
              <Link to="/#about" className="hover:text-white transition-colors text-center pb-4 border-b border-zinc-900" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/menu" className="hover:text-white transition-colors text-center pb-4 border-b border-zinc-900" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
              <Link to="/#gallery" className="hover:text-white transition-colors text-center pb-4 border-b border-zinc-900" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/contact" className="hover:text-white transition-colors text-center pb-4 border-b border-zinc-900" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/order" className="hover:text-white transition-colors text-center pb-4 border-b border-zinc-900" onClick={() => setIsMobileMenuOpen(false)}>Order Online</Link>
            </div>
            
            <button 
              onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
              className="mt-8 w-full py-4 text-center border border-zinc-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs uppercase tracking-widest"
            >
              Book a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home openModal={() => setIsModalOpen(true)} />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-zinc-950 border border-zinc-900 shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-10">
                <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mb-2">Reservation</p>
                <h2 className="text-4xl font-light tracking-tight text-white mb-4">Secure Your Table</h2>
                <div className="w-12 h-px bg-zinc-800 mx-auto" />
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
                      <Calendar className="w-3 h-3" /> Date
                    </label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-colors cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
                      <Clock className="w-3 h-3" /> Time
                    </label>
                    <select 
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      <option value="">Select Time</option>
                      <option>18:00</option>
                      <option>19:00</option>
                      <option>20:00</option>
                      <option>21:00</option>
                      <option>22:00</option>
                      <option>23:00</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
                    <Users className="w-3 h-3" /> Guests
                  </label>
                  <select 
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option value="larger">Larger Party (9+)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
                    <MessageSquare className="w-3 h-3" /> Special Requests
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Allergies, special occasions, or seating preferences..."
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white text-sm focus:outline-none focus:border-white transition-colors resize-none placeholder:text-zinc-700"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-6 bg-white text-black font-semibold text-xs lg:text-sm uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                  <p className="text-center text-[10px] text-zinc-600 mt-4 uppercase tracking-widest">
                    Confirmation will be sent via SMS
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
            © 2024 Katina's Kafé. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
