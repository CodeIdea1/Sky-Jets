'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Destinations.module.css';

const Globe = dynamic(() => import('globe.gl'), { ssr: false });

export default function DestinationsOptimized() {
  const globeEl = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [globe, setGlobe] = useState<any>(null);

  // Lazy load عند الظهور
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // تحميل Globe
  useEffect(() => {
    if (!shouldLoad || !globeEl.current || typeof window === 'undefined') return;

    import('globe.gl').then((GlobeModule) => {
      const GlobeGL = GlobeModule.default;
      
      const globeInstance = GlobeGL()
        (globeEl.current!)
        .globeImageUrl('/earth-texture.jpg') // محلي بدلاً من CDN
        .width(globeEl.current!.offsetWidth)
        .height(globeEl.current!.offsetHeight)
        .atmosphereColor('rgba(0,0,0,0)')
        .atmosphereAltitude(0)
        .showGraticules(false)
        .backgroundColor('rgba(0,0,0,0)');

      globeInstance.controls().autoRotate = true;
      globeInstance.controls().autoRotateSpeed = 0.8;
      globeInstance.controls().enableZoom = false;
      globeInstance.controls().enablePan = false;
      globeInstance.controls().enableRotate = false;

      const arcs = [
        { startLat: 25.2048, startLng: 55.2708, endLat: 51.5074, endLng: -0.1278, color: 'rgba(150, 150, 150, 0.6)' },
        { startLat: -33.8688, startLng: 151.2093, endLat: 40.7128, endLng: -74.0060, color: 'rgba(150, 150, 150, 0.6)' },
        { startLat: 35.6762, startLng: 139.6503, endLat: 1.3521, endLng: 103.8198, color: 'rgba(150, 150, 150, 0.6)' },
      ];

      globeInstance
        .arcsData(arcs)
        .arcColor('color')
        .arcDashLength(1.5)
        .arcDashGap(0.5)
        .arcDashAnimateTime(3000)
        .arcStroke(0.5)
        .arcAltitude(0.4);

      setGlobe(globeInstance);
    });
  }, [shouldLoad]);

  // إيقاف الدوران عند عدم الظهور
  useEffect(() => {
    if (!globe || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        globe.controls().autoRotate = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [globe]);

  return (
    <section ref={sectionRef} id="destinations" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.backgroundTitle}>Global</h2>
        <div className={styles.globeWrapper}>
          {shouldLoad ? (
            <div ref={globeEl} className={styles.globeContainer} />
          ) : (
            <div className={styles.globeContainer} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#666'
            }}>
              Loading Globe...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
