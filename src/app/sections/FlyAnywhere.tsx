'use client';
import { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

const cities = [
  'Paris', 'Tel Aviv', 'São Paulo', 'Singapore', 'Mexico City', 'Abu Dhabi',
  'Tokyo', 'Lagos', 'Cairo', 'Berlin', 'New York', 'Riyadh', 'Zurich',
  'Bangkok', 'Shanghai', 'Dubai', 'Mykonos', 'Hong Kong', 'Miami',
  'Los Angeles', 'London', 'Milan', 'Doha', 'Cape Town', 'Sydney',
  'Marrakech', 'Melbourne', 'Toronto', 'Seoul', 'Nice', 'Geneva'
];

export default function FlyAnywhere() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 30);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8">
          <h2 className="text-2xl font-light text-gray-400 whitespace-nowrap">Fly anywhere</h2>
          <Plane className="w-6 h-6 text-gray-400" />
          
          <div className="relative h-[120px] w-[200px] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent" />
            </div>
            <ul 
              className="flex flex-col gap-2"
              style={{
                transform: `translateY(${offset + 50}px)`,
                transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {[...cities, ...cities, ...cities].map((city, index) => {
                const position = (offset + 50 + index * 30) / 30;
                const distance = Math.abs(position - 1.5);
                const isActive = distance < 0.5;
                
                return (
                  <li
                    key={`${city}-${index}`}
                    className={`text-xl whitespace-nowrap transition-all duration-1000 ease-out ${
                      isActive
                        ? 'text-white font-medium'
                        : 'text-gray-600 font-light'
                    }`}
                  >
                    {city}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
