'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { HiPlus, HiMinus } from 'react-icons/hi2';
import styles from '../styles/FlyingExperience.module.css';

const accordionData = [
  {
    id: 'pets',
    title: 'Pets',
    content: 'Travel with your beloved pets in comfort and style. Our private jets accommodate your furry companions with special amenities.',
    image: '/pets.webp'
  },
  {
    id: 'availability',
    title: '24/7 availability',
    content: 'Book your flight anytime, anywhere. Our team is available around the clock to serve your travel needs.',
    image: '/availability.webp'
  },
  {
    id: 'services',
    title: 'Onboard services',
    content: 'Enjoy premium catering, entertainment, and personalized service throughout your journey.',
    image: '/Made with insMind-insMind.png'
  },
  {
    id: 'efficient',
    title: 'Efficient',
    content: 'Save time with direct flights, quick boarding, and flexible scheduling tailored to your needs.',
    image: '/Efficient.webp'
  }
];

export default function FlyingExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedImages, setDisplayedImages] = useState([0]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (content) {
        if (activeIndex === index) {
          gsap.to(content, {
            height: 'auto',
            opacity: 1,
            duration: 0.5,
            ease: 'power1.inOut'
          });
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power1.inOut'
          });
        }
      }
    });
  }, [activeIndex]);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index);
    setDisplayedImages([...displayedImages, index]);
  };

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Right Column - Accordion */}
          <div className={styles.accordionColumn}>
            <h2 className={styles.title}>
              A Better Way to Fly
            </h2>
            
            <div className={styles.accordionList}>
              {accordionData.map((item, index) => (
                <div key={item.id} className={styles.accordionItem}>
                  <button
                    onClick={() => handleAccordionClick(index)}
                    className={styles.accordionButton}
                  >
                    <div className={styles.buttonContent}>
                      <div className={styles.iconWrapper}>
                        {activeIndex === index ? <HiMinus className={styles.icon} /> : <HiPlus className={styles.icon} />}
                      </div>
                      <span className={styles.accordionTitle}>
                        {item.title}
                      </span>
                    </div>
                  </button>
                  
                  <div 
                    ref={(el) => { contentRefs.current[index] = el; }}
                    className={styles.accordionContent}
                  >
                    <div className={styles.mobileImageWrapper}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.mobileImage}
                      />
                    </div>
                    <div className={styles.contentText}>
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column - Image */}
          <div className={styles.imageColumn}>
            {displayedImages.map((imgIndex, stackIndex) => (
              <div
                key={`${accordionData[imgIndex].id}-${stackIndex}`}
                className={`${styles.imageWrapper} ${styles.active}`}
                style={{ zIndex: stackIndex + 1 }}
              >
                <img
                  src={accordionData[imgIndex].image}
                  alt={accordionData[imgIndex].title}
                  className={styles.image}
                  loading={imgIndex === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
