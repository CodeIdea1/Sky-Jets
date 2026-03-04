'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const title = container.querySelector(`.${styles.title}`);
    const words = container.querySelectorAll(`.${styles.char}`);
    if (!title || words.length === 0) return;
    
    const ctx = gsap.context(() => {
      gsap.to(container, {
        y: -400,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'top center',
          scrub: 0.5,
        }
      });

      timelineRef.current = tl;
      scrollTriggerRef.current = tl.scrollTrigger || null;

      words.forEach((word, index) => {
        tl.to(word, {
          color: '#fff',
          duration: 0.1,
          ease: 'none'
        }, index * 0.05);
      });
    }, container);

    ctxRef.current = ctx;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
        scrollTriggerRef.current = null;
      }

      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, []);

  const text = "Jesko Jets® is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust us to deliver on time, every time.";

  const renderWords = () => {
    return text.split(' ').map((word, index) => (
      <span 
        key={index} 
        className={styles.char}
      >
        {word}{index < text.split(' ').length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <section id="about" className={styles.section}>
      <div className={styles.cloudLayer}></div>
      <div ref={containerRef} className={styles.mainContainer}>
        <h1 className={styles.title}>
          {renderWords()}
        </h1>
        
        <div className={styles.contentRow}>
          <div className={styles.leftColumn}>
            <div className={styles.logoBox}>
              <img src="/logo.png" alt="Logo" className={styles.smallLogo} />
              <div className={styles.textBox}>
                <h3 className={styles.smallTitle}>Development by Codeidea</h3>
          
              </div>
            </div>
          </div>
          
          <div className={styles.rightColumn}>
            <div className={styles.row}>
              <div className={styles.col}>
                <h4 className={styles.colTitle}>Direct Access to Private Travel</h4>
                <p className={styles.colDesc}>
                  Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, 
                  personalized travel experiences — from the first call to landing. 
                  Every journey is tailored to your comfort, privacy, and schedule.
                </p>
              </div>
              <div className={styles.col}>
                <h4 className={styles.colTitle}>Your Freedom to Enjoy Life</h4>
                <p className={styles.colDesc}>
                  We value your time above all. Jesko Jets gives you the freedom to live, work, 
                  and relax wherever life takes you — without compromise.
                </p>
              </div>
            </div>
            
            <div className={styles.row}>
              <div className={styles.col}>
                <h4 className={styles.colTitle}>Precision and Excellence</h4>
                <p className={styles.colDesc}>
                  Each detail of your flight — from route planning to in-flight service — reflects our 
                  dedication to perfection. Our crew and fleet meet the highest global standards, ensuring reliability in every mission.
                </p>
              </div>
              <div className={styles.col}>
                <h4 className={styles.colTitle}>Global Reach, Personal Touch</h4>
                <p className={styles.colDesc}>
                  With access to destinations in over 150 countries, Jesko Jets brings the world closer to you.
                  Our experts manage every aspect of your flight, guaranteeing a smooth and effortless journey.                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
