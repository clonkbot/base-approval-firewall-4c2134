import { FC } from 'react';

export const ScanLines: FC = () => {
  return (
    <>
      {/* Scan line effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`,
        }}
      />

      {/* Moving scan bar */}
      <div
        className="fixed left-0 right-0 h-[2px] pointer-events-none z-50 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
          animation: 'scan 8s linear infinite',
        }}
      />

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-40">
        <svg viewBox="0 0 80 80" className="w-full h-full opacity-20">
          <path
            d="M0 20 L0 0 L20 0"
            fill="none"
            stroke="#0052ff"
            strokeWidth="1"
          />
          <path
            d="M0 40 L0 0 L40 0"
            fill="none"
            stroke="#0052ff"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="fixed top-0 right-0 w-20 h-20 pointer-events-none z-40">
        <svg viewBox="0 0 80 80" className="w-full h-full opacity-20">
          <path
            d="M80 20 L80 0 L60 0"
            fill="none"
            stroke="#0052ff"
            strokeWidth="1"
          />
          <path
            d="M80 40 L80 0 L40 0"
            fill="none"
            stroke="#0052ff"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="fixed bottom-0 left-0 w-20 h-20 pointer-events-none z-40">
        <svg viewBox="0 0 80 80" className="w-full h-full opacity-20">
          <path
            d="M0 60 L0 80 L20 80"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <path
            d="M0 40 L0 80 L40 80"
            fill="none"
            stroke="#00ff88"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="fixed bottom-0 right-0 w-20 h-20 pointer-events-none z-40">
        <svg viewBox="0 0 80 80" className="w-full h-full opacity-20">
          <path
            d="M80 60 L80 80 L60 80"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <path
            d="M80 40 L80 80 L40 80"
            fill="none"
            stroke="#00ff88"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>
    </>
  );
};
