import React, { useEffect, useState } from 'react';

type TypeWriterProps = {
  text: string;
  speed?: number;
};

export default function TypeWriter({ text, speed = 100 }: TypeWriterProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedCount(i);
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);


  useEffect(() => {
    if (displayedCount < text.length) {
      const blink = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(blink);
    } else {
      setShowCursor(false);
    }
  }, [displayedCount, text.length]);

  return (
    <span>
      {text.slice(0, displayedCount)}
      {displayedCount < text.length && (
        <span
          style={{
            display: 'inline-block',
            width: '1ch',
            height: '0.15em',
            background: showCursor ? '#fff' : 'transparent',
            verticalAlign: 'bottom',
            marginLeft: '-2px',
            marginRight: '1px',
            transition: 'background 0.1s',
            borderRadius: '2px',
          }}
        ></span>
      )}
    </span>
  );
}
