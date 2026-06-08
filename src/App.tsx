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
import { Helmet } from 'react-helmet-async';
import { MapView } from './MapComponent';

const TripAdvisorIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
  </svg>
);

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    {subtitle && <p className="text-zinc-600 uppercase tracking-[0.4em] text-[11px] mb-4">{subtitle}</p>}
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">{children}</h2>
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
      <Helmet>
        <title>Katina's Kafé | Artisan Coffee & Exquisite Dining in Kigali</title>
        <meta name="description" content="Katina's Kafé is a cozy sanctuary in Kigali with a profound social mission. Renowned for its warm hospitality, exceptional coffee, and vibrant community spirit." />
        <meta name="keywords" content="Cafe Kigali, Best Coffee Kigali, Katina's Kafe, Kigali restaurants" />
        <meta property="og:title" content="Katina's Kafé | Artisan Coffee & Dining in Kigali" />
        <meta property="og:description" content="A space designed for connection and atmosphere in the heart of Kigali." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780938023/generate_an_upscaled_version_of_202606081900_ydjhx7.jpg" 
            alt="Atmospheric cafe interior" 
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-zinc-500 uppercase tracking-[0.4em] text-[11px] mb-8">Your Daily Ritual</p>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter mb-12 leading-[0.9]">
              Katina's <span className="italic text-zinc-300 font-extralight block md:inline opacity-90">Kafé</span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg font-light max-w-lg mx-auto mb-16 leading-relaxed opacity-80">
              From morning coffee to evening cocktails — a space designed for connection and atmosphere.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
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


      </section>      <section id="about" className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-8 md:gap-12 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-4 md:col-span-8 xl:col-span-6"
          >
            <SectionHeading subtitle="Our Story">A Space for Connection</SectionHeading>
            <div className="space-y-8 text-zinc-400 text-base md:text-lg font-light leading-relaxed">
              <p>
                <span className="text-white font-normal uppercase tracking-widest text-sm">Katina’s Kafé</span> is a cozy sanctuary in Kigali with a profound social mission. Renowned for its warm hospitality, exceptional coffee, and vibrant community spirit, we offer more than just the perfect cup.
              </p>
              <p>
                At the heart of our café is a commitment to empowerment and inclusion. We are proud to employ deaf baristas and celebrate the beauty of sign language as a bridge between people. Every interaction is an opportunity to foster understanding, connection, and awareness.
              </p>
              <p>
                We invite you into a welcoming space where every cup tells a story—one of impact, inclusivity, and genuine human connection.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-span-4 md:col-span-8 xl:col-span-6 xl:col-start-7 aspect-[4/5] relative overflow-hidden"
          >
            <video 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-all duration-1000"
            >
              <source src={encodeURI("https://res.cloudinary.com/dcy26s9jm/video/upload/v1780932260/We_re_putting_the_final_pieces_in_place..._and_trust_us_your_new_happy_place_just_dropped_Get_ready_for_coffee_community_and_calm_opening_soon._anpg15.mp4")} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      <section id="impact" className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-4 md:col-span-4 xl:col-span-6 relative group"
            >
              <div className="absolute -inset-4 border border-zinc-900 group-hover:border-zinc-800 transition-colors duration-500 -z-10" />
              <img 
                src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780932188/514832490_17851998696481998_155433204255130882_n_hqhc6k.jpg" 
                alt="Our baristas at work" 
                className="w-full transition-all duration-1000 shadow-2xl"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-sm border border-white/10 p-4 text-[10px] uppercase tracking-widest text-white">
                Inclusive Excellence
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-4 md:col-span-4 xl:col-span-6"
            >
              <SectionHeading subtitle="Beyond the Cup">Inclusive by Design</SectionHeading>
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:border-white group-hover:text-white transition-all duration-500">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-light mb-2">Silent Connection</h4>
                    <p className="text-zinc-500 font-light leading-relaxed">
                      Our signature "Sign of the Day" program invites guests to learn basic sign language while ordering, bridging worlds one cup at a time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:border-white group-hover:text-white transition-all duration-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-light mb-2">Empowering Talent</h4>
                    <p className="text-zinc-500 font-light leading-relaxed">
                      100% of our barista team consists of talented individuals from the deaf community, trained to the highest standards of specialty coffee.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:border-white group-hover:text-white transition-all duration-500">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-light mb-2">Kigali Community</h4>
                    <p className="text-zinc-500 font-light leading-relaxed">
                      We host monthly workshops celebrating sign language, artisan crafts, and the vibrant culture of our beautiful city.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section Highlights */}
      <section id="menu" className="py-24 md:py-40 bg-zinc-950 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-zinc-500 uppercase tracking-[0.4em] text-[11px] mb-4">Curated Taste</p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-tight">Mastering the Art of Selection.</h2>
            </div>
            <Link to="/menu" className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 hover:text-white pb-2 border-b border-zinc-800 hover:border-white transition-all whitespace-nowrap">
              Explore Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-8 xl:gap-10 mt-8">
            {[
              { 
                name: 'Coffee & Tea', 
                subtitle: 'AROMATIC BREWS', 
                img: 'https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780935827/505432442_17850655464481998_8272981609935434953_n_weefjp.jpg', 
                span: 'col-span-4 md:col-span-8 xl:col-span-8',
                height: 'h-[400px] md:h-[500px]',
                showLink: false
              },
              { 
                name: 'Brunch', 
                subtitle: 'MORNINGS', 
                img: 'https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780934385/615434857_17874212637481998_8651716643306661844_n_xgksqz.jpg', 
                span: 'col-span-2 md:col-span-4 xl:col-span-4',
                height: 'h-[300px] md:h-[500px]',
                showLink: false
              },
              { 
                name: 'Refreshers & Mocktails', 
                subtitle: 'CRISP & COOL', 
                img: 'https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780935720/537492939_17858326215481998_317203841199593069_n_ar1mth.jpg', 
                span: 'col-span-2 md:col-span-4 xl:col-span-4',
                height: 'h-[300px] md:h-[500px]',
                showLink: false
              },
              { 
                name: "Katina's Specials", 
                subtitle: 'SOCIAL PLATES', 
                img: 'https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780934215/712544012_17892551031481998_8633632045359856171_n_cw0lgv.jpg', 
                span: 'col-span-4 md:col-span-8 xl:col-span-8',
                height: 'h-[400px] md:h-[500px]',
                showLink: true
              },
            ].map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`${cat.span} ${cat.height}`}
              >
                <Link to="/menu" className="group block relative w-full h-full overflow-hidden bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />
                  
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end pointer-events-none">
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
        </div>
      </section>

      {/* Ambiance Gallery */}
      <section id="gallery" className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-8 w-full max-w-sm">
              <div className="h-px bg-zinc-800 flex-1"></div>
              <div className="w-1.5 h-1.5 rotate-45 border border-zinc-700 bg-zinc-900"></div>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>
            <SectionHeading subtitle="Ambiance">The Visuals</SectionHeading>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-8 xl:gap-8 auto-rows-[200px] md:auto-rows-[300px]">
            {/* Featured Tall Image */}
            <div className="col-span-4 md:col-span-4 xl:col-span-4 row-span-2 relative group overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-900 hover:border-zinc-800 transition-colors">
              <img src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780932191/631424221_17877106155481998_7785495124355595646_n_uhp6jn.jpg" alt="Katina's Kafé Visuals" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 flex items-end p-8 md:p-10">
                <p className="text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-light">Craftsmanship in Every Shot</p>
              </div>
            </div>
            
            {/* Wide Image */}
            <div className="col-span-4 md:col-span-4 xl:col-span-8 row-span-1 relative group overflow-hidden bg-zinc-900 border border-zinc-900 hover:border-zinc-800 transition-colors">
              <img src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780932189/631667835_17877106137481998_8193678897312387817_n_fetjbn.jpg" alt="Latte art pouring" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-light">The Ritual</span>
              </div>
            </div>
 
            {/* Two Square-ish Images */}
            <div className="col-span-2 md:col-span-2 xl:col-span-4 relative group overflow-hidden bg-zinc-900 border border-zinc-900 hover:border-zinc-800 transition-colors">
              <img src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780934388/659154369_17888598552481998_7208679190882747456_n_ddfdsm.jpg" alt="Coffee shop seating" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy" />
            </div>

            <div className="col-span-2 md:col-span-2 xl:col-span-4 relative group overflow-hidden bg-zinc-900 border border-zinc-900 hover:border-zinc-800 transition-colors flex flex-col items-center justify-center text-center p-4">
              <div className="scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center flex flex-col items-center">
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-[1.1] tracking-tight">
                  #MY<br />HAND<br />TALKS
                </h3>
                <p className="text-[10px] lg:text-xs leading-relaxed mb-4 max-w-[250px] lg:max-w-xs text-zinc-300">
                  Our Café was born out of the vision to provide great food and amazing service while promoting the training and employment of Deaf people in the hospitality industry.
                </p>
                <p className="text-[10px] lg:text-xs leading-relaxed mb-6 max-w-[250px] lg:max-w-xs text-zinc-300">
                  Murakaza Neza! Learn a few hand signs, Relax, have fun and Enjoy some delicious food.
                </p>
                <p className="text-base lg:text-lg tracking-widest font-light text-white">Katina's</p>
              </div>
            </div>
            
            {/* Atmospheric Anchor */}
            <div className="col-span-4 md:col-span-8 xl:col-span-12 h-40 md:h-56 xl:h-72 relative group overflow-hidden mt-2 md:mt-4">
               <img src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780936641/640265745_17852749230673076_884855513009866501_n_kd5irw.jpg" alt="Aroma of fresh coffee" className="w-full h-full object-cover opacity-30 contrast-150 transition-all duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <h3 className="text-4xl md:text-6xl lg:text-8xl font-light text-white/20 uppercase tracking-[0.5em] select-none italic transition-colors group-hover:text-white/30">Atmospheric</h3>
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
              “The best memories are made around the table.”
            </p>
            <div className="flex flex-col items-center">
              <span className="text-zinc-500 text-xs uppercase tracking-widest">— Katina's Kafé</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-24 md:py-40 px-6 md:px-12 lg:px-16 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-12 md:gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-4 md:col-span-8 xl:col-span-5"
            >
              <p className="text-zinc-500 uppercase tracking-widest text-[11px] mb-4">Feedback</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-tight leading-tight">Share Your Experience</h2>
              <p className="text-zinc-400 font-light leading-relaxed text-base md:text-lg mb-12">
                Your thoughts matter to us. Whether you had a wonderful dinner or have suggestions on how we can improve, we'd love to hear it.
              </p>
              <div className="flex items-center gap-4 text-zinc-600 text-xs uppercase tracking-widest">
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
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-zinc-900/40 border border-zinc-800/50 p-12 lg:p-20 text-center rounded-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <Send className="w-8 h-8 text-white/50" />
                  </div>
                  <h3 className="text-3xl font-light text-white mb-6">Deeply Appreciated.</h3>
                  <p className="text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
                    Your feedback is invaluable. We take every review into heart as we strive for perfection.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-12 text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white underline underline-offset-8 transition-colors"
                  >
                    Send another review
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-12" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-transparent border-b border-zinc-800/60 pb-4 text-white focus:outline-none focus:border-white/40 transition-colors font-light text-lg"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Email (Optional)</label>
                      <input 
                        type="email" 
                        className="w-full bg-transparent border-b border-zinc-800/60 pb-4 text-white focus:outline-none focus:border-white/40 transition-colors font-light text-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
 
                  <div className="space-y-6">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 block">Overall Rating</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                        >
                          <Star 
                            className={`w-8 h-8 transition-all duration-300 ${
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
                    <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Your Experience</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-transparent border border-zinc-800/60 p-6 text-white focus:outline-none focus:border-white/40 transition-colors resize-none font-light text-lg rounded-sm"
                      placeholder="Tell us about your visit..."
                    />
                  </div>
 
                  <div className="space-y-4">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Suggestions</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-transparent border border-zinc-800/60 p-6 text-white focus:outline-none focus:border-white/40 transition-colors resize-none font-light text-lg rounded-sm"
                      placeholder="How can we make your next visit even better?"
                    />
                  </div>
 
                  <button 
                    type="submit"
                    className="group flex items-center justify-center w-full md:w-auto gap-6 px-12 py-6 bg-white text-black text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
                  >
                    Submit Review
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-zinc-900 overflow-hidden">
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
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" /></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" /></a>
                    <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"><TripAdvisorIcon className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" /></a>
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 sm:px-12 flex items-center justify-between ${
          isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-zinc-900/50 py-3 shadow-2xl' : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5'
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://res.cloudinary.com/dul9fo9cv/image/upload/f_auto,q_auto/v1778161434/katina_kafe_oqrqmj.png" 
            alt="Katina's Kafé Logo" 
            className="w-10 h-10 object-contain" 
            referrerPolicy="no-referrer"
          />
          <span className="hidden lg:inline-block text-xl font-light tracking-[0.2em] uppercase">Katina's Kafé</span>
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
      <footer className="bg-zinc-950 border-t border-zinc-900/50 pt-24 pb-12 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-4 lg:col-span-5">
              <Link to="/" className="flex items-center gap-3 mb-8">
                <img 
                  src="https://res.cloudinary.com/dul9fo9cv/image/upload/f_auto,q_auto/v1778161434/katina_kafe_oqrqmj.png" 
                  alt="Katina's Kafé Logo" 
                  className="w-10 h-10 object-contain" 
                  referrerPolicy="no-referrer"
                />
                <span className="text-white font-light tracking-[0.3em] uppercase text-xs">Katina's Kafé</span>
              </Link>
              <p className="text-zinc-500 font-light text-base leading-relaxed max-w-sm mb-12">
                Empowering the community through the language of signs and the ritual of coffee. Kigali's finest social sanctuary.
              </p>
              <div className="flex gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-zinc-600 hover:text-white transition-colors cursor-pointer" /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5 text-zinc-600 hover:text-white transition-colors cursor-pointer" /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 text-zinc-600 hover:text-white transition-colors cursor-pointer" /></a>
                <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"><TripAdvisorIcon className="w-5 h-5 text-zinc-600 hover:text-white transition-colors cursor-pointer" /></a>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-2 lg:col-start-7">
               <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 mb-8 font-medium">Explore</p>
               <ul className="space-y-4">
                 <li><Link to="/menu" className="text-zinc-500 hover:text-white text-[13px] transition-colors font-light">The Menu</Link></li>
                 <li><Link to="/order" className="text-zinc-500 hover:text-white text-[13px] transition-colors font-light">Pre-Order</Link></li>
                 <li><Link to="/contact" className="text-zinc-500 hover:text-white text-[13px] transition-colors font-light">Location</Link></li>
                 <li><button onClick={() => setIsModalOpen(true)} className="text-zinc-500 hover:text-white text-[13px] transition-colors font-light text-left">Reserve</button></li>
               </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
               <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 mb-8 font-medium">Join the Community</p>
               <div className="relative max-w-xs">
                 <input 
                   type="email" 
                   placeholder="your@email.com" 
                   className="w-full bg-transparent border-b border-zinc-800 pb-3 text-sm focus:outline-none focus:border-white transition-colors text-white font-light"
                 />
                 <button className="absolute right-0 bottom-3 text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Join</button>
               </div>
               <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-4 leading-loose">
                 Receive exclusive event invites and updates from our Kigali clan.
               </p>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-zinc-700 uppercase tracking-[0.4em]">
            <p>
              © 2024 Katina's Kafé. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Legal Terms</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
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
