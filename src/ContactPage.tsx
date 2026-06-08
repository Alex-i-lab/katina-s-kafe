import { motion } from 'motion/react';
import { Clock, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

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

import { MapView } from './MapComponent';
import { Helmet } from 'react-helmet-async';

export default function ContactPage() {
  return (
    <div className="bg-black text-zinc-100 font-sans min-h-screen pt-32 pb-32">
      <Helmet>
        <title>Contact Us | Katina's Kafé Kigali</title>
        <meta name="description" content="Get in touch with Katina's Kafé. Find our location in Kigali, opening hours, and contact information." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="text-center mb-32 px-4 md:px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-500 uppercase tracking-[0.5em] text-[11px] mb-8"
          >
            Connect with us
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-12"
          >
            Contact.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed opacity-80"
          >
            Whether you have a question about events, reservations, or just want to share a thought, we'd love to hear from you.
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
                <a href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                  <TripAdvisorIcon className="w-5 h-5" />
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
          <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-12 md:gap-16">
            <div className="col-span-4 md:col-span-8 xl:col-span-5">
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-[11px] mb-12">General Inquiry</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-10 tracking-tight leading-tight">Drop us a line</h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-12 text-base md:text-lg opacity-80">
                Please fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>
            
            <div className="col-span-4 md:col-span-8 xl:col-span-7">
               <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-transparent border-b border-zinc-800 pb-4 text-white focus:outline-none focus:border-white transition-colors font-light text-lg"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-transparent border-b border-zinc-800 pb-4 text-white focus:outline-none focus:border-white transition-colors font-light text-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
 
                  <div className="space-y-4">
                    <label className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-transparent border border-zinc-800 p-6 text-white focus:outline-none focus:border-white transition-colors resize-none font-light text-lg rounded-sm"
                      placeholder="How can we help you?"
                    />
                  </div>
 
                  <button 
                    type="submit"
                    className="group flex items-center justify-center w-full md:w-auto gap-6 px-12 py-6 bg-white text-black text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
                  >
                    Send Message
                  </button>
                </form>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="mt-32 pt-24 border-t border-zinc-900"
        >
          <div className="max-w-3xl mx-auto text-center mb-16 px-6">
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[11px] mb-8">Information</p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">Common Inquiries</h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                q: "Do you take reservations?",
                a: "Yes, you can book a table directly through our website using the 'Book a Table' button. For parties larger than 8, please call us directly."
              },
              {
                q: "Are you accessible?",
                a: "Absolutely. Our space is fully wheelchair accessible, and our team is trained in Rwandan Sign Language to ensure seamless communication for all guests."
              },
              {
                q: "Is there parking available?",
                a: "We have dedicated street parking right in front of the cafe on KG 8 Ave, and a secured parking lot just 50m away."
              },
              {
                q: "Do you host private events?",
                a: "Yes! From corporate mixers to private celebrations, we'd love to host you. Send us an inquiry via the contact form above."
              }
            ].map((faq, idx) => (
              <div key={idx} className="space-y-4 group">
                <h4 className="text-white text-sm font-light tracking-wide group-hover:text-zinc-300 transition-colors uppercase italic underline decoration-zinc-800 underline-offset-8 decoration-1 mb-6">{faq.q}</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

