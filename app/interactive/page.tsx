'use client';

import * as motion from 'motion/react-client';
import { useState } from 'react';
import styles from './page.module.css';

export default function StateAnimations() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div className={styles.interact}>
      <div id='example'>
        <div>
          <motion.div
            className='box'
            animate={{ x, y, rotate }}
            transition={{ type: 'spring' }}
          />
        </div>
        <div className='inputs'>
          <Input value={x} set={setX}>
            x
          </Input>
          <Input value={y} set={setY}>
            y
          </Input>
          <Input value={rotate} set={setRotate} min={-180} max={180}>
            rotate
          </Input>
        </div>
        <StyleSheet />
      </div>
    </div>
  );
}

interface InputProps {
  children: string;
  value: number;
  set: (newValue: number) => void;
  min?: number;
  max?: number;
}

function Input({ value, children, set, min = -200, max = 200 }: InputProps) {
  return (
    <label>
      <code>{children}</code>
      <input
        value={value}
        type='range'
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value))}
      />
      <input
        type='number'
        value={value}
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value) || 0)}
      />
    </label>
  );
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
  return (
    <style>{`
            #example .box {
                width: 150px;
                height: 200px;
                pointer-events: none;
								background-image:url('./assets/man.png');
                background-size:contain;
                background-repeat: no-repeat;
            }
                @media(min-width:507px){#example .box{width:200px;}}

            #example {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap:24px;
            }
                @media(max-width:507px){#example {gap:8px;}}

            #example input {
                accent-color: #ff8300;
                font-family: "Azeret Mono", monospace;
            }

            #example .inputs {
                display: flex;
                flex-direction: column;
            }

            #example label {
                display: flex;
                align-items: center;
                margin: 10px 0;
            }

            #example label code {
                width: 50px;
            }

            #example input[type="number"] {
                border: 0;
                border-bottom: 1px dotted #ff8300;
                color: #ff8300;
                margin-left: 10px;
            }

            #example input[type="number"]:focus {
                outline: none;
                border-bottom: 2px solid #ff0088;
            }

            #example input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }

            input[type='range']::-webkit-slider-runnable-track {
                height: 5px;
                -webkit-appearance: none;
                appearance: none;
                background: #0b1011;
                margin-top: -1px;
            }

            input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                background: #ff0088;
                top: -4px;
                position: relative;
                border: none;
                border-radius: 0;
            }
        `}</style>
  );
}
