// components/SectionsScroll.js
'use client';

import Link from 'next/link';
import styles from './page.module.css';
import DotGrid from '../dots/DotGrid';

const sectionsData = [
  {
    id: 1,
    title: 'github',
    text: '@mgovoru',
    link: 'http://www.github.com/mgovoru',
  },
  {
    id: 2,
    title: 'telegram',
    text: '@mgovoru',
    link: 'https://t.me/mgovoru',
  },
  {
    id: 3,
    title: 'email',
    text: 'mgovoru@yandex.ru',
    link: 'mailto:m.govoru@yandex.ru',
  },
];

export default function SectionsScroll() {


  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <DotGrid
          dotSize={3}
          gap={15}
          baseColor='#FFF'
          activeColor='#d2691e'
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className={styles.about}>
        <h2 className={styles.sectionAboutTitle}>Maria Govorukhina</h2>
        {sectionsData.map((section) => {
          return (
            <div className={styles.sectionAbout} key={section.id}>
              <h2 className={styles.sectionAboutContact}>{section.title}</h2>
              <Link href={section.link} className={styles.sectionAboutLink}>
                <p className={styles.sectionAboutText}>{section.text}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
