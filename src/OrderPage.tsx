import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Plus, Minus, X, ArrowRight, CheckCircle, Loader2, Search, Coffee } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FULL_MENU_ITEMS, MenuItem } from './data';

export default function OrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{item: MenuItem, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', pickupTime: 'asap' });
  const [errors, setErrors] = useState<{name?: string, email?: string}>({});

  const suggestedTags = [
    "Hot/Iced Latte",
    "Hot/Iced Cappuccino",
    "Chemex/V60",
    "Vintage Vanilla Latte",
    "Tropical Bliss",
    "African Tea",
    "Avocado & Egg Tartine",
    "Almond Croissant"
  ];

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

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setCheckoutStep('success');
  };

  const parsePrice = (priceStr: string) => {
    const match = priceStr.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Filter items matching the search query; return empty array if search is empty
  const filteredItems = searchQuery.trim() === ''
    ? []
    : FULL_MENU_ITEMS.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
      });

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
    setToastMessage(`Added ${item.name} to order`);
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
    if (window.confirm('Are you sure you want to clear your current selection?')) {
      setCart([]);
    }
  };

  const getItemQuantityInCart = (itemName: string) => {
    const cartItem = cart.find(c => c.item.name === itemName);
    return cartItem ? cartItem.quantity : 0;
  };

  const totalAmount = cart.reduce((sum, cartItem) => sum + (parsePrice(cartItem.item.price) * cartItem.quantity), 0);
  const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  return (
    <div className="bg-black text-zinc-100 font-sans min-h-screen pt-32 pb-40">
      <Helmet>
        <title>Order Online | Katina's Kafé Selection</title>
        <meta name="description" content="Place your coffee, breakfast and brunch orders easily for quick pickup at Katina's Kafé in Kigali." />
      </Helmet>

      {/* Hero Header Block with prominent Search and Suggestions */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 text-center">
        <div className="border-b border-zinc-900 pb-16 flex flex-col items-center">
          <div className="max-w-2xl mb-12 text-center">
            <span className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] block mb-4 font-semibold">Specialty Pickup Concierge</span>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-4">Order Ahead.</h1>
            <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed mx-auto max-w-lg">
              Find your favorite drink or dining selection from our Kigali bar and place pre-orders instantly.
            </p>
          </div>

          {/* Clean, Centerpiece Search Input */}
          <div className="relative w-full max-w-xl mb-8 mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-650 animate-pulse" />
            </div>
            <input
              type="text"
              id="menu-search-input"
              className="w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-550 pl-14 pr-12 py-5 text-sm uppercase tracking-widest text-white placeholder-zinc-700 transition-all focus:outline-none focus:ring-1 focus:ring-zinc-800 rounded-sm"
              placeholder="Type to search coffee, matcha, brunch, wraps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button 
                id="clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Integrated Dynamic Suggestions bar */}
          <div className="space-y-4 w-full flex flex-col items-center">
            <span className="text-zinc-600 uppercase tracking-widest text-[9px] font-semibold block text-center">Suggested Favorites</span>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  id={`suggested-tag-${tag.replace(/[\s\/]+/g, '-').toLowerCase()}`}
                  onClick={() => setSearchQuery(tag)}
                  className={`px-4 py-2 border text-[10px] md:text-xs uppercase tracking-wider font-medium transition-all duration-300 rounded-sm ${
                    searchQuery === tag
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-800 hover:bg-zinc-900/40'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          
          {/* Left Side: Dynamic Match Catalog List only */}
          <div className="lg:col-span-8">
            {searchQuery.trim() === '' ? (
              // Informative instructions step on initial clear state (no long catalog, just guidance)
              <div className="border border-zinc-900 bg-zinc-950/40 p-12 text-center rounded-sm max-w-2xl mx-auto">
                <div className="w-12 h-12 border border-zinc-850 flex items-center justify-center text-zinc-500 mx-auto mb-6 rounded-full">
                  <Coffee className="w-5 h-5 text-zinc-500 stroke-[1.5]" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-white mb-2">Ready to Pre-order</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8 max-w-md mx-auto">
                  Type any coffee, special tea, or kitchen bites in the search bar above, or choose an item from our Suggested Favorites block.
                </p>
                <div className="grid grid-cols-3 gap-4 border-t border-zinc-900/40 pt-8 text-left">
                  <div>
                    <span className="font-mono text-zinc-600 text-xs font-bold block mb-1">01. SEARCH</span>
                    <p className="text-[10px] text-zinc-600 font-light leading-relaxed">Find your handcrafted brew or dish quickly.</p>
                  </div>
                  <div>
                    <span className="font-mono text-zinc-600 text-xs font-bold block mb-1">02. ADD</span>
                    <p className="text-[10px] text-zinc-600 font-light leading-relaxed">Build your custom pickup tray easily.</p>
                  </div>
                  <div>
                    <span className="font-mono text-zinc-600 text-xs font-bold block mb-1">03. PICK UP</span>
                    <p className="text-[10px] text-zinc-600 font-light leading-relaxed">Collect hot and ready at our Kigali café space.</p>
                  </div>
                </div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20 border border-zinc-900 bg-zinc-950/40 rounded-sm max-w-xl mx-auto">
                <p className="text-zinc-500 font-light text-sm mb-4">No matching items found for "{searchQuery}".</p>
                <button 
                  id="reset-search-prompt"
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2 border border-zinc-850 hover:border-zinc-550 text-[10px] uppercase tracking-widest text-zinc-400 font-semibold transition-colors rounded-sm"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-24">
                {/* Search Match Subtitle */}
                <div className="border-b border-zinc-900 pb-6 mb-12 text-center">
                  <span className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] block mb-2 font-semibold">Results Matching "{searchQuery}"</span>
                  <h2 className="text-base text-zinc-400 font-light tracking-wide uppercase font-mono">
                    Found {filteredItems.length} menu matches
                  </h2>
                </div>

                {/* Group Matches by Category exactly matching MenuPage style */}
                {Array.from(new Set(filteredItems.map(item => item.category))).map((category) => {
                  const itemsInCategory = filteredItems.filter(item => item.category === category);
                  return (
                    <section key={category} className="relative">
                      {/* Section Heading matching MenuPage layout */}
                      <div className="text-center mb-16 border-b border-zinc-900 pb-6 md:border-none">
                        <p className="text-zinc-500 uppercase tracking-[0.4em] text-[11px] mb-6">Selection</p>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-white leading-tight uppercase tracking-wide">
                          {category}
                        </h2>
                      </div>

                      {/* Cohesive Double Column Editorial List with Dot Leaders */}
                      <div className="relative grid md:grid-cols-2 gap-y-12 gap-x-16">
                        {/* Dot Split Line */}
                        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-zinc-900 to-transparent transform -translate-x-1/2" />
                        
                        {itemsInCategory.map((item, idx) => {
                          const quantity = getItemQuantityInCart(item.name);
                          return (
                            <motion.div 
                              key={item.name}
                              id={`item-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: (idx % 4) * 0.05 }}
                              className="group flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex justify-between items-end mb-2 w-full gap-2 md:gap-4">
                                  <h3 className="text-base font-light tracking-wide text-zinc-200 group-hover:text-white transition-colors">
                                    {item.name}
                                  </h3>
                                  <div className="flex-grow border-b border-zinc-700 border-dotted mb-1.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                  <div className="flex items-center gap-3.5 shrink-0 pl-1">
                                    <span className="text-zinc-400 font-mono text-sm shrink-0 whitespace-nowrap">
                                      {item.price}
                                    </span>

                                    {/* Inline Add Button or Stepper Controls */}
                                    {quantity > 0 ? (
                                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-full px-1.5 py-0.5 shadow-sm">
                                        <button 
                                          id={`decrease-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                                          onClick={() => updateQuantity(item.name, -1)} 
                                          className="w-4 h-4 flex justify-center items-center text-zinc-500 hover:text-white rounded-full transition-colors"
                                        >
                                          <Minus className="w-2.5 h-2.5" />
                                        </button>
                                        <span className="text-[11px] w-4 text-center font-bold font-mono text-white select-none">{quantity}</span>
                                        <button 
                                          id={`increase-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                                          onClick={() => updateQuantity(item.name, 1)} 
                                          className="w-4 h-4 flex justify-center items-center text-zinc-500 hover:text-white rounded-full transition-colors"
                                        >
                                          <Plus className="w-2.5 h-2.5" />
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        id={`add-btn-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                                        onClick={() => addToCart(item)}
                                        className="px-3.5 py-1 text-[9px] uppercase tracking-widest font-semibold text-zinc-400 border border-zinc-800 hover:border-white hover:text-white bg-zinc-950 hover:bg-white hover:text-black transition-all rounded-sm shadow-sm"
                                      >
                                        + Add
                                      </button>
                                    )}
                                  </div>
                                </div>
                                {item.description && (
                                  <p className="text-zinc-500 text-xs font-light leading-relaxed pr-3">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Right Side Live Checkout Receipt */}
          <div className="lg:col-span-4 sticky top-32 lg:self-start hidden lg:block">
            <div className="bg-zinc-950 border border-zinc-900 p-6 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 opacity-60" />
              
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-zinc-400" />
                  <h2 className="text-xs font-semibold text-white uppercase tracking-[0.2em] font-sans">Current Order</h2>
                </div>
                <span className="bg-zinc-900 border border-zinc-800 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full select-none">
                  {totalItems} items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-zinc-600 font-light flex flex-col items-center gap-4">
                  <Coffee className="w-8 h-8 text-zinc-850 stroke-[1.2]" />
                  <p className="text-[10px] uppercase tracking-widest leading-relaxed font-sans">
                    Your tray is empty.<br />Select items to pre-order.
                  </p>
                </div>
              ) : (
                <div>
                  {checkoutStep === 'cart' && (
                    <>
                      {/* Cart Items */}
                      <div className="space-y-3.5 max-h-[38vh] overflow-y-auto pr-1">
                        <AnimatePresence initial={false} mode="popLayout">
                          {cart.map((cartItem) => (
                            <motion.div 
                              key={cartItem.item.name}
                              id={`cart-item-${cartItem.item.name.replace(/\s+/g, '-').toLowerCase()}`}
                              layout
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="flex justify-between items-center bg-zinc-900/20 border border-zinc-900/80 p-3 rounded-sm"
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <h4 className="text-xs font-medium text-zinc-200 truncate">{cartItem.item.name}</h4>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                  RWF {(parsePrice(cartItem.item.price) * cartItem.quantity)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 border border-zinc-800 rounded-full px-1.5 py-0.5 bg-black/50 shrink-0">
                                <button 
                                  onClick={() => updateQuantity(cartItem.item.name, -1)} 
                                  className="w-4 h-4 flex justify-center items-center hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="text-[10px] w-4 text-center font-mono font-bold text-zinc-300 select-none">
                                  {cartItem.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(cartItem.item.name, 1)} 
                                  className="w-4 h-4 flex justify-center items-center hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Pricing block */}
                      <div className="mt-6 pt-5 border-t border-zinc-900 space-y-3">
                        <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
                          <span>Subtotal</span>
                          <span className="font-mono text-zinc-300">RWF {totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
                          <span>Concierge Pickup</span>
                          <span className="font-mono text-green-500 uppercase tracking-widest text-[9px]">Complementary</span>
                        </div>
                        <div className="flex justify-between text-white pt-2 border-t border-zinc-900">
                          <span className="tracking-tight text-xs uppercase tracking-widest text-zinc-400 font-semibold font-sans">Grand Total</span>
                          <span className="font-mono font-semibold text-white">RWF {totalAmount}</span>
                        </div>
                      </div>

                      <button 
                        id="proceed-checkout-desktop-btn"
                        onClick={() => setCheckoutStep('details')}
                        className="w-full py-4 mt-6 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                      >
                        Proceed to Checkout <ArrowRight className="w-4 h-4"/>
                      </button>
                      
                      <button 
                        id="clear-order-desktop-btn"
                        onClick={clearCart}
                        className="w-full py-2.5 mt-3 border border-zinc-900 text-zinc-600 text-[10px] uppercase tracking-widest hover:text-red-400 hover:border-zinc-800 transition-colors"
                      >
                        Clear Selection list
                      </button>
                    </>
                  )}

                  {checkoutStep === 'details' && (
                    <form onSubmit={handleCheckout} className="space-y-5">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-baseline mb-1">
                            <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block font-sans">Full Name</label>
                            {errors.name && <span className="text-[8px] text-red-500 uppercase tracking-wider">{errors.name}</span>}
                          </div>
                          <input 
                            required 
                            id="desktop-checkout-name"
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className={`w-full bg-zinc-950 border-b py-2 text-xs text-white focus:outline-none transition-colors ${
                              errors.name ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-800 focus:border-white'
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-baseline mb-1">
                            <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block font-sans">Email Address</label>
                            {errors.email && <span className="text-[8px] text-red-500 uppercase tracking-wider">{errors.email}</span>}
                          </div>
                          <input 
                            required 
                            id="desktop-checkout-email"
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@domain.com"
                            className={`w-full bg-zinc-950 border-b py-2 text-xs text-white focus:outline-none transition-colors ${
                              errors.email ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-800 focus:border-white'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block mb-1.5 font-sans">Pickup Time Window</label>
                          <select 
                            required 
                            id="desktop-checkout-pickuptime"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-950 border border-zinc-850 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-zinc-650 [&>option]:bg-zinc-950"
                          >
                            <option value="asap">ASAP (15-20 mins)</option>
                            <option value="30m">In 30 Minutes</option>
                            <option value="1h">In 1 Hour</option>
                            <option value="later">Sometime Today</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button 
                          type="button" 
                          id="desktop-checkout-back-btn"
                          disabled={isSubmitting}
                          onClick={() => setCheckoutStep('cart')} 
                          className="flex-1 py-3.5 border border-zinc-850 text-zinc-500 text-[10px] uppercase tracking-wider hover:text-white hover:border-zinc-700 transition-colors disabled:opacity-50"
                        >
                          Tray
                        </button>
                        <button 
                          type="submit" 
                          id="desktop-checkout-submit-btn"
                          disabled={isSubmitting || !isFormValid}
                          className="flex-1 text-center py-3.5 bg-white text-black text-[10px] uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 disabled:bg-zinc-900 disabled:text-zinc-650 disabled:border-zinc-900"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Placing...
                            </>
                          ) : 'Send Order'}
                        </button>
                      </div>
                    </form>
                  )}

                  {checkoutStep === 'success' && (
                    <div className="text-center py-6">
                      <CheckCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4 animate-bounce" />
                      <h3 className="text-base font-light text-white mb-2">Order Dispatched</h3>
                      <p className="text-zinc-500 text-xs font-light mb-6 leading-relaxed">
                        Your order is being handcrafted at our Kigali bar. A confirmation card was sent to {formData.email}.
                      </p>
                      <button 
                        id="start-fresh-order-desktop-btn"
                        onClick={() => { setCart([]); setCheckoutStep('cart'); }} 
                        className="w-full py-3 bg-zinc-900 text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors"
                      >
                        Order Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Floating Summary Strip */}
      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 z-40 lg:hidden bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-6 text-center"
          >
            <button 
              id="mobile-cart-floating-summary-btn"
              onClick={() => setIsCartOpen(true)}
              className="w-full max-w-md mx-auto bg-white text-black font-semibold text-xs uppercase tracking-widest py-4 px-6 flex justify-between items-center rounded-sm border border-white/20 active:bg-zinc-200 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>{totalItems} Items Selected</span>
              </div>
              <span className="font-mono">RWF {totalAmount}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Cart Modal Drawer Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-zinc-900 bg-zinc-950 sticky top-0 z-10">
              <h2 className="text-sm font-semibold text-white uppercase tracking-widest flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-zinc-400" />
                Order Selection
              </h2>
              <button 
                id="close-mobile-cart-btn"
                onClick={() => setIsCartOpen(false)} 
                className="p-1.5 border border-zinc-800 rounded-full hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
             
            <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-zinc-600 font-light text-xs uppercase tracking-wider">
                  Tray is empty.
                </div>
              ) : (
                <div className="space-y-6">
                  {checkoutStep === 'cart' && (
                    <>
                      <div className="space-y-3">
                        <AnimatePresence initial={false} mode="popLayout">
                          {cart.map((cartItem) => (
                            <motion.div 
                              key={cartItem.item.name}
                              id={`mobile-cart-item-${cartItem.item.name.replace(/\s+/g, '-').toLowerCase()}`}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="flex flex-col gap-3 group border border-zinc-900 bg-zinc-900/20 p-4 rounded-sm"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1 pr-4">
                                  <h4 className="text-xs font-semibold text-white mb-1">{cartItem.item.name}</h4>
                                  <span className="text-[10px] text-zinc-500 font-mono">
                                    RWF {(parsePrice(cartItem.item.price) * cartItem.quantity)}
                                  </span>
                                </div>
                                <button 
                                  id={`remove-mobile-item-${cartItem.item.name.replace(/\s+/g, '-').toLowerCase()}`}
                                  onClick={() => updateQuantity(cartItem.item.name, -cartItem.quantity)}
                                  className="text-zinc-600 hover:text-zinc-400 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center bg-black rounded-full border border-zinc-850">
                                  <button onClick={() => updateQuantity(cartItem.item.name, -1)} className="w-8 h-8 flex justify-center items-center hover:bg-zinc-950 transition-colors">
                                    <Minus className="w-2.5 h-2.5 text-zinc-400" />
                                  </button>
                                  <span className="text-xs font-mono w-8 text-center text-white">{cartItem.quantity}</span>
                                  <button onClick={() => updateQuantity(cartItem.item.name, 1)} className="w-8 h-8 flex justify-center items-center hover:bg-zinc-950 transition-colors">
                                    <Plus className="w-2.5 h-2.5 text-zinc-400" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      <div className="mt-8 border-t border-zinc-900 pt-6 space-y-3">
                        <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
                          <span>Subtotal</span>
                          <span className="font-mono text-zinc-300">RWF {totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
                          <span>Pickup service</span>
                          <span className="font-mono text-green-500 uppercase tracking-widest text-[9px]">Complementary</span>
                        </div>
                        <div className="flex justify-between text-white text-lg font-light pt-2">
                          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Grand Total</span>
                          <span className="font-mono text-white text-base">RWF {totalAmount}</span>
                        </div>
                      </div>

                      <button 
                        id="proceed-checkout-mobile-btn"
                        onClick={() => setCheckoutStep('details')}
                        className="w-full py-4 mt-6 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                      >
                        Checkout Order <ArrowRight className="w-4 h-4"/>
                      </button>
                      
                      <button 
                        id="clear-order-mobile-btn"
                        onClick={() => { clearCart(); setIsCartOpen(false); }}
                        className="w-full py-3 mt-4 border border-zinc-900 text-zinc-650 text-xs uppercase tracking-widest hover:text-white hover:border-zinc-800 transition-colors"
                      >
                        Clear Tray
                      </button>
                    </>
                  )}

                  {checkoutStep === 'details' && (
                    <form onSubmit={handleCheckout} className="space-y-5">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-baseline mb-1">
                            <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block">Full Name</label>
                            {errors.name && <span className="text-[8px] text-red-500 uppercase tracking-wider">{errors.name}</span>}
                          </div>
                          <input 
                            required 
                            id="mobile-checkout-name"
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className={`w-full bg-transparent border-b py-2.5 text-sm text-white focus:outline-none transition-colors ${
                              errors.name ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-800 focus:border-white'
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-baseline mb-1">
                            <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block">Email Address</label>
                            {errors.email && <span className="text-[8px] text-red-500 uppercase tracking-wider">{errors.email}</span>}
                          </div>
                          <input 
                            required 
                            id="mobile-checkout-email"
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@domain.com"
                            className={`w-full bg-transparent border-b py-2.5 text-sm text-white focus:outline-none transition-colors ${
                              errors.email ? 'border-red-900/50 focus:border-red-500' : 'border-zinc-800 focus:border-white'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold block mb-1.5">Pickup Time Frame</label>
                          <select 
                            required 
                            id="mobile-checkout-pickuptime"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-950 border border-zinc-850 py-3 px-3 text-xs text-white focus:outline-none scrollbar-none"
                          >
                            <option value="asap">ASAP (15-20 mins)</option>
                            <option value="30m">In 30 Minutes</option>
                            <option value="1h">In 1 Hour</option>
                            <option value="later">Sometime Today</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-6 flex gap-3">
                        <button 
                          type="button" 
                          id="mobile-checkout-back-btn"
                          disabled={isSubmitting}
                          onClick={() => setCheckoutStep('cart')} 
                          className="flex-1 py-4 border border-zinc-850 text-zinc-400 text-xs uppercase tracking-wider hover:text-white hover:border-zinc-700 transition-colors"
                        >
                          Tray
                        </button>
                        <button 
                          type="submit" 
                          id="mobile-checkout-submit-btn"
                          disabled={isSubmitting || !isFormValid}
                          className="flex-1 text-center py-4 bg-white text-black text-xs uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-zinc-850"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Placing...
                            </>
                          ) : 'Send Order'}
                        </button>
                      </div>
                    </form>
                  )}

                  {checkoutStep === 'success' && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-zinc-400 mx-auto mb-6" />
                      <h3 className="text-xl font-light text-white mb-2">Order Confirmed!</h3>
                      <p className="text-zinc-500 text-xs font-light mb-8 leading-relaxed">
                        Handcrafted goodies are being prepped. Look for a message inside your inbox at {formData.email}! Show your confirmation to the counter barista upon arrival.
                      </p>
                      <button 
                        id="start-fresh-order-mobile-btn"
                        onClick={() => { setCart([]); setCheckoutStep('cart'); setIsCartOpen(false); }} 
                        className="w-full py-4 border border-zinc-800 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                      >
                        Order Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beautiful Screen Bottom Overlay Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-6 py-3 shadow-2xl flex items-center gap-3 rounded-full font-semibold text-xs uppercase tracking-widest"
          >
            <span className="text-black font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
