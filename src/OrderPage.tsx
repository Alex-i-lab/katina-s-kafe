import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Plus, Minus, X, ArrowRight, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FULL_MENU_ITEMS, MenuItem } from './data';
import { PreloadImage } from './components/PreloadMedia';

export default function OrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{item: MenuItem, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMenuLoading, setIsMenuLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', pickupTime: 'asap' });
  const [errors, setErrors] = useState<{name?: string, email?: string}>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (value.trim().length > 0 && value.trim().length < 2) error = 'Name must be at least 2 characters';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim().length > 0 && !emailRegex.test(value)) error = 'Please enter a valid email address';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'name' || name === 'email') {
      validateField(name, value);
    }
  };

  const isFormValid = formData.name.trim().length >= 2 && 
                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                     !errors.name && !errors.email;

  // Clear toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Simulate initial menu loading
  useEffect(() => {
    const timer = setTimeout(() => setIsMenuLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate processing payment/order
    await new Promise(resolve => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setCheckoutStep('success');
  };

  const displayedItems = searchQuery.trim().length > 0 
    ? FULL_MENU_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : FULL_MENU_ITEMS;

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.item.name === item.name);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.item.name === item.name 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setToastMessage(`Added ${item.name} to cart`);
  };

  const updateQuantity = (itemName: string, delta: number) => {
    setCart(prev => prev.map(cartItem => {
      if (cartItem.item.name === itemName) {
        const newQuantity = cartItem.quantity + delta;
        return { ...cartItem, quantity: Math.max(0, newQuantity) };
      }
      return cartItem;
    }).filter(cartItem => cartItem.quantity > 0));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  const parsePrice = (priceStr: string) => {
    // Extract the first number found in the price string.
    // E.g., "RWF 6" -> 6, "RWF 8 / 32" -> 8
    const match = priceStr.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  const totalAmount = cart.reduce((sum, cartItem) => sum + (parsePrice(cartItem.item.price) * cartItem.quantity), 0);
  const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  return (
    <div className="bg-black text-zinc-100 font-sans min-h-screen pt-32 pb-32">
      <Helmet>
        <title>Order Online | Katina's Kafé</title>
        <meta name="description" content="Order online from Katina's Kafé. Pick up fresh coffee, brunch, and artisan food from our location in Kigali." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 px-4 md:px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-500 uppercase tracking-[0.4em] text-[11px] mb-6"
          >
            Digital Concierge
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white mb-8"
          >
            Order Online.
          </motion.h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-20 relative">
          <input
            type="text"
            className="w-full bg-zinc-900/50 border-b border-zinc-800 p-6 text-white text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-all placeholder:text-zinc-700"
            placeholder="Search our selection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.trim() === '' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-6 flex flex-wrap gap-2 justify-center"
            >
              {['Iced Latte', 'Avocado Toast', 'Croissant', 'Espresso', 'Matcha'].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 border border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-widest hover:text-white hover:border-zinc-500 transition-colors rounded-full bg-black"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-6 xl:gap-8 relative">
          <div className="col-span-4 md:col-span-8 xl:col-span-8">
            {isMenuLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[1, 2, 3, 4].map((n) => (
                   <div key={n} className="bg-zinc-950 border border-zinc-900/50 rounded-sm h-[400px] animate-pulse">
                     <div className="w-full h-56 bg-zinc-900" />
                     <div className="p-8 space-y-4">
                       <div className="h-6 bg-zinc-900 w-3/4" />
                       <div className="h-4 bg-zinc-900 w-full" />
                       <div className="h-4 bg-zinc-900 w-1/2" />
                       <div className="h-12 bg-zinc-900 w-full mt-auto" />
                     </div>
                   </div>
                 ))}
               </div>
            ) : displayedItems.length === 0 ? (
               <div className="text-center py-24 border border-zinc-800 bg-zinc-900/40">
                 <p className="text-zinc-500 font-light">No items found matching "{searchQuery}"</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {displayedItems.map((item, idx) => (
                    <React.Fragment key={item.name}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          className="bg-zinc-950 border border-zinc-900/50 flex flex-col group hover:border-zinc-700 transition-all duration-500 rounded-sm overflow-hidden"
                        >
                        {item.image && (
                         <div className="w-full h-56 overflow-hidden">
                           <PreloadImage 
                             src={item.image} 
                             alt={item.name} 
                             className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
                             referrerPolicy="no-referrer"
                             loading="lazy"
                           />
                         </div>
                      )}
                      <div className="p-8 flex flex-col flex-1">
                        <div className="mb-8">
                          <div className="flex justify-between items-baseline mb-3 gap-4">
                            <h3 className="text-xl font-light text-zinc-100 group-hover:text-white transition-colors tracking-tight">{item.name}</h3>
                            <span className="text-zinc-400 font-mono text-[13px] shrink-0 italic">RWF {parsePrice(item.price).toFixed(2)}</span>
                          </div>
                          {item.description && (
                            <p className="text-[15px] font-light text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{item.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full py-4 bg-zinc-900 text-zinc-400 text-[11px] uppercase tracking-[0.2em] font-medium border border-zinc-800 hover:bg-white hover:text-black hover:border-white transition-all mt-auto"
                        >
                          Add to order
                        </button>
                      </div>
                    </motion.div>
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Cart Sidebar (Desktop) / Floating (Mobile implementation can be adapted) */}
          <div className="col-span-4 md:col-span-8 xl:col-span-4 lg:sticky lg:top-32 self-start hidden lg:block">
             <div className="bg-zinc-900 border border-zinc-800 p-8">
                <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
                  <ShoppingBag className="w-5 h-5 text-zinc-400" />
                  <h2 className="text-lg font-light text-white uppercase tracking-widest">Your Order</h2>
                  <span className="ml-auto bg-zinc-800 text-white text-[10px] w-6 h-6 flex justify-center items-center rounded-full">
                    {totalItems}
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 font-light">
                    Your cart is empty.<br/> Add some delicious items!
                  </div>
                ) : (
                  <div className="space-y-8">
                    {checkoutStep === 'cart' && (
                      <>
                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                          <AnimatePresence initial={false} mode="popLayout">
                            {cart.map((cartItem) => (
                              <motion.div 
                                key={cartItem.item.name}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-between items-start group bg-zinc-900/50 p-4 border border-zinc-800/50 hover:border-zinc-700 transition-colors rounded-sm"
                              >
                                <div className="flex-1">
                                  <h4 className="text-sm font-light text-zinc-100 mb-1">{cartItem.item.name}</h4>
                                  <span className="text-[11px] text-zinc-500 font-mono italic">RWF {(parsePrice(cartItem.item.price) * cartItem.quantity).toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <div className="flex items-center gap-2 border border-zinc-800 rounded-full px-2 py-1 bg-black/40">
                                    <button onClick={() => updateQuantity(cartItem.item.name, -1)} className="w-5 h-5 flex justify-center items-center hover:bg-zinc-800 rounded-full transition-colors">
                                      <Minus className="w-2.5 h-2.5 text-zinc-500" />
                                    </button>
                                    <span className="text-[11px] w-4 text-center font-medium font-mono">{cartItem.quantity}</span>
                                    <button onClick={() => updateQuantity(cartItem.item.name, 1)} className="w-5 h-5 flex justify-center items-center hover:bg-zinc-800 rounded-full transition-colors">
                                      <Plus className="w-2.5 h-2.5 text-zinc-500" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        <div className="mt-8 pt-8 border-t border-zinc-800 space-y-4 bg-zinc-950/50 -mx-8 -mb-8 p-8 border-t border-zinc-800 shadow-[0_-12px_24px_-12px_rgba(0,0,0,0.5)]">
                          <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-widest font-medium">
                            <span>Subtotal</span>
                            <span>RWF {totalAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-widest font-medium">
                            <span>Service Fee</span>
                            <span>RWF 0.00</span>
                          </div>
                          <div className="flex justify-between text-white text-xl font-light pt-2">
                            <span className="tracking-tighter">Total Amount</span>
                            <span className="font-mono">RWF {totalAmount.toFixed(2)}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => setCheckoutStep('details')}
                          className="w-full py-4 mt-6 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                          Checkout <ArrowRight className="w-4 h-4"/>
                        </button>
                        
                        <button 
                          onClick={clearCart}
                          className="w-full py-3 mt-4 border border-zinc-800 text-zinc-500 text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors"
                        >
                          Clear Cart
                        </button>
                      </>
                    )}

                    {checkoutStep === 'details' && (
                      <form onSubmit={handleCheckout} className="space-y-6">
                         <div className="space-y-6">
                            <div>
                               <div className="flex justify-between items-baseline mb-2">
                                 <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">Name</label>
                                 {errors.name && <span className="text-[9px] text-red-500 uppercase tracking-wider">{errors.name}</span>}
                               </div>
                               <input 
                                 required 
                                 type="text" 
                                 name="name"
                                 value={formData.name}
                                 onChange={handleInputChange}
                                 placeholder="Katina User"
                                 className={`w-full bg-transparent border-b py-2 text-white focus:outline-none transition-colors font-light placeholder:text-zinc-800 ${errors.name ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-700 focus:border-white'}`}
                               />
                            </div>
                            <div>
                               <div className="flex justify-between items-baseline mb-2">
                                 <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">Email</label>
                                 {errors.email && <span className="text-[9px] text-red-500 uppercase tracking-wider">{errors.email}</span>}
                               </div>
                               <input 
                                 required 
                                 type="email" 
                                 name="email"
                                 value={formData.email}
                                 onChange={handleInputChange}
                                 placeholder="user@example.com"
                                 className={`w-full bg-transparent border-b py-2 text-white focus:outline-none transition-colors font-light placeholder:text-zinc-800 ${errors.email ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-700 focus:border-white'}`}
                               />
                            </div>
                            <div>
                               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Pickup Time</label>
                               <select 
                                 required 
                                 name="pickupTime"
                                 value={formData.pickupTime}
                                 onChange={handleInputChange}
                                 className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white font-light [&>option]:bg-zinc-900"
                               >
                                 <option value="asap">ASAP (15-20 mins)</option>
                                 <option value="30m">In 30 Minutes</option>
                                 <option value="1h">In 1 Hour</option>
                               </select>
                            </div>
                         </div>
                         
                         <div className="pt-6 flex gap-4">
                            <button 
                              type="button" 
                              disabled={isSubmitting}
                              onClick={() => setCheckoutStep('cart')} 
                              className="flex-1 py-4 border border-zinc-700 text-zinc-400 text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors disabled:opacity-50"
                            >
                               Back
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSubmitting || !isFormValid}
                              className="flex-1 text-center py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-800"
                            >
                               {isSubmitting ? (
                                 <>
                                   <Loader2 className="w-4 h-4 animate-spin" />
                                   Processing
                                 </>
                               ) : 'Pay Now'}
                            </button>
                         </div>
                      </form>
                    )}

                    {checkoutStep === 'success' && (
                      <div className="text-center py-8">
                         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                         <h3 className="text-2xl font-light text-white mb-2">Order Confirmed!</h3>
                         <p className="text-zinc-400 font-light mb-8">We're preparing your order. We'll email you a receipt soon.</p>
                         <button onClick={() => { setCart([]); setCheckoutStep('cart'); }} className="w-full py-4 border border-zinc-700 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                            Start New Order
                         </button>
                      </div>
                    )}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Floating Cart Summary */}
      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 z-40 lg:hidden bg-gradient-to-t from-black via-black/90 to-transparent pt-12 text-center"
          >
            <button 
               onClick={() => {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
                 const sidebar = document.querySelector('.lg\\:hidden.fixed.z-50');
                 if(sidebar) {
                   // A full mobile cart implementation would go here, mapped below
                   setIsCartOpen(true);
                 }
               }}
               className="w-full max-w-sm mx-auto bg-white text-black font-semibold text-xs uppercase tracking-widest py-4 px-6 shadow-2xl flex justify-between items-center rounded-sm border border-white/20"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>{totalItems} items</span>
              </div>
              <span>RWF {totalAmount.toFixed(2)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mobile Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col lg:hidden"
          >
             <div className="flex justify-between items-center p-6 border-b border-zinc-900 bg-zinc-950 sticky top-0 z-10">
                <h2 className="text-lg font-light text-white uppercase tracking-widest flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-zinc-400" />
                  Your Order
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 border border-zinc-800 rounded-full hover:bg-zinc-800">
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
               {cart.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 font-light">
                    Your cart is empty.<br/> Add some delicious items!
                  </div>
                ) : (
                  <div className="space-y-8">
                    {checkoutStep === 'cart' && (
                      <>
                         <div className="space-y-4 mb-12">
                           <AnimatePresence initial={false} mode="popLayout">
                             {cart.map((cartItem) => (
                               <motion.div 
                                 key={cartItem.item.name}
                                 layout
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 className="flex flex-col gap-3 group border border-zinc-900 bg-zinc-900/40 p-4 rounded-sm"
                               >
                                 <div className="flex justify-between items-start">
                                   <div className="flex-1 pr-4">
                                     <h4 className="text-sm font-light text-white mb-1">{cartItem.item.name}</h4>
                                     <span className="text-[11px] text-zinc-500 font-mono italic">RWF {(parsePrice(cartItem.item.price) * cartItem.quantity).toFixed(2)}</span>
                                   </div>
                                   <button 
                                     onClick={() => updateQuantity(cartItem.item.name, -cartItem.quantity)}
                                     className="text-zinc-700 hover:text-zinc-500 transition-colors"
                                   >
                                     <X className="w-3.5 h-3.5" />
                                   </button>
                                 </div>
                                 <div className="flex items-center gap-4">
                                   <div className="flex items-center bg-black rounded-full border border-zinc-800">
                                     <button onClick={() => updateQuantity(cartItem.item.name, -1)} className="w-10 h-10 flex justify-center items-center border-r border-zinc-800 hover:bg-zinc-900 transition-colors">
                                       <Minus className="w-3 h-3 text-zinc-400" />
                                     </button>
                                     <span className="text-xs font-mono w-10 text-center text-white">{cartItem.quantity}</span>
                                     <button onClick={() => updateQuantity(cartItem.item.name, 1)} className="w-10 h-10 flex justify-center items-center border-l border-zinc-800 hover:bg-zinc-900 transition-colors">
                                       <Plus className="w-3 h-3 text-zinc-400" />
                                     </button>
                                   </div>
                                 </div>
                               </motion.div>
                             ))}
                           </AnimatePresence>
                         </div>

                         <div className="mt-auto border-t border-zinc-800 pt-8 pb-8 space-y-4">
                           <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
                             <span>Subtotal</span>
                             <span className="font-mono">RWF {totalAmount.toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
                             <span>Est. Processing</span>
                             <span className="font-mono">RWF 0.00</span>
                           </div>
                           <div className="flex justify-between text-white text-2xl font-light pt-2">
                             <span className="tracking-tight">Grand Total</span>
                             <span className="font-mono text-xl">RWF {totalAmount.toFixed(2)}</span>
                           </div>
                         </div>

                        <button 
                          onClick={() => setCheckoutStep('details')}
                          className="w-full py-4 mt-6 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                          Checkout <ArrowRight className="w-4 h-4"/>
                        </button>
                        
                        <button 
                          onClick={() => { clearCart(); setIsCartOpen(false); }}
                          className="w-full py-3 mt-4 border border-zinc-800 text-zinc-500 text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors"
                        >
                          Clear Cart
                        </button>
                      </>
                    )}

                    {checkoutStep === 'details' && (
                      <form onSubmit={handleCheckout} className="space-y-6">
                         <div className="space-y-6">
                            <div>
                               <div className="flex justify-between items-baseline mb-2">
                                 <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">Name</label>
                                 {errors.name && <span className="text-[9px] text-red-500 uppercase tracking-wider">{errors.name}</span>}
                               </div>
                               <input 
                                 required 
                                 type="text" 
                                 name="name"
                                 value={formData.name}
                                 onChange={handleInputChange}
                                 className={`w-full bg-transparent border-b py-3 text-white focus:outline-none transition-colors font-light ${errors.name ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-700 focus:border-white'}`}
                               />
                            </div>
                            <div>
                               <div className="flex justify-between items-baseline mb-2">
                                 <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">Email</label>
                                 {errors.email && <span className="text-[9px] text-red-500 uppercase tracking-wider">{errors.email}</span>}
                               </div>
                               <input 
                                 required 
                                 type="email" 
                                 name="email"
                                 value={formData.email}
                                 onChange={handleInputChange}
                                 className={`w-full bg-transparent border-b py-3 text-white focus:outline-none transition-colors font-light ${errors.email ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-700 focus:border-white'}`}
                               />
                            </div>
                            <div>
                               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Pickup Time</label>
                               <select 
                                 required 
                                 name="pickupTime"
                                 value={formData.pickupTime}
                                 onChange={handleInputChange}
                                 className="w-full bg-transparent border-b border-zinc-700 py-3 text-white focus:outline-none focus:border-white font-light [&>option]:bg-zinc-900"
                               >
                                 <option value="asap">ASAP (15-20 mins)</option>
                                 <option value="30m">In 30 Minutes</option>
                                 <option value="1h">In 1 Hour</option>
                               </select>
                            </div>
                         </div>
                         
                         <div className="pt-6 flex gap-4">
                            <button 
                              type="button" 
                              disabled={isSubmitting}
                              onClick={() => setCheckoutStep('cart')} 
                              className="flex-1 py-4 border border-zinc-700 text-zinc-400 text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors disabled:opacity-50"
                            >
                               Back
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSubmitting || !isFormValid}
                              className="flex-1 text-center py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-800"
                            >
                               {isSubmitting ? (
                                 <>
                                   <Loader2 className="w-4 h-4 animate-spin" />
                                   Processing
                                 </>
                               ) : 'Pay Now'}
                            </button>
                         </div>
                      </form>
                    )}

                    {checkoutStep === 'success' && (
                      <div className="text-center py-8">
                         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                         <h3 className="text-2xl font-light text-white mb-2">Order Confirmed!</h3>
                         <p className="text-zinc-400 font-light mb-8">We're preparing your order. We'll email you a receipt soon.</p>
                         <button onClick={() => { setCart([]); setCheckoutStep('cart'); setIsCartOpen(false); }} className="w-full py-4 border border-zinc-700 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                            Done
                         </button>
                      </div>
                    )}
                  </div>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-6 py-3 shadow-2xl flex items-center gap-3 rounded-full font-medium text-sm"
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

