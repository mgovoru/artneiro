'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import TypeWriter from './Writer';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = { link: string; handlClick: () => void; text: string };
const links = [
  { link: '/about', text: 'Обо мне' },
  { link: '/gallery', text: 'Галлерея' },
  { link: '/interactive', text: 'Интерактивно' }
];

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const navRef = useRef(null);

  const burgerRef = useRef(null);

  const elementRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  // Функция-обработчик для клика вне меню
  function handleClickOutside(e: MouseEvent) {
    if (
      navRef.current &&
      !(navRef.current as HTMLElement).contains(e.target as Node) &&
      burgerRef.current &&
      !(burgerRef.current as HTMLElement).contains(e.target as Node)
    ) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', handleClickOutside);
      // Чтобы не было прокрутки body при открытом меню
      document.body.classList.add('noscroll');
    } else {
      document.body.classList.remove('noscroll');
    }

    if (elementRef.current) {
      elementRef.current.style.backgroundColor = 'rgba(44, 44, 44)';
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.classList.remove('noscroll');
    };
  }, [isActive, elementRef]);

  function handleBurgerClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation(); // чтобы handleClickOutside не срабатывал
    setIsActive((prev) => !prev);
  }

  return (
    <header
      className={styles.header}
      ref={pathname === '/about' ? elementRef : undefined}
    >
      <div className={styles.headerContainer}>
        <div className={styles.logoBox}>
          <Link href='/' className={styles.logoLink}>
            <TypeWriter text='Нейроиллюстрация' speed={300} />
          </Link>
        </div>
        <AnimatePresence>
          <nav
            className={`${styles.navLinks} ${isActive ? styles.active : ''}`}
            ref={navRef}
            onClick={() => setIsActive(false)}
          >
            <ul className={styles.navMenu}>
              {links.map((el) => (
                <MenuItem
                  link={el.link}
                  handlClick={() => setIsActive(false)}
                  text={el.text}
                  key={el.text}
                />
              ))}
            </ul>
          </nav>
        </AnimatePresence>
        <div
          className={`${styles.burger} ${isActive ? styles.active : ''}`}
          onClick={handleBurgerClick}
          ref={burgerRef}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}
function MenuItem(props: Props) {
  const { link, handlClick, text } = props;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.li
      className={styles.navItem}
      onClick={handlClick}
      style={{ margin: '0 0.5rem', position: 'relative' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={link} className={styles.navLink}>
        {isHovered && <ActiveLine />}
        {text}
      </Link>
    </motion.li>
  );
}

function ActiveLine() {
  return (
    <motion.div
      layoutId='activeItem'
      style={{
        width: '100%',
        height: '4px',
        position: 'absolute',
        bottom: '-6px',
        background: '#ff8300',
      }}
    ></motion.div>
  );
}
