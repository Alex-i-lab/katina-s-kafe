import { motion } from 'motion/react';
import { Clock, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

import { MapView } from './MapComponent';

export default function ContactPage() {
  return (
    <div className="bg-black text-zinc-100 font-sans min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-8 h-px bg-zinc-800"></div>
            <div className="w-1.5 h-1.5 rotate-45 border border-zinc-600 bg-zinc-900"></div>
            <div className="w-8 h-px bg-zinc-800"></div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a question about reservations, private events, or just want to say hello, we'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-8 mb-32">
          
          {/* Map View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-4 md:col-span-8 xl:col-span-7 h-[400px] lg:h-auto min-h-[500px] rounded-lg overflow-hidden border border-zinc-800 lg:order-2 order-2"
          >
            <MapView />
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-4 md:col-span-8 xl:col-span-5 lg:order-1 order-1 space-y-16"
          >
            <div>
              <h2 className="text-2xl font-light text-white mb-8">Details</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">Location</p>
                    <p className="text-lg font-light text-white">Katina's Kafé<br />31 KG 8 Ave, Kigali</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=Katina's+Kafé+31+KG+8+Ave+Kigali" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] text-zinc-500 uppercase tracking-widest underline underline-offset-4 hover:text-white transition-colors mt-4">
                      Get Directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-zinc-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">Contact</p>
                    <p className="text-lg font-light text-white mb-1">0795465276</p>
                    <p className="text-lg font-light text-zinc-400">hello@katina.cafe</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-zinc-500 shrink-0 mt-1" />
                  <div className="w-full">
                    <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">Hours</p>
                    <div className="space-y-4 max-w-xs">
                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-400 text-sm font-light">Sun — Tue</span>
                        <span className="text-white text-sm font-light">07:00 — 22:00</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-400 text-sm font-light">Wed — Thu</span>
                        <span className="text-white text-sm font-light">07:00 — 00:00</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-400 text-sm font-light">Fri — Sat</span>
                        <span className="text-white text-sm font-light">07:00 — 02:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-light text-white mb-6">Socials</h2>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           className="border-t border-zinc-900 pt-24"
        >
          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-8">
            <div className="col-span-4 md:col-span-8 xl:col-span-5">
              <h2 className="text-4xl font-light text-white mb-6 tracking-tight">Drop us a line</h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Please fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>
            
            <div className="col-span-4 md:col-span-8 xl:col-span-7">
               <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500">Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors font-light"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500">Message</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors resize-none font-light"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-white hover:text-zinc-400 transition-colors"
                  >
                    Send Message
                    <div className="w-12 h-px bg-zinc-800 group-hover:bg-white transition-colors"></div>
                  </button>
                </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

