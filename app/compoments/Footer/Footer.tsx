// components/Footer.js
'use client';
import styles from './footer.module.css';
import { RiSpaceShipFill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';

export default function Footer() {
  const pathname = usePathname();

  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.backgroundColor = 'rgba(44, 44, 44)';
    }
  }, []);
  return (
    <footer
      className={styles.footer}
      id='contacts'
      ref={pathname === '/about' ? elementRef : undefined}
    >
      <div className={styles.footerContainer}>
        <div className={styles.logoContainer}>Neurophotography</div>
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <span className={styles.copyrightText}>©2025 mgovoru</span>
          </div>
          <div
            className={styles.backToTop}
            onClick={handleScrollToTop}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.topText}>GO TO TOP</span>
            <RiSpaceShipFill color='white' size={48} />
          </div>
        </div>
      </div>
    </footer>
  );
}
