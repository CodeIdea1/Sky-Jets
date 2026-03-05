'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/loadingScreen.module.css';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('siteLoaded');
    
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const minLoadTime = isMobile ? 2800 : 700;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('siteLoaded', 'true');
        }, 1000);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`${styles.loadingScreen} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.logo}>Sky Jets</h1>
        <div className={styles.loader}>
          <div className={styles.plane}>✈</div>
        </div>
      </div>
    </div>
  );
}
