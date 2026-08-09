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
    <div className="relative w-full h-[280px] flex justify-center mt-4 mb-8">
      {cards.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-card rounded-[2rem] border border-border border-dashed p-6">
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
          // Calculate dynamic styles based on position in stack
          const isTop = index === 0;
          const yOffset = index * 24; 
          const scale = 1 - index * 0.06;
          const opacity = 1 - index * 0.25;
          const zIndex = 10 - index;
          const blur = index > 0 ? `blur(${index * 1}px)` : "blur(0px)";

          // Only render top 4 cards for performance & visual clarity
          if (index > 3) return null;

          return (
            <motion.div
              key={card.id}
              className="absolute w-full max-w-[340px]"
              style={{ zIndex }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ 
                opacity: opacity > 0 ? opacity : 0, 
                y: yOffset, 
                scale: scale,
                filter: blur,
                boxShadow: isTop 
                  ? "0 20px 40px -10px rgba(0,0,0,0.2)" 
                  : "0 10px 20px -5px rgba(0,0,0,0.1)"
              }}
              exit={{ 
                opacity: 0, 
                y: -300, 
                scale: 0.9, 
                transition: { duration: 0.25, ease: "easeOut" } 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25, 
                mass: 1 
              }}
              drag={isTop ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={isTop ? handleDragEnd : undefined}
            >
              <div className={`relative bg-gradient-to-br ${card.color} text-white p-6 rounded-[2.5rem] overflow-hidden cursor-grab active:cursor-grabbing`}>
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border-[20px] border-white/10"></div>
                <div className="absolute right-12 -bottom-12 w-32 h-32 rounded-full border-[15px] border-white/10"></div>
                
                <div className="relative z-10 w-2/3 min-h-[160px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{card.name}</h3>
                      {isTop && (
                        <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-white/80 text-sm font-medium mb-6">{card.role}</p>
                  </div>
                  
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-sm">
                      <Calendar size={14} className="text-white" />
                      <span className="text-xs font-semibold">{card.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Doctor Image Overlay */}
                <div className="absolute bottom-0 right-0 w-40 h-[115%] pointer-events-none">
                  <img 
                    src={card.image} 
                    alt={card.name} 
                    className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                    draggable="false"
                  />
                </div>

                {/* Swipe Hint Indicator on Active Card */}
                {isTop && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                    <motion.div
                      animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="bg-black/20 backdrop-blur-sm rounded-full p-1"
                    >
                      <ChevronUp size={20} className="text-white" />
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
