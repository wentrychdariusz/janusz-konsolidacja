
import React, { useState, useEffect } from 'react';

const notifications = [
  { name: "Anna K.", location: "Warszawa", time: "2 minuty temu" },
  { name: "Tomasz M.", location: "Kraków", time: "8 minut temu" },
  { name: "Katarzyna S.", location: "Gdańsk", time: "12 minut temu" },
  { name: "Michał P.", location: "Wrocław", time: "16 minut temu" },
  { name: "Joanna W.", location: "Poznań", time: "19 minut temu" },
  { name: "Robert K.", location: "Łódź", time: "20 minut temu" },
];

const LiveNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 12000); // Zwiększone z 8000 do 12000ms (12 sekund) - mniej częste

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[currentNotification];

  return (
    <div className="fixed top-20 left-4 z-40 max-w-sm">
      <div 
        className={`bg-white/80 backdrop-blur-md border-2 border-green-400 rounded-xl shadow-xl p-4 transition-all duration-500 ${
          isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              <span className="text-green-600">✅ {notification.name}</span> z {notification.location}
            </p>
            <p className="text-xs text-gray-600">
              zapisał się na konsultację • {notification.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNotifications;
