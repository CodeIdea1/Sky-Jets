'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const contactLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const heroHeight = windowHeight * 2.5;
      const lastSectionStart = documentHeight - windowHeight * 1.5;
      
      setIsDark(scrollY > heroHeight && scrollY < lastSectionStart);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navLinksRef.current || !contactLinksRef.current) return;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const links = navLinksRef.current.querySelectorAll('li');
    const contactLinks = contactLinksRef.current;

    if (isOpen) {
      gsap.to(links, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
      });
      gsap.to(contactLinks, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: 'expo.out',
      });
    } else {
      gsap.to([...links].reverse(), {
        x: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power3.in',
      });
      gsap.to(contactLinks, {
        x: 50,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <button 
          className={`${styles.hamburger} ${isDark ? styles.dark : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`}></span>
          <span className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`}></span>
          <span className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`}></span>
        </button>

        <ul ref={navLinksRef} className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''} ${isDark ? styles.dark : ''}`}>
          <li><a href="#hero" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#aircraft" onClick={() => setIsOpen(false)}>Aircraft</a></li>
          <li><a href="#experience" onClick={() => setIsOpen(false)}>Experience</a></li>
          <li><a href="#destinations" onClick={() => setIsOpen(false)}>Destinations</a></li>
        </ul>

        <div ref={contactLinksRef} className={`${styles.contactLinks} ${isOpen ? styles.contactLinksOpen : ''} ${isDark ? styles.dark : ''}`}>
          <a href="tel:+971544325050" className={styles.contactLink}>+971 54 432 5050</a>
          <a href="mailto:info@jeskojets.com" className={styles.contactLink}>info@jeskojets.com</a>
        </div>
      </div>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}
