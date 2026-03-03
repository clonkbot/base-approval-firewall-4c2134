import { FC } from 'react';
import type { OracleUpdate } from '../App';

interface RiskOracleProps {
  updates: OracleUpdate[];
  onChallenge: (id: string) => void;
}

const formatTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const RiskOracle: FC<RiskOracleProps> = ({ updates, onChallenge }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#0052ff]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <h2 className="text-sm font-semibold uppercase tracking-wider">Risk Oracle</h2>
        <div className="ml-auto flex items-center gap-1">
          <div className="status-dot active" />
          <span className="text-[10px] text-[#00ff88]">LIVE</span>
        </div>
      </div>

      <div className="p-4">
        <div className="text-[10px] text-[#6a6a7a] uppercase tracking-wider mb-3">
          Optimistic Score Updates
        </div>

        <div className="space-y-3 max-h-[280px] overflow-y-auto">
          {updates.map((update) => (
            <div
              key={update.id}
              className={`p-3 rounded border transition-all ${
                update.status === 'pending'
                  ? 'bg-[#1a1a24] border-[#ffaa00]/30'
                  : update.status === 'slashed'
                  ? 'bg-[#1a0a10] border-[#ff3366]/30'
                  : 'bg-[#0d0d14] border-[#1a1a24]'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-mono text-[#a0a0a0]">{update.spender}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-[#6a6a7a]">{formatTimeAgo(update.timestamp)}</span>
                    <span className={`tag tag-${update.status}`}>{update.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-mono text-[#6a6a7a]">{update.oldScore}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-[#4a4a5a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  <span className={`text-lg font-mono font-bold ${
                    update.newScore > update.oldScore ? 'text-[#ff3366]' : 'text-[#00ff88]'
                  }`}>
                    {update.newScore}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-[#6a6a7a]">
                  <span>Stake:</span>
                  <span className="text-[#ffaa00] font-mono">{update.stake} ETH</span>
                </div>

                {update.status === 'pending' && (
                  <button
                    onClick={() => onChallenge(update.id)}
                    className="btn btn-danger text-[10px] py-1 px-2 min-h-[32px]"
                  >
                    Challenge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#1a1a24]">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#6a6a7a]">Challenge Period</span>
            <span className="font-mono text-[#ffaa00]">24 hours</span>
          </div>
          <div className="flex items-center justify-between text-[10px] mt-1">
            <span className="text-[#6a6a7a]">Min. Stake Required</span>
            <span className="font-mono text-[#e0e0e0]">0.1 ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
