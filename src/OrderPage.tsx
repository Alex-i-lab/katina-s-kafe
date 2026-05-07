import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Plus, Minus, X, ArrowRight, CreditCard, CheckCircle } from 'lucide-react';
import { FULL_MENU_ITEMS, MenuItem } from './data';

export default function OrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{item: MenuItem, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');

  const displayedItems = searchQuery.trim().length > 0 
    ? FULL_MENU_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

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
    setIsCartOpen(true);
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
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            Order Online
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
            className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6"
          >
            Skip the Line
          </motion.h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <input
            type="text"
            className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-6 text-white text-sm uppercase tracking-widest focus:outline-none focus:border-white transition-colors"
            placeholder="Search for your favorite item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-6 xl:gap-8">
          <div className="col-span-4 md:col-span-8 xl:col-span-8">
            {searchQuery.trim().length === 0 ? (
               <div className="text-center py-24 border border-zinc-800 bg-zinc-900/40">
                 <p className="text-zinc-500 font-light mb-2">What are you craving today?</p>
                 <p className="text-zinc-600 text-sm">Use the search bar above to find items (e.g., "Latte", "Croissant")</p>
               </div>
            ) : displayedItems.length === 0 ? (
               <div className="text-center py-24 border border-zinc-800 bg-zinc-900/40">
                 <p className="text-zinc-500 font-light">No items found matching "{searchQuery}"</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {displayedItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-light text-white">{item.name}</h3>
                          <span className="text-zinc-300">RWF {parsePrice(item.price).toFixed(2)}</span>
                        </div>
                        {item.description && (
                          <p className="text-sm font-light text-zinc-500 mb-6">{item.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full flex items-center justify-center gap-2 border border-zinc-700 py-3 text-xs uppercase tracking-widest text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all mt-auto"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Cart Sidebar (Desktop) / Floating (Mobile implementation can be adapted) */}
          <div className="col-span-4 md:col-span-8 xl:col-span-4 lg:sticky lg:top-32 self-start">
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
                        <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                          {cart.map((cartItem) => (
                            <div key={cartItem.item.name} className="flex justify-between items-center group">
                              <div className="flex-1">
                                <h4 className="text-sm font-light text-white">{cartItem.item.name}</h4>
                                <span className="text-xs text-zinc-500 font-mono">RWF {(parsePrice(cartItem.item.price) * cartItem.quantity).toFixed(2)}</span>
                              </div>
                              <div className="flex items-center gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => updateQuantity(cartItem.item.name, -1)} className="w-8 h-8 flex justify-center items-center border border-zinc-700 hover:bg-zinc-800 rounded-full">
                                  <Minus className="w-3 h-3 text-zinc-400" />
                                </button>
                                <span className="text-sm">{cartItem.quantity}</span>
                                <button onClick={() => updateQuantity(cartItem.item.name, 1)} className="w-8 h-8 flex justify-center items-center border border-zinc-700 hover:bg-zinc-800 rounded-full">
                                  <Plus className="w-3 h-3 text-zinc-400" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-zinc-800 pt-6 space-y-4">
                          <div className="flex justify-between text-white text-lg font-light pt-2">
                            <span>Total</span>
                            <span>RWF {totalAmount.toFixed(2)}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => setCheckoutStep('details')}
                          className="w-full py-4 mt-6 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                          Checkout <ArrowRight className="w-4 h-4"/>
                        </button>
                      </>
                    )}

                    {checkoutStep === 'details' && (
                      <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep('success'); }} className="space-y-6">
                         <div className="space-y-4">
                            <div>
                               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Name</label>
                               <input required type="text" className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white font-light"/>
                            </div>
                            <div>
                               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Email</label>
                               <input required type="email" className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white font-light"/>
                            </div>
                            <div>
                               <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Pickup Time</label>
                               <select required className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white font-light [&>option]:bg-zinc-900">
                                 <option value="asap">ASAP (15-20 mins)</option>
                                 <option value="30m">In 30 Minutes</option>
                                 <option value="1h">In 1 Hour</option>
                               </select>
                            </div>
                         </div>
                         
                         <div className="pt-6 flex gap-4">
                            <button type="button" onClick={() => setCheckoutStep('cart')} className="flex-1 py-4 border border-zinc-700 text-zinc-400 text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors">
                              Back
                            </button>
                            <button type="submit" className="flex-1 text-center py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors">
                              Pay Now
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
    </div>
  );
}
