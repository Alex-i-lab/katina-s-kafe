import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FULL_MENU_ITEMS } from './data';

export default function MenuPage() {
  const categories = [
    'Coffee & Tea', 
    'Soft Drinks & Smoothies', 
    'Breakfast, Brunch & Sandwiches', 
    'Brunch',
    'Food, Tapas & Sides', 
    'Katina\'s Tapas Selection',
    'Mains',
    'Salads & Bowls',
    'Cocktails, Shots & Mocktails',
    'Wine & Beer',
    'Liquor & Spirits'
  ];
  
  const filterGroups = [
    { label: 'All', categories },
    { label: 'Coffee & Drinks', categories: ['Coffee & Tea', 'Soft Drinks & Smoothies'] },
    { label: 'Food & Dining', categories: ['Breakfast, Brunch & Sandwiches', 'Brunch', 'Food, Tapas & Sides', 'Katina\'s Tapas Selection', 'Mains', 'Salads & Bowls'] },
    { label: 'Bar & Spirits', categories: ['Cocktails, Shots & Mocktails', 'Wine & Beer', 'Liquor & Spirits'] }
  ];

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const displayedCategories = filterGroups.find(g => g.label === activeFilter)?.categories || categories;

  const suggestions = searchQuery.trim() === '' ? [] : FULL_MENU_ITEMS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const getMatchCountForGroup = (groupLabel: string) => {
    const groupCategories = filterGroups.find(g => g.label === groupLabel)?.categories || [];
    if (searchQuery.trim() === '') return groupLabel;
    
    const count = FULL_MENU_ITEMS.filter(item => 
      groupCategories.includes(item.category) && 
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ).length;

    return count > 0 ? `${groupLabel} (${count})` : groupLabel;
  };

  return (
    <div className="bg-black text-zinc-100 font-sans pb-32 min-h-screen">
      <Helmet>
        <title>Menu | Katina's Kafé Selection</title>
        <meta name="description" content="Explore Katina's Kafé full menu featuring artisan coffee, fresh brunch, delicious tapas, and evening cocktails in Kigali." />
      </Helmet>
      {/* Hero Menu Banner */}
      <section className="relative h-[25rem] min-h-[400px] flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto/v1780939113/generate_an_upscaled_version_of_202606081857_hl14v9.jpg" 
            alt="Menu background" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-zinc-500 uppercase tracking-[0.5em] text-[11px] mb-8">Culinary Experience</p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-12">Katina's Selection.</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-12 md:mt-16">
        <div className="max-w-md mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border border-zinc-800 bg-zinc-900/50 text-white rounded-none focus:outline-none focus:border-zinc-500 placeholder-zinc-600 transition-colors sm:text-sm uppercase tracking-wider text-[11px]"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim() !== '' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 w-full mt-2 bg-zinc-950 border border-zinc-800 shadow-2xl overflow-y-auto max-h-[300px]"
              >
                {suggestions.length > 0 ? (
                  suggestions.map((item, idx) => (
                    <div 
                      key={idx}
                      className="px-4 py-3 hover:bg-zinc-800/80 cursor-pointer border-b border-zinc-900 last:border-0 transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent input blur
                        setSearchQuery(item.name);
                        setIsSearchFocused(false);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-light tracking-[0.2em] text-zinc-600">{item.category}</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <h4 className="text-zinc-200 text-sm font-light tracking-wide truncate">{item.name}</h4>
                        <span className="text-zinc-500 text-[10px] font-mono shrink-0 italic">{item.price}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-zinc-500 text-[10px] uppercase tracking-widest">
                    No items found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-24">
          {filterGroups.map((group) => (
            <button
              key={group.label}
              onClick={() => setActiveFilter(group.label)}
              className={`text-[10px] md:text-xs uppercase tracking-widest px-6 py-3 border transition-all duration-300 rounded-sm ${
                activeFilter === group.label
                  ? 'bg-white text-black border-white shadow-xl shadow-white/5'
                  : 'border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
              }`}
            >
              {getMatchCountForGroup(group.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-32">
        {displayedCategories.map((category, catIdx) => {
          const items = FULL_MENU_ITEMS.filter(item => {
            const matchesCategory = item.category === category;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
          });
          if (items.length === 0) return null;

          return (
            <section key={category} className="relative">
              <div className="text-center mb-16 sticky top-[60px] z-40 bg-black/95 backdrop-blur-sm pt-6 pb-6 border-b border-zinc-900 md:border-none shadow-2xl md:shadow-none -mx-6 px-6 md:mx-0 md:px-0">
                <p className="text-zinc-500 uppercase tracking-[0.4em] text-[11px] mb-6">Selection</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">{category}</h2>
              </div>

              <div className="relative grid md:grid-cols-2 gap-y-16 gap-x-24">
                {/* Vertical line divider for desktop */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent transform -translate-x-1/2"></div>
                
                {items.map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex justify-between items-end mb-2 w-full gap-2 md:gap-4">
                      <h3 className="text-lg md:text-xl font-light tracking-wide text-zinc-200 group-hover:text-white transition-colors">{item.name}</h3>
                      <div className="flex-grow border-b border-zinc-700 border-dotted mb-1.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      <span className="text-zinc-400 font-mono text-sm shrink-0 whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
