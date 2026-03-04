'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/CitiesSlider.module.css';

gsap.registerPlugin(ScrollTrigger);

const cities = [
  'Paris', 'Tel Aviv', 'São Paulo', 'Singapore', 'Mexico City', 'Abu Dhabi',
  'Tokyo', 'Lagos', 'Cairo', 'Berlin', 'New York', 'Riyadh',
  'Zurich', 'Bangkok', 'Shanghai', 'Dubai', 'Mykonos', 'Hong Kong',
  'Miami', 'Los Angeles', 'London', 'Milan', 'Doha', 'Cape Town',
  'Sydney', 'Marrakech', 'Melbourne', 'Toronto', 'Seoul', 'Nice', 'Geneva'
];

export default function CitiesSlider() {
  const listRef = useRef<HTMLUListElement>(null);
  const currentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;

    gsap.to(containerRef.current, {
      y: 100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: isMobile ? 'bottom top-=10%' : 'top+=300 top+=30%',
        end: 'bottom top+=50%',
        scrub: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const totalCities = cities.length;
    const extendedCities = [...cities, ...cities.slice(0, 5)];

    const updateActiveCity = () => {
      const items = list.querySelectorAll(`.${styles.cityItem}`);
      items.forEach((item, index) => {
        item.classList.remove(styles.active);
        if (index === currentIndexRef.current + 2) {
          item.classList.add(styles.active);
        }
      });
    };

    const interval = setInterval(() => {
      currentIndexRef.current++;
      const offset = currentIndexRef.current * 60;
      list.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      list.style.transform = `translateY(-${offset}px)`;
      updateActiveCity();

      if (currentIndexRef.current >= totalCities) {
        setTimeout(() => {
          list.style.transition = 'none';
          currentIndexRef.current = 0;
          list.style.transform = 'translateY(0px)';
          updateActiveCity();
        }, 1200);
      }
    }, 1500);

    updateActiveCity();

    return () => clearInterval(interval);
  }, []);

  const extendedCities = [...cities, ...cities.slice(0, 5)];

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Fly anywhere</h3>
        
        <div className={styles.planeIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.0526 14L10 22L8 22L10.5263 14L5.1667 14L3.5 17L2 17L3 12.5L2 8L3.5 8L5.1667 11L10.5263 11L8 3L10 3L15.0526 11L20.5 11C21.3284 11 22 11.6716 22 12.5C22 13.3284 21.3284 14 20.5 14L15.0526 14Z" fill="currentColor"/>
          </svg>
        </div>

        <div className={styles.sliderWrapper}>
          <ul ref={listRef} className={styles.citiesList}>
            {extendedCities.map((city, index) => (
              <li key={index} className={styles.cityItem}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
