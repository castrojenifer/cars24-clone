import React, { useState, useEffect, useRef } from "react";
import useNotifications, { Notification } from "@/hooks/useNotifications";
import {
  Bell,
  Calendar,
  MessageSquare,
  TrendingDown,
  Settings,
  Check,
  Circle,
} from "lucide-react";

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationBell() {
  const {
    notifications,
    unreadCount,
    markAllRead,
    markOneRead,
    preferences,
    togglePreference,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return (
          <div className="p-2 bg-green-100 text-green-700 rounded-full">
            <Calendar className="h-4 w-4" />
          </div>
        );
      case "price_drop":
        return (
          <div className="p-2 bg-blue-100 text-blue-700 rounded-full">
            <TrendingDown className="h-4 w-4" />
          </div>
        );
      case "message":
      default:
        return (
          <div className="p-2 bg-purple-100 text-purple-700 rounded-full">
            <MessageSquare className="h-4 w-4" />
          </div>
        );
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Bell Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors focus:outline-hidden cursor-pointer"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden text-black">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-sm text-gray-800">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setShowPrefs(!showPrefs)}
                className={`p-1 rounded-md hover:bg-gray-200 transition-colors cursor-pointer ${
                  showPrefs ? "text-blue-600 bg-blue-50" : "text-gray-500"
                }`}
                title="Notification Preferences"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          {showPrefs && (
            <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs space-y-2">
              <p className="font-medium text-gray-700 mb-1">
                Filter Notifications
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={preferences.price_drop}
                    onChange={() => togglePreference("price_drop")}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <span className="text-gray-600 font-medium">Price Drops</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={preferences.appointment}
                    onChange={() => togglePreference("appointment")}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <span className="text-gray-600 font-medium">Appointments</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={preferences.message}
                    onChange={() => togglePreference("message")}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <span className="text-gray-600 font-medium">Messages</span>
                </label>
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markOneRead(notif.id)}
                  className={`flex gap-3 p-3 text-left transition-colors cursor-pointer hover:bg-gray-50 ${
                    !notif.read ? "bg-blue-50/40" : ""
                  }`}
                >
                  <div className="shrink-0">{getIcon(notif.type)}</div>
                  <div className="grow space-y-0.5">
                    <div className="flex justify-between items-start gap-1">
                      <p
                        className={`text-xs text-gray-900 leading-tight ${
                          !notif.read ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                        {getRelativeTime(notif.timestamp)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-normal">
                      {notif.body}
                    </p>
                  </div>
                  {!notif.read && (
                    <div className="shrink-0 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
