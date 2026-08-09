"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronUp, RotateCcw } from "lucide-react";

const INITIAL_CARDS = [
  {
    id: 1,
    name: "Dr. Alexa Nova",
    role: "Cardiovascular",
    date: "Feb 24, 9:00am",
    color: "from-blue-400 to-blue-600",
    image: "https://static.vecteezy.com/system/resources/previews/028/287/384/non_2x/a-female-doctor-with-a-transparent-background-free-png.png",
  },
  {
    id: 2,
    name: "Dr. Ryan Chen",
    role: "Dermatologist",
    date: "Mar 12, 2:30pm",
    color: "from-purple-400 to-purple-600",
    image: "https://static.vecteezy.com/system/resources/previews/028/287/555/non_2x/a-male-doctor-with-a-transparent-background-free-png.png",
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins",
    role: "Oncologist",
    date: "Apr 05, 10:00am",
    color: "from-teal-400 to-teal-600",
    image: "https://static.vecteezy.com/system/resources/previews/028/287/384/non_2x/a-female-doctor-with-a-transparent-background-free-png.png",
  },
  {
    id: 4,
    name: "Dr. Michael Lee",
    role: "Cosmetic Surgeon",
    date: "May 18, 1:15pm",
    color: "from-orange-400 to-orange-600",
    image: "https://static.vecteezy.com/system/resources/previews/028/287/555/non_2x/a-male-doctor-with-a-transparent-background-free-png.png",
  },
  {
    id: 5,
    name: "Dr. Emily Rostova",
    role: "Pediatrician",
    date: "Jun 02, 11:45am",
    color: "from-pink-400 to-pink-600",
    image: "https://static.vecteezy.com/system/resources/previews/028/287/384/non_2x/a-female-doctor-with-a-transparent-background-free-png.png",
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    role: "General Practice",
    date: "Jul 10, 4:00pm",
    color: "from-indigo-400 to-indigo-600",
    image: "https://static.vecteezy.com/system/resources/previews/028/287/555/non_2x/a-male-doctor-with-a-transparent-background-free-png.png",
  }
];

export default function StackedCards() {
  const [cards, setCards] = useState(INITIAL_CARDS);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = -80;
    const velocityThreshold = -500;
    
    // If swiped far enough up, or fast enough up
    if (info.offset.y < swipeThreshold || info.velocity.y < velocityThreshold) {
      setCards((prev) => prev.slice(1));
    }
  };

  const handleReset = () => {
    setCards(INITIAL_CARDS);
  };

  return (
    <div className="relative w-full h-[190px] px-3 mt-6 mb-8 mx-auto max-w-[500px]">
      {cards.length === 0 && (
        <div className="absolute inset-0 mx-5 flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-border border-dashed p-6">
          <p className="text-muted-foreground font-medium mb-4">No more upcoming appointments.</p>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-xl transition-colors font-semibold text-sm"
          >
            <RotateCcw size={16} /> View Again
          </button>
        </div>
      )}

      <AnimatePresence>
        {cards.map((card, index) => {
          // Moderate, intentional stack visibility
          const isTop = index === 0;
          const yOffset = index * 12; // Balanced vertical offset
          const scale = 1 - index * 0.02; // Slight scaling so cards are visible underneath
          const opacity = 1 - index * 0.08; // Keep them bright enough to be seen
          const zIndex = 10 - index;
          
          // Only show top 4 cards
          if (index > 3) return null;

          return (
            <motion.div
              key={card.id}
              className="absolute left-3 right-3 origin-top rounded-[1.8rem]" // Added rounded to fix rectangular shadow
              style={{ zIndex }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ 
                opacity: opacity > 0 ? opacity : 0, 
                y: yOffset, 
                scale: scale,
                boxShadow: isTop 
                  ? "0 10px 30px -10px rgba(0,0,0,0.1), 0 5px 15px -5px rgba(0,0,0,0.03)" 
                  : "0 4px 12px -8px rgba(0,0,0,0.05)"
              }}
              exit={{ 
                opacity: 0, 
                y: -150, 
                scale: 0.95, 
                transition: { duration: 0.25, ease: "easeOut" } 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30, 
                mass: 0.8 
              }}
              drag={isTop ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={isTop ? handleDragEnd : undefined}
            >
              <div className={`relative bg-gradient-to-br ${card.color} text-white p-5 rounded-[1.8rem] overflow-hidden cursor-grab active:cursor-grabbing w-full`}>
                {/* Background Decor */}
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[15px] border-white/10"></div>
                <div className="absolute right-12 -bottom-12 w-24 h-24 rounded-full border-[10px] border-white/10"></div>
                
                <div className="relative z-10 w-[65%] min-h-[110px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="text-lg font-bold leading-tight">{card.name}</h3>
                      {isTop && (
                        <div className="w-3.5 h-3.5 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm shrink-0">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-white/80 text-xs font-medium mb-4">{card.role}</p>
                  </div>
                  
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                      <Calendar size={12} className="text-white" />
                      <span className="text-[10px] font-semibold">{card.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Doctor Image Overlay */}
                <div className="absolute bottom-0 right-0 w-[35%] max-w-[120px] h-[125%] pointer-events-none">
                  <img 
                    src={card.image} 
                    alt={card.name} 
                    className="w-full h-full object-contain object-bottom drop-shadow-xl"
                    draggable="false"
                  />
                </div>

                {/* Subtle Swipe Hint Indicator */}
                {isTop && (
                  <div className="absolute bottom-1.5 left-0 right-0 flex justify-center pointer-events-none">
                    <motion.div
                      animate={{ y: [0, -4, 0], opacity: [0.2, 0.6, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="bg-black/10 backdrop-blur-sm rounded-full p-0.5"
                    >
                      <ChevronUp size={14} className="text-white/80" />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
