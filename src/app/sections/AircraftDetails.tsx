'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/AircraftDetails.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AircraftDetails() {
  const aircraftPlaneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aircraftPlaneRef.current || !frameRef.current || !sectionRef.current || !containerRef.current) return;

    const isMobile = window.innerWidth <= 768;

    gsap.set(aircraftPlaneRef.current, { force3D: true });
    gsap.set(frameRef.current, { force3D: true, opacity: 0 });
    gsap.set(containerRef.current, { force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? '28% top' : 'top top',
        end: '+=300%',
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
      },
    });

    tl.to(aircraftPlaneRef.current, { 
      y: isMobile ? -500 : -1000, 
      duration: 1.5, 
      ease: 'none'
    })
    .to(sectionRef.current, { 
      '--shadow-opacity': 0.6, 
      duration: 1.5,
      ease: 'none'
    }, '-=1.5')
    .to(containerRef.current, { 
      y: '-50%', 
      duration: 1.5, 
      ease: 'none'
    }, '-=0.8')
    .to(aircraftPlaneRef.current, { 
      scale: isMobile ? 0.5 : 0.4, 
      duration: 1.5, 
      ease: 'none'
    }, '-=1.5')
    .to(aircraftPlaneRef.current, { 
      '--mask-position': '100%', 
      duration: 1.5,
      ease: 'none'
    })
    .to(frameRef.current, { 
      opacity: 1,
      duration: 0.1,
      ease: 'none'
    }, '-=1.5')
    .to(frameRef.current, { 
      '--frame-mask-position': '0%', 
      duration: 1.5,
      ease: 'none'
    }, '-=1.4');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="aircraft" ref={sectionRef} className={styles.section} style={{ '--shadow-opacity': 0 } as React.CSSProperties}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.hiddenContent}>
          <div>
            <h2 className={styles.title}>Fly in</h2>
            <h2 className={styles.titleBold}>
              Luxury<br />
              that moves<br />
              with you
            </h2>
          </div>

          <div>
            <h3 className={styles.heading}>Luxury</h3>
            <div className={styles.row}>
              <span className={styles.model}>Gulfstream</span>
              <span className={styles.modelBold}>650ER</span>
            </div>
            <p className={styles.description}>
              Featuring wings designed to minimize
              anything that could disrupt its natural
              aerodynamic balance, and powered by
              high-thrust Rolls-Royce BR725 AI-12 engines,
              the Gulfstream G650 is engineered for
              exceptional range and top-end speed
            </p>
          </div>
        </div>

        <div className={styles.visibleContent}>
          <div className={styles.visibleLeft}>
            <span className={styles.label}>Gulfstream</span>
            <h2 className={styles.aircraftModel}>650ER</h2>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Maximum operating range</span>
                <span className={styles.statValue}>11,263 km</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Maximum operating speed</span>
                <span className={styles.statValue}>956 km/h</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Maximum altitude</span>
                <span className={styles.statValue}>15,545 m</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Passenger capacity</span>
                <span className={styles.statValue}>19 passengers</span>
              </div>
            </div>

            <div className={styles.specsGrid}>
              <div>
                <span className={styles.specLabel}>Specification</span>
                <div className={styles.specItem}>Cabin length</div>
                <div className={styles.specItem}>Cabin Width</div>
                <div className={styles.specItem}>Cabin Height</div>
              </div>
              <div>
                <span className={styles.specLabel}>&nbsp;</span>
                <div className={styles.specValue}>14.05 m²</div>
                <div className={styles.specValue}>2.49 m²</div>
                <div className={styles.specValue}>1.92 m²</div>
              </div>
            </div>
          </div>

          <div className={styles.visibleRight}>
            <h2 className={styles.mainTitle}>Ultra-long-range Aircraft</h2>
            <h3 className={styles.subTitle}>Direct Access to Private Travel</h3>
            <p className={styles.description}>
              A true time-saving machine it brings Tokyo and New York an hour closer, 
              and at 92% of the speed of sound, it can circle the globe with just a single stop.
            </p>
          </div>
        </div>
      </div>
      
      <div ref={frameRef} className={styles.frameContainer} style={{ '--frame-mask-position': '100%' } as React.CSSProperties}>
        <img 
          src="/planeFrame.svg" 
          alt="Aircraft Frame" 
          className={styles.frame}
          loading="eager"
          decoding="async"
        />
      </div>
      
      <div ref={aircraftPlaneRef} className={styles.planeContainer}>
        <img 
          src="/mainPlane.svg" 
          alt="Aircraft" 
          className={styles.plane}
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
}
