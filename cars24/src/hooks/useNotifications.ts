import { useState, useEffect } from "react";

export interface Notification {
  id: string;
  type: "bid" | "price_drop" | "appointment" | "message";
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
}

export interface NotificationPrefs {
  price_drop: boolean;
  appointment: boolean;
  message: boolean;
}

const DEFAULT_PREFS: NotificationPrefs = {
  price_drop: true,
  appointment: true,
  message: true,
};

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedPrefs = localStorage.getItem("cars24_notif_prefs");
    if (storedPrefs) {
      try {
        setPrefs(JSON.parse(storedPrefs));
      } catch (e) {
        console.error("Error parsing preferences", e);
      }
    }

    const storedNotifs = localStorage.getItem("cars24_notifications");
    if (storedNotifs) {
      try {
        setNotifications(JSON.parse(storedNotifs));
      } catch (e) {
        console.error("Error parsing notifications", e);
      }
    } else {
      // Seed notifications
      const initialNotifs: Notification[] = [
        {
          id: "notif-1",
          type: "appointment",
          title: "Appointment Confirmed",
          body: "Your test drive for Honda City is confirmed for tomorrow 10AM",
          timestamp: Date.now() - 60 * 60 * 1000, // 1 hour ago
          read: false,
        },
        {
          id: "notif-2",
          type: "price_drop",
          title: "Price Drop Alert 🎉",
          body: "Maruti Swift you viewed dropped by ₹25,000",
          timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
          read: false,
        },
        {
          id: "notif-3",
          type: "message",
          title: "New Message",
          body: "Seller replied to your enquiry about Hyundai Creta",
          timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
          read: false,
        },
      ];
      setNotifications(initialNotifs);
      localStorage.setItem("cars24_notifications", JSON.stringify(initialNotifs));
    }
  }, []);

  // Sync helpers
  const saveNotifications = (newNotifs: Notification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem("cars24_notifications", JSON.stringify(newNotifs));
  };

  const savePrefs = (newPrefs: NotificationPrefs) => {
    setPrefs(newPrefs);
    localStorage.setItem("cars24_notif_prefs", JSON.stringify(newPrefs));
  };

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const markOneRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const addNotification = (n: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotif: Notification = {
      ...n,
      id: `notif-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      read: false,
    };
    const updated = [newNotif, ...notifications];
    saveNotifications(updated);
  };

  const togglePreference = (type: keyof NotificationPrefs) => {
    const updated = { ...prefs, [type]: !prefs[type] };
    savePrefs(updated);
  };

  // Filter notifications based on preferences
  const isEnabled = (type: Notification["type"]) => {
    if (type === "price_drop") return prefs.price_drop;
    if (type === "appointment") return prefs.appointment;
    if (type === "message" || type === "bid") return prefs.message;
    return true;
  };

  const visibleNotifications = notifications.filter((n) => isEnabled(n.type));
  const unreadCount = visibleNotifications.filter((n) => !n.read).length;

  return {
    notifications: visibleNotifications,
    allNotifications: notifications, // in case we need all
    unreadCount,
    markAllRead,
    markOneRead,
    addNotification,
    preferences: prefs,
    togglePreference,
  };
}
