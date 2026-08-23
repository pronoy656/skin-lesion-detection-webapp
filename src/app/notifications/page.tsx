"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Stethoscope, 
  Clock, 
  CheckCheck 
} from "lucide-react";
import BackButton from "@/components/BackButton";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      title: "Monthly Skin Checkup Reminder",
      description: "It's been 30 days since your last AI scan. Perform a quick checkup to track mole evolutions.",
      time: "2 hours ago",
      isUnread: true,
      icon: "Calendar",
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200/50 dark:border-blue-900/50"
    },
    {
      id: 2,
      type: "appointment",
      title: "Doctor Consultation Confirmed",
      description: "Your appointment with Dr. Alexa Nova is confirmed for tomorrow at 10:00 AM at Asian Hospital.",
      time: "1 day ago",
      isUnread: true,
      icon: "Stethoscope",
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/50 dark:border-emerald-900/50"
    },
    {
      id: 3,
      type: "article",
      title: "New Article: Identifying Early Melanoma",
      description: "Learn the ABCDEs of melanoma and what visual signs to look out for during home screening.",
      time: "3 days ago",
      isUnread: false,
      icon: "Sparkles",
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/50 dark:border-indigo-900/50"
    },
    {
      id: 4,
      type: "system",
      title: "AI Engine Upgrade v2.4",
      description: "Our CNN neural network model has been updated with enhanced feature map extraction accuracy.",
      time: "1 week ago",
      isUnread: false,
      icon: "ShieldCheck",
      color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200/50 dark:border-purple-900/50"
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return n.isUnread;
    return true;
  });

  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Responsive Header without text wrapping */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <BackButton fallbackHref="/" />
          <h1 className="text-sm sm:text-base font-bold text-foreground truncate">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
              {unreadCount} New
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap active:scale-95 transition-all"
          >
            <CheckCheck size={14} /> <span>Mark read</span>
          </button>
        )}
      </header>

      <div className="p-4 sm:p-5 max-w-2xl mx-auto space-y-4">
        {/* Filter Pills */}
        <div className="flex gap-2 pb-1">
          {["All", "Unread"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center p-8 bg-card rounded-2xl border border-border/50 shadow-sm space-y-2">
              <div className="w-12 h-12 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-2 border border-border/40">
                <Bell size={20} />
              </div>
              <h3 className="text-sm font-bold text-foreground">No unread notifications</h3>
              <p className="text-xs text-muted-foreground font-medium">You're all caught up with your skin health alerts!</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div 
                key={notif.id}
                className={`bg-card border rounded-2xl p-3.5 sm:p-4 shadow-sm transition-all relative overflow-hidden ${
                  notif.isUnread ? "border-blue-500/40 bg-blue-50/20 dark:bg-blue-950/20" : "border-border/60"
                }`}
              >
                {notif.isUnread && (
                  <div className="absolute top-3.5 right-3.5 w-2 h-2 bg-blue-600 rounded-full" />
                )}

                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${notif.color}`}>
                    {notif.icon === "Calendar" && <Calendar size={16} />}
                    {notif.icon === "Stethoscope" && <Stethoscope size={16} />}
                    {notif.icon === "Sparkles" && <Sparkles size={16} />}
                    {notif.icon === "ShieldCheck" && <ShieldCheck size={16} />}
                  </div>

                  <div className="flex-1 min-w-0 pr-3">
                    <h3 className="font-bold text-xs sm:text-sm text-foreground mb-1 leading-snug">{notif.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium mb-2">{notif.description}</p>
                    
                    <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                      <Clock size={11} /> {notif.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
