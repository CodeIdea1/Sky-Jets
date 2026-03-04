'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronDown } from 'react-icons/fa';
import styles from '../styles/heroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const planeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('hasVisited');
    if (isFirstVisit && window.scrollY < window.innerHeight) {
      setHasAnimated(false);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    if (!planeRef.current || !sectionRef.current || !logoRef.current || !leftColumnRef.current || !rightColumnRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    const triggers: ScrollTrigger[] = [];

    // Plane animation
    const planeTrigger = gsap.to(planeRef.current, {
      scale: isMobile ? 6.6 : isTablet ? 3.5 : 5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        pin: planeRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          if (planeRef.current && self.progress > 0.95) {
            planeRef.current.style.opacity = '0';
            planeRef.current.style.visibility = 'hidden';
          } else if (planeRef.current) {
            planeRef.current.style.visibility = 'visible';
            planeRef.current.style.opacity = '1';
          }
        },
        onEnterBack: () => {
          if (planeRef.current) {
            const planeWindow = planeRef.current.querySelector(`.${styles.PlaneWindow}`) as HTMLElement;
            if (planeWindow) {
              planeWindow.style.animation = 'none';
              planeWindow.style.transform = 'translate(-50%, calc(-50% - 75vh))';
            }
          }
        },
      },
    });
    if (planeTrigger.scrollTrigger) triggers.push(planeTrigger.scrollTrigger);

    // Logo animation
    const logoTrigger = gsap.to(logoRef.current, {
      y: isMobile ? 'calc(-50vh + 30px)' : 'calc(-50vh + 40px)',
      scaleY: 0.6,
      scaleX: isMobile ? 1.3 : isTablet ? 1.4 : 1.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '30% top',
        scrub: 0.5,
      },
    });
    if (logoTrigger.scrollTrigger) triggers.push(logoTrigger.scrollTrigger);

    const logoPin = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '18% top',
      end: 'bottom top',
      pin: logoRef.current,
      pinSpacing: false,
    });
    triggers.push(logoPin);

    // Content animations
    if (!isMobile) {
      const leftTrigger = gsap.to(leftColumnRef.current, {
        x: isTablet ? -100 : -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
      if (leftTrigger.scrollTrigger) triggers.push(leftTrigger.scrollTrigger);

      const rightTrigger = gsap.to(rightColumnRef.current, {
        x: isTablet ? 100 : 200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
      if (rightTrigger.scrollTrigger) triggers.push(rightTrigger.scrollTrigger);
    } else {
      const leftTrigger = gsap.to(leftColumnRef.current, {
        x: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
      });
      if (leftTrigger.scrollTrigger) triggers.push(leftTrigger.scrollTrigger);

      const rightTrigger = gsap.to(rightColumnRef.current, {
        x: 150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
      });
      if (rightTrigger.scrollTrigger) triggers.push(rightTrigger.scrollTrigger);
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className={styles.heroSection}>
      <a href="/" ref={logoRef} className={styles.logo}>Sky Jets</a>
      <div className={styles.cloudWrapper}>
        <div className={styles.cloudContainer}>
          <img src="/ccc2.webp" alt="Cloud" className={styles.cloud} />
          <img src="/ccc2.webp" alt="Cloud" className={styles.cloud} />
        </div>
      </div>
      <div className={styles.cloudWrapper2}>
        <div className={styles.cloudContainer2}>
          <img src="/ccc2.webp" alt="Cloud" className={styles.cloud} />
          <img src="/ccc2.webp" alt="Cloud" className={styles.cloud} />
        </div>
      </div>
      <div ref={planeRef} className={styles.planeContainer}>
        <div className={`${styles.PlaneWindow} ${hasAnimated ? styles.noAnimation : ''}`}></div>
        <img src={isMobile ? "/PlaneWindowLayerMobile.png" : "/PlaneWindowLayer.webp"} alt="" className={styles.PlaneWindowLayer} />
        <img src={isMobile ? "/planeHeroMobile.png" : "/planeHero.webp"} alt="Plane" className={styles.plane} />
        <div className={styles.content}>
          <div ref={leftColumnRef} className={styles.leftColumn}>
            <h2 className={styles.title}>We are <br /> movement</h2>
            <h1 className={styles.mainHeading}>Your<br/>freedom to<br/>enjoy life</h1>
            <p className={styles.description}>Every flight is designed around your comfort,<br/>time, and ambitions — so you can focus on<br/>what truly matters, while we take care of<br/>everything else.</p>
          </div>
          <div ref={rightColumnRef} className={styles.rightColumn}>
            <h2 className={`${styles.title} ${styles.titleSecond}`}>We are <br /> distinction</h2>
            <div className={styles.scrollSection}>
              <div className={styles.arrowDown}>
                <FaChevronDown className={styles.arrow} />
                <FaChevronDown className={styles.arrow} />
                <FaChevronDown className={styles.arrow} />
              </div>
              <span>Scroll down</span>
              <span>To start the journey</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
