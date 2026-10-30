import type { CSSProperties } from "react";

/** Reserves the complete text layout while short headings fade in letter by letter. */
export default function TypeFade({ children: text }: { children: string }) {
  const interval = Math.min(24, 360 / Math.max(1, Array.from(text).length - 1));
  let position = 0;

  return (
    <span className="type-fade">
      <span className="type-fade-accessible">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, wordIndex) => {
          if (!word.trim()) {
            position += Array.from(word).length;
            return word;
          }
          return (
            <span className="type-fade-word" key={wordIndex}>
              {Array.from(word).map((letter, letterIndex) => (
                <span className="type-fade-letter" key={letterIndex} style={{ "--type-delay": `${position++ * interval}ms` } as CSSProperties}>
                  {letter}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}
