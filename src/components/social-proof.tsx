"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Home, TrendingUp, MapPin, Clock, Star } from "lucide-react";

const notifications = [
  { icon: Users, text: "12 people are viewing Grand Polo right now" },
  { icon: Home, text: "Someone from Dubai just enquired about Chevalia Estate" },
  { icon: TrendingUp, text: "2 units reserved this week in Chevalia Fields" },
  { icon: Star, text: "A buyer from London just reserved a Chevalia Estate 2 villa", location: "London" },
  { icon: Home, text: "Someone from Abu Dhabi enquired about Grand Polo villas", location: "Abu Dhabi" },
  { icon: TrendingUp, text: "5 viewings booked for this weekend at Grand Polo" },
  { icon: Users, text: "8 people are viewing Chevalia Fields right now" },
  { icon: Home, text: "A buyer from Mumbai just enquired about equestrian villas", location: "Mumbai" },
  { icon: Star, text: "3 units sold this month in Chevalia Estate 2" },
  { icon: Home, text: "Someone from Riyadh reserved a 5-bedroom villa", location: "Riyadh" },
  { icon: TrendingUp, text: "Grand Polo viewing slots filling up for this week" },
  { icon: Users, text: "6 people are comparing Chevalia clusters right now" },
];

export default function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  const showNext = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % notifications.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 500);
  }, []);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setStarted(true);
      showNext();
    }, 10000);
    return () => clearTimeout(initTimer);
  }, [showNext]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      showNext();
    }, 15000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [started, showNext]);

  const n = notifications[current];
  const Icon = n.icon;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-20 left-4 z-40 max-w-xs"
        >
          <div className="bg-[#2A1506]/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-[#2A1506]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#FFFAF3] text-xs leading-relaxed">{n.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-[#8B6B47]" />
                  <span className="text-[#8B6B47] text-[10px]">Just now</span>
                  {n.location && (
                    <span className="flex items-center gap-1 text-[10px] text-[#D4AF37]">
                      <MapPin className="w-3 h-3" /> {n.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
