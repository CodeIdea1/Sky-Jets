'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/Destinations.module.css';
import CitiesSlider from '../components/CitiesSlider';

gsap.registerPlugin(ScrollTrigger);

export default function Destinations() {
  const globeEl = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestIdleCallback(() => setShouldLoad(true));
          observer.disconnect();
        }
      },
      { rootMargin: '500px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !globeEl.current || typeof window === 'undefined') return;

    let globe: any;

    const loadGlobe = async () => {
      const GlobeModule = await import('globe.gl');
      const GlobeGL = GlobeModule.default;
      
      globe = GlobeGL()
        (globeEl.current!)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .width(globeEl.current!.offsetWidth)
        .height(globeEl.current!.offsetHeight)
        .atmosphereColor('rgba(0,0,0,0)')
        .atmosphereAltitude(0)
        .showGraticules(false)
        .backgroundColor('rgba(0,0,0,0)');

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.8;
      globe.controls().enableZoom = false;
      globe.controls().enablePan = false;
      globe.controls().enableRotate = false;

      const arcs = [
        { startLat: 25.2048, startLng: 55.2708, endLat: 51.5074, endLng: -0.1278, color: 'rgba(150, 150, 150, 0.6)' },
        { startLat: -33.8688, startLng: 151.2093, endLat: 40.7128, endLng: -74.0060, color: 'rgba(150, 150, 150, 0.6)' },
        { startLat: 35.6762, startLng: 139.6503, endLat: 1.3521, endLng: 103.8198, color: 'rgba(150, 150, 150, 0.6)' },
      ];

      globe
        .arcsData(arcs)
        .arcColor('color')
        .arcDashLength(1.5)
        .arcDashGap(0.5)
        .arcDashAnimateTime(3000)
        .arcStroke(0.5)
        .arcAltitude(0.4);
    };

    loadGlobe();

    return () => {
      if (globe && globe._destructor) {
        globe._destructor();
      }
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!globeWrapperRef.current || !sectionRef.current || !shouldLoad || !overlayRef.current || !titleRef.current || !contentRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        globeWrapperRef.current,
        { scale: 1.2 },
        {
          scale: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top+=50 top' : 'top+=300 top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        overlayRef.current,
        { y: '100%' },
        {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(titleRef.current, {
        backgroundImage: 'linear-gradient(to top, black, #302625, #302625)',
      }, {
        backgroundImage: 'linear-gradient(to top, black, black, #302625)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.fromTo(
        contentRef.current,
        { y: 100 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [shouldLoad]);

  return (
    <section ref={sectionRef} id="destinations" className={styles.section} style={{ contentVisibility: 'auto' }}>
      <div ref={overlayRef} className={styles.overlay} />
      <CitiesSlider />
      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.backgroundTitle}>Global</h2>
        <div ref={globeWrapperRef} className={styles.globeWrapper}>
          <div 
            ref={globeEl} 
            className={styles.globeContainer}
            style={{ 
              opacity: shouldLoad ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              willChange: shouldLoad ? 'auto' : 'opacity'
            }} 
          />
        </div>
        
        <div ref={contentRef} className={styles.content}>
          <div className={styles.globeFactoidCard}>
            <h3 className={styles.cardTitle}>5K+  <br /> flights</h3>
            <p className={styles.cardSubtitle}>Successfully arranged</p>
            <div className={styles.cardLogo}>
              <img src="/1234.svg" alt="Logo" />
            </div>
            <p className={styles.cardDescription}>
              Each journey reflects years of expertise, precision, and trust. From last-minute charters to intercontinental business routes — Jesko Jets ensures safety, discretion, and excellence in every flight.
            </p>
          </div>

          <div className={styles.contentColumns}>
            <div className={styles.columnLeft}>
              <div className={styles.statsBlock}>
                <h3 className={styles.statsTitle}>
                     Fly anywhere with<br />
                total comfort and<br />
                control
                </h3>

              </div>
  
            </div>

            <div className={styles.columnRight}>
              <a href="mailto:info@jeskojets.com" className={styles.contactLink}>info@jeskojets.com</a>
              <a href="tel:+971544325050" className={styles.contactLink}>+971 54 432 5050</a>
            </div>
          </div>

          <footer className={styles.contentFooter}>
            <p className={styles.copyright}>©2026 jesko jets. All rights reserved</p>
            <p className={styles.madeBy}>Made by</p>
          </footer>
        </div>
      </div>
    </section>
  );
}