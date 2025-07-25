// components/SectionsScroll.js
'use client';

import { useRef, useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const sectionsData = [
  {
    id: 1,
    title: 'Ранний этап вычислительного синтеза изображений (1950–1980-е годы)',
    text: 'Истоки AI-сгенерированной фотографии восходят к середине XX века с появлением цифровой обработки изображений. Первые попытки были направлены на оцифровку визуальных данных и применение базовых алгоритмов, таких как обнаружение контуров и преобразование Фурье, для улучшения и анализа изображений. Эти фундаментальные методы были разработаны такими организациями, как NASA, для обработки спутниковых и астрономических снимков, что заложило основу для вычислительной манипуляции фотографиями. В 1970-х годах внедрение нейронных сетей для распознавания образов стало первым шагом к машинному обучению в обработке изображений, хотя тогдашние сети были ограничены вычислительными ресурсами и объемом данных.',
  },
  {
    id: 2,
    title: 'Машинное обучение и извлечение признаков (1990–2000-е годы)',
    text: 'В 1990-х годах произошёл подъём методов машинного обучения и более продвинутых техник извлечения признаков, что позволило более тонко анализировать и модифицировать изображения, но генерация полностью новых фотографий оставалась ограниченной.',
  },
  {
    id: 3,
    title:
      'Революция глубокого обучения и генеративные состязательные сети (2010-е годы)',
    text: 'В 2010-х годах произошёл качественный скачок с появлением глубокого обучения, особенно сверточных нейронных сетей (CNN), которые значительно улучшили распознавание и синтез изображений. Ключевым прорывом стало представление генеративных состязательных сетей (GAN) в 2014 году исследователями во главе с Иэном Гудфеллоу. GAN состоят из двух нейросетей - генератора и дискриминатора - обучающихся в состязательном режиме для создания фотореалистичных изображений, неотличимых от настоящих.GAN быстро стали доминирующей архитектурой для синтеза изображений, открыв возможности для генерации изображений по текстовому описанию, преобразования изображений и переноса стиля, а также стимулировали исследования по управлению процессом генерации визуальных сцен.',
  },
  {
    id: 4,
    title:
      'Диффузионные модели и гибридные подходы (2020-е годы - настоящее время)',
    text: 'В последние годы диффузионные модели стали мощной альтернативой GAN, обеспечивая улучшенную стабильность и качество изображений. Эти модели поэтапно устраняют шум, создавая фотореалистичные изображения, и интегрированы в передовые системы, такие как DALL-E и ControlNet.Современные исследования классифицируют методы генерации изображений человека на основанные на данных, управляемые знаниями и гибридные, отражая тенденцию к объединению больших объемов данных с отраслевыми знаниями для повышения точности и контроля генерации.',
  },
];

export default function SectionsScroll() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      // Определяем тип устройства по соотношению ширины и высоты
      const isTablet =
        window.innerWidth <= 1024 &&
        window.innerHeight <= 1366 &&
        window.innerWidth > 768;
      const multiplier = isTablet ? 0.9 : 0.7; // Увеличил multiplier для планшета
      const scrollBottom = window.scrollY + window.innerHeight * multiplier;
      let currentIndex = 0;

      // Находим последнюю секцию, которая видна на экране
      sectionRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const absoluteTop = window.scrollY + rect.top;
          const absoluteBottom = window.scrollY + rect.bottom;

          // Если секция видна (пересекается с viewport)
          if (absoluteTop < scrollBottom && absoluteBottom > scrollTop) {
            currentIndex = i;
          }
        }
      });

      setActiveIndex(currentIndex);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(3px)' },
    next: { opacity: 0.5, y: 40, filter: 'blur(1px)' },
    active: { opacity: 1, y: 0, filter: 'blur(0)' },
  };

  return (
    <div className={styles.about}>
      {sectionsData.map((section, i) => {
        let state: keyof typeof variants = 'hidden';
        if (i === activeIndex) state = 'active';
        if (i === activeIndex + 1) state = 'next';

        return (
          <motion.section
            key={section.id}
            ref={(el: HTMLElement | null) => {
              sectionRefs.current[i] = el;
            }}
            className={styles.sectionAbout}
            initial='hidden'
            animate={state}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            variants={variants}
          >
            <h2 className={styles.sectionAboutTitle}>{section.title}</h2>
            <p className={styles.sectionAboutText}>{section.text}</p>
          </motion.section>
        );
      })}
    </div>
  );
}
