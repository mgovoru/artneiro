// components/SectionsScroll.js
'use client';

import styles from './page.module.css';

const sectionsData = [
  {
    id: 1,
    title: '- - -',
    text: 'Я специалист, сочетающий креативный взгляд художника с технической точностью. Мой профессиональный путь в технологиях начался с фронтенд-разработки, где я изучала HTML, CSS, JavaScript, TypeScript и React. Эти навыки научили меня логическому мышлению, вниманию к деталям и пониманию того, как работают сложные системы. Однако параллельно я открыла для себя безграничные возможности генеративного искусства.',
  },
  {
    id: 2,
    title: '- - -',
    text: 'В последнее время я углубилась в мир нейросетей и генеративного дизайна, освоив такие инструменты как Qwen, Leonardo AI и Perplexity. Я верю в то, что настоящее мастерство в генеративном искусстве лежит не в простом вводе запроса в нейросеть, а в глубоком понимании инструментов, тонком контроле каждого элемента и художественном видении. Мой процесс — это диалог между интуицией и алгоритмом, между идеей и её визуальной реализацией. Нейроиллюстрация — это возможность найти баланс между инновацией и эстетикой, между техническим совершенством и творческой свободой.',
  }
];

export default function SectionsScroll() {


  return (
    <div className={styles.about}>
      {sectionsData.map((section) => {


        return (

          <div className={styles.sectionAbout} key={section.id}>
            <h2 className={styles.sectionAboutTitle}>{section.title}</h2>
            <p className={styles.sectionAboutText}>{section.text}</p>
          </div>
        );
      })}
    </div>
  );
}
