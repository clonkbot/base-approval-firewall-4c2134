import { FC } from 'react';

interface HeaderProps {
  connected: boolean;
  walletAddress: string;
  onConnect: () => void;
  totalBlocked: number;
  totalRewritten: number;
}

export const Header: FC<HeaderProps> = ({
  connected,
  walletAddress,
  onConnect,
  totalBlocked,
  totalRewritten,
}) => {
  return (
    <header className="panel">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-gradient-to-br from-[#0052ff] to-[#00ff88] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00ff88] status-dot active" />
            </div>

            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight font-['Orbitron']">
                <span className="text-[#0052ff]">BASE</span>
                <span className="text-white"> FIREWALL</span>
              </h1>
              <p className="text-[10px] md:text-xs text-[#6a6a7a] tracking-widest uppercase">
                ERC-4337 Approval Security Module
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center gap-4 md:gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ff3366]" />
                <span className="text-[#6a6a7a]">BLOCKED</span>
                <span className="text-[#ff3366] font-bold tabular-nums">{totalBlocked}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                <span className="text-[#6a6a7a]">REWRITTEN</span>
                <span className="text-[#00ff88] font-bold tabular-nums">{totalRewritten}</span>
              </div>
            </div>

            {connected ? (
              <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 bg-[#111118] border border-[#1a1a24] rounded">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] status-dot active" />
                <span className="text-xs md:text-sm font-mono text-[#e0e0e0]">{walletAddress}</span>
                <div className="base-logo text-[10px]">B</div>
              </div>
            ) : (
              <button onClick={onConnect} className="btn btn-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </button>
            )}
          </div>
        </div>

        <div className="sm:hidden flex items-center gap-4 mt-4 text-xs border-t border-[#1a1a24] pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff3366]" />
            <span className="text-[#6a6a7a]">BLOCKED</span>
            <span className="text-[#ff3366] font-bold tabular-nums">{totalBlocked}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
            <span className="text-[#6a6a7a]">REWRITTEN</span>
            <span className="text-[#00ff88] font-bold tabular-nums">{totalRewritten}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
