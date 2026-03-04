'use client';

import { useEffect } from 'react';

export function useResponsiveReload(breakpoint: number = 768) {
  useEffect(() => {
    let isMobile = window.innerWidth < breakpoint;

    const handleResize = () => {
      const nowMobile = window.innerWidth < breakpoint;
      
      if (isMobile !== nowMobile) {
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
}
